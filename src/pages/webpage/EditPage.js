import React, { Component } from 'react'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import LoadingScreen from '../../includes/LoadingScreen'
import API from '../../api/API'
import CKEditor from 'ckeditor4-react-advanced';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import SimpleReactValidator from 'simple-react-validator';

export default class EditPage extends Component {

    constructor(props){
        super(props)
        this.state={
            data:false,
            name:'',
            url:'',
            content:'',
            metatitle:'',
            metadescription:''
        }
        this.validator = new SimpleReactValidator();
        this.onEditorChange=this.onEditorChange.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
    }

    handleTextChange(e){
        
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onEditorChange(evt) {
        this.setState({
            content: evt.editor.getData()
        });
    }
    
    componentDidMount(){
        API.get(`/page/${this.props.match.params.id}`)
        .then(response=>{
            this.setState({
                data:true,
                name:response.data.data.name,
                url:response.data.data.url,
                content:response.data.data.content,
                metatitle:response.data.data.metatitle,
                metadescription:response.data.data.metadescription
            })
            console.log(this.state)
        })
    }


    handleSubmit = e => {
        e.preventDefault();
        var mpropsh = this.props.history;

        if (this.validator.allValid()) {
            
            API.put(`/page/${this.props.match.params.id}`,this.state)
            .then(response=>{
                if(response.data.response === true){
                    Swal.fire('Success', 'Successfully updated', 'success')
                    mpropsh.push('/pages');
                }else{
                    alert('Failed')
                }
                // console.log(response)
            })

        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        var urlLower = this.state.name.toLowerCase();
        var url = urlLower.replace(/ /g,'-');
        if(!this.state.data){
            return(
                <LoadingScreen />
            )
        }
        return (
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="Edit Page" />
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                
                            <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleTextChange} />
                                                    <h6 className="text-danger">{this.validator.message('name', this.state.name, 'required')}</h6>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-12">
                                                <label>Content</label>
                                                <CKEditor
                                                    onChange={this.onEditorChange}
                                                    data={this.state.content}
                                                    config={{
                                                    width: '100%',
                                                    height: '100vh',
                                                    }}
                                                />
                                                <h6 className="text-danger">{this.validator.message('content', this.state.content, 'required')}</h6>

                                            </div>

                                            <div className="col-md-12">
                                                <br/>
                                                <hr/>
                                                <br/>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Meta Title</label>
                                                    <input type="text" className="form-control" name="metatitle" value={this.state.metatitle} onChange={this.handleTextChange}/>
                                                    <h6 className="text-danger">{this.validator.message('meta title', this.state.metatitle, 'required')}</h6>

                                                </div>
                                                <div className="form-group">
                                                    <label>Meta Description</label>
                                                    <textarea className="form-control" rows="3" name="metadescription" value={this.state.metadescription} onChange={this.handleTextChange}></textarea>
                                                    <h6 className="text-danger">{this.validator.message('meta descripation', this.state.metadescription, 'required|min:10|max:120')}</h6>

                                                </div>  
                                                
                                            </div>
                                            <div className="col-md-6">
                                                <p className="blogseo_metalink">{(this.state.title === '' ? <>www.website.com</> : process.env.REACT_APP_WEBSITEURL+'/'+this.state.url )}</p>
                                                <p className="blogseo_metatitle">{(this.state.metatitle === '' ? <>Lorem ipsum dolor sit amet, consectetur adipiscing</> : this.state.metatitle)}</p>
                                                <p className="blogseo_metadesc">{(this.state.metadesc === '' ? <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</> : this.state.metadescription)} </p>
                                            </div>

                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-primary btn-block">Update</button>
                                            </div>
                                        </div>
                                    </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            <Footer />
            </div>
            </div>
        )
    }
}
