import React, { Component } from 'react'
import { connect } from 'react-redux'
import API from '../../api/API'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import CKEditor from 'ckeditor4-react-advanced';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import SimpleReactValidator from 'simple-react-validator';

export class CreatePage extends Component {

    constructor(props){
        super(props)
        this.state={
            name:'',
            content:'',
            metatitle:'',
            metadescription:'',
            url:''
        }
        this.validator = new SimpleReactValidator();
        this.onEditorChange=this.onEditorChange.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleTitleChange=this.handleTitleChange.bind(this);

        

    }

    handleTextChange(e){
        
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    handleTitleChange(e){
        var urlLower = e.target.value.toLowerCase();
        var url = urlLower.replace(/ /g,'-');
        this.setState({
            name:e.target.value,
            url:url
        })
    }

    onEditorChange(evt) {
        this.setState({
            content: evt.editor.getData()
        });
    }


    handleSubmit = e => {
        e.preventDefault();
        var mpropsh = this.props.history;

        if (this.validator.allValid()) {
            
            API.post('/page',this.state)
            .then(response=>{
                if(response.data.response === 'true'){
                    Swal.fire('Success', 'Successfully Created', 'success')
                    mpropsh.push('/pages');
                }else{
                    alert('Failed')
                }
            })

        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        
        return (
            <>
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="Create Page" />
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
                                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleTitleChange} />
                                                    <h6 className="text-danger">{this.validator.message('name', this.state.name, 'required')}</h6>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>URL ({process.env.REACT_APP_WEBSITEURL+'/your-url'})</label>
                                                    <input type="text" className="form-control" name="url" value={this.state.url} onChange={this.handleTextChange} />
                                                    <h6 className="text-danger">{this.validator.message('url', this.state.url, 'required')}</h6>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-12">
                                                <label>Content</label>
                                                <CKEditor
                                                    onChange={this.onEditorChange}
                                                    config={{
                                                    width: '100%',
                                                    height: '150px',
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
                                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
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
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage)
