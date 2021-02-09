import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import CKEditor from 'ckeditor4-react-advanced';
import { VscStarFull } from "react-icons/vsc";
import {fetchAllBlogCategory} from '../../actions'
import SimpleReactValidator from 'simple-react-validator';
import API from '../../api/API'
import {Helmet} from "react-helmet";
import LoadingScreen from '../../includes/LoadingScreen'

export class BlogEdit extends Component {

    constructor(props){
        super(props)
        this.state={
            loadingscreen:true,
            id:'',
            url:'',
            title:'',
            description:'',
            category:'',
            image:'',
            tempimage:'',
            content:'',
            metatitle:'',
            metadescription:'',
            metakey:''
        }
        this.validator = new SimpleReactValidator();
        this.onEditorChange=this.onEditorChange.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleImageChange=this.handleImageChange.bind(this);
        
    }

    componentDidMount() {
        this.props.fetchAllBlogCategory();

        API.get(`/blog/${this.props.match.params.id}`)
        .then(response=>{
            this.setState({
                loadingscreen:false,
                url:response.data.data.blogurl,
                id:response.data.data._id,
                title:response.data.data.title,
                description:response.data.data.description,
                category:response.data.data.category,
                tempimage:response.data.data.image,
                content:response.data.data.content,
                metatitle:response.data.data.metatitle,
                metadescription:response.data.data.metadescription,
                metakey:response.data.data.metakey,

                
            })
        // console.log(this.state);

        })
    }

    handleTextChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onEditorChange( evt ) {
        this.setState( {
            content: evt.editor.getData()
        } );
    }

    handleImageChange(e){
        this.setState({
            image:e.target.files[0],
            tempimage:URL.createObjectURL(e.target.files[0])
        })
    }


    handleSubmit = e => {
        e.preventDefault();

        var mpropsh = this.props.history;

        if (this.validator.allValid()) {
            console.log(this.state);

            let formData = new FormData();
            formData.append('title',this.state.title);
            formData.append('blogurl',this.state.url);
            formData.append('description',this.state.description);
            formData.append('category',this.state.category);
            formData.append('image',this.state.image);
            formData.append('content',this.state.content);
            formData.append('metatitle',this.state.metatitle);
            formData.append('metadescription',this.state.metadescription);
            formData.append('metakey',this.state.metakey);

            
            const config = {
                headers: {'content-type':'multipart/formdata'}
            }

            API.put(`/blog/${this.state.id}`,formData,config)
            .then(response=>{

                if(response.data.response === 'true'){

                    Swal.fire('Success', 'Successfully Created', 'success')
                    mpropsh.push('/blogs');

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
        var urlLower = this.state.title.toLowerCase();
        var url = urlLower.replace(/ /g,'-');

        if(this.state.loadingscreen){
            return(
                <LoadingScreen />
            )
        }

        var blogcategories = this.props.blogcategories;
        if(!blogcategories){
            return(
                <LoadingScreen />
            )
        }

        return (
            
            <div id="wrapper">
            <Helmet>
                <script src="/assets/plugins/bootstrap-filestyle/js/bootstrap-filestyle.min.js"></script>
            </Helmet>
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="Blog Edit" />
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                {this.state.blogurl}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label><span className="text-danger"></span>Title</label>
                                                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleTextChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea className="form-control" rows="3" name="description" value={this.state.description} onChange={this.handleTextChange}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Category</label>
                                                <select class="form-control" name="category" value={this.state.category} onChange={this.handleTextChange}>
                                                    <option value="">Select Category</option>
                                                    {blogcategories.map((cate)=>{
                                                        return(
                                                            <option key={cate._id}>{cate.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Blog Image</label>
                                                <input type="file" className="filestyle" data-buttonname="btn-secondary"  onChange={this.handleImageChange} />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12">
                                            <label>Content</label>
                                            <CKEditor
                                                onChange={this.onEditorChange}
                                                data={this.state.content}
                                                config={{
                                                    width: '100%',
                                                    height: '150px',
                                                }}
                                            />
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
                                            </div>
                                            <div className="form-group">
                                                <label>Meta Description</label>
                                                <textarea className="form-control" rows="3" maxLength={200} name="metadescription" value={this.state.metadescription} onChange={this.handleTextChange}></textarea>
                                            </div>  
                                            <div className="form-group">
                                                <label>Meta Keyword</label>
                                                <textarea className="form-control" rows="3" maxLength={200} name="metakey" value={this.state.metakey} onChange={this.handleTextChange}></textarea>
                                            </div>

                                            
                                            
                                        </div>
                                        <div className="col-md-6">
                                            <p className="blogseo_metalink">{(this.state.title === '' ? <>www.website.com</> : process.env.REACT_APP_WEBSITEURL+'/'+this.state.category.toLowerCase()+'/'+this.state.url )}</p>
                                            <p className="blogseo_metatitle">{(this.state.metatitle === '' ? <>Lorem ipsum dolor sit amet, consectetur adipiscing</> : this.state.metatitle)}</p>
                                            <p className="blogseo_metadesc">{(this.state.metadescription === '' ? <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</> : this.state.metadescription)} </p>
                                        </div>

                                        <div className="col-md-12">
                                            <button className="btn btn-primary btn-block">Submit</button>
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

const mapStateToProps = (state) => ({
    blogcategories:state.blogcategories
    
})

export default connect(mapStateToProps, {fetchAllBlogCategory})(BlogEdit)
