import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import Sidebar from '../../../includes/Sidebar'
import TopBar from '../../../includes/TopBar'
import Footer from '../../../includes/Footer'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import API from '../../../api/API'

export default class BlogCategoryCreate extends Component {

    constructor(props){
        super(props)
        this.state={
            name:'',
            description:'',
            image:'',
            imagetemp:''
        }
        this.validator = new SimpleReactValidator();
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleImageChange=this.handleImageChange.bind(this);
    }

    handleTextChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleImageChange(e){
        this.setState({
            image:e.target.files[0],
            imagetemp:URL.createObjectURL(e.target.files[0])
        })
    }

    handleSubmit = async e => {
        e.preventDefault();

        if (this.validator.allValid()) {
            
            let formData = new FormData();
            formData.append('name',this.state.name);
            formData.append('email',this.state.email);
            formData.append('image',this.state.image);
            formData.append('description',this.state.description);

            

            const config = {
                headers: {'content-type':'multipart/formdata'}
            }

            const response = await API.post('/blogcategory',formData,config);
            if(response.data.response === 'true'){
                Swal.fire('Success', 'Successfully Created', 'success')
                this.props.history.push('/settings/blogcategory')
            }else{
                Swal.fire('Failed', 'Please try with anathor email', 'error')
            }


        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

        
        

    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/assets/plugins/bootstrap-filestyle/js/bootstrap-filestyle.min.js";
        script.async = true;
        document.body.appendChild(script);
    }

    render() {
        return (
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="Blog Category Create" />
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                

                                <div className="row">
                                    {/* CREATE */}
                                    <div className="col-md-6 mt-3">
                                        <form method="post" onSubmit={this.handleSubmit}>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleTextChange} />
                                                    <h6 className="text-danger">{this.validator.message('name', this.state.name, 'required')}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <textarea className="form-control" rows="4" name="description" value={this.state.description} onChange={this.handleTextChange}></textarea>
                                                    <h6 className="text-danger">{this.validator.message('description', this.state.description, 'required')}</h6>

                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Category Image</label>
                                                    <input type="file" className="filestyle" data-buttonname="btn-secondary" onChange={this.handleImageChange} />
                                                    <h6 className="text-danger">{this.validator.message('image', this.state.image, 'required')}</h6>

                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-primary">Create</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        {this.state.imagetemp===''
                                        ?
                                        <img src="https://epvdays.ie/wp-content/uploads/2020/05/Blogging.png" className="w-100" alt=""/>

                                        :
                                        <img src={this.state.imagetemp} className="w-100" alt=""/>
                                        
                                        }
                                        <h3>{this.state.name==='' ? <>Loream Lipsum</> : this.state.name }</h3>
                                        <p>{this.state.description==='' ? <>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptatem, quo ut velit dicta explicabo corporis ea ex numquam quas.</> : this.state.description }</p>
                                    </div>
                                </div>


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
