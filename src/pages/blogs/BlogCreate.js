import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import CKEditor from 'ckeditor4-react-advanced';
import SimpleReactValidator from 'simple-react-validator';
import API from '../../api/API'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {fetchAllBlogCategory} from '../../actions'
import {Helmet} from "react-helmet";
import LoadingScreen from '../../includes/LoadingScreen'


export class BlogCreate extends Component {

    constructor(props){
        super(props)
        this.state={
            title:'',
            url:'',
            description:'',
            category:'category',
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
        this.handleTitleChange=this.handleTitleChange.bind(this);

    }

    componentDidMount() {
        this.props.fetchAllBlogCategory();
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
            title:e.target.value,
            url:url
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
            // console.log(this.state);

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

            API.post('/blog',formData,config)
            .then(response=>{
                // console.log(response.data.response)

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
            <TopBar pagename="Blog Create" />
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
                                                <label>Title</label>
                                                <input type="text" className="form-control" name="title" value={this.state.title}  onChange={this.handleTitleChange} />
                                                <h6 className="text-danger">{this.validator.message('name', this.state.title, 'required')}</h6>

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
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea className="form-control" rows="3" name="description" value={this.state.description} onChange={this.handleTextChange}></textarea>
                                                <h6 className="text-danger">{this.validator.message('description', this.state.description, 'required')}</h6>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Category</label>
                                                <select class="form-control" name="category" value={this.state.category} onChange={this.handleTextChange}>
                                                    <option value="">Select Category</option>
                                                    {blogcategories.map((cate)=>{
                                                        return(
                                                            <option key={cate._id} value={cate.name}>{cate.name}</option>
                                                        )
                                                    })}
                                                    
                                                </select>
                                                <h6 className="text-danger">{this.validator.message('category', this.state.category, 'required')}</h6>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Blog Image</label>
                                                <input type="file" className="filestyle" data-buttonname="btn-secondary" onChange={this.handleImageChange} />
                                                <h6 className="text-danger">{this.validator.message('image', this.state.image, 'required')}</h6>

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
                                            <div className="form-group">
                                                <label>Meta Keyword</label>
                                                <textarea className="form-control" rows="3" name="metakey" value={this.state.metakey} onChange={this.handleTextChange}></textarea>
                                                <h6 className="text-danger">{this.validator.message('meta keyword', this.state.metakey, 'required|min:1|max:120')}</h6>
                                            </div>  
                                            
                                        </div>
                                        <div className="col-md-6">
                                            <p className="blogseo_metalink">{(this.state.title === '' ? <>www.website.com</> : process.env.REACT_APP_WEBSITEURL+'/'+this.state.category.toLowerCase()+'/'+this.state.url )}</p>
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
        )
    }
}

const mapStateToProps = (state) => ({
    blogcategories:state.blogcategories
})

export default connect(mapStateToProps, {fetchAllBlogCategory})(BlogCreate)
