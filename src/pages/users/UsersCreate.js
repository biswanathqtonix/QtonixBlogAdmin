import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import API from '../../api/API'
import {fetchAllUser} from '../../actions'
import SimpleReactValidator from 'simple-react-validator';
import 'react-image-crop/dist/ReactCrop.css';

import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'


export class UsersCreate extends Component {

    constructor(props){
        super(props)
        this.state={
            name:'',
            email:'',
            contact:'',
            password:'',
            usertype:'',
            image:'',
            tempimage:'',
            country:'',
            state:'',
            city:'',
        }
        this.validator = new SimpleReactValidator();
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleImageChange=this.handleImageChange.bind(this);
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/assets/plugins/bootstrap-filestyle/js/bootstrap-filestyle.min.js";
        script.async = true;
        document.body.appendChild(script);
    }

    handleTextChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }

    handleImageChange(e){
        this.setState({
            image:e.target.files[0],
            tempimage:URL.createObjectURL(e.target.files[0])
        })
    }

    handleSubmit = async e => {
        e.preventDefault();

        if (this.validator.allValid()) {

            let formData = new FormData();
            formData.append('name',this.state.name);
            formData.append('email',this.state.email);
            formData.append('contact',this.state.contact);
            formData.append('password',this.state.password);
            formData.append('usertype',this.state.usertype);
            formData.append('city',this.state.city);
            formData.append('state',this.state.state);
            formData.append('country',this.state.country);
            formData.append('image',this.state.image);

            const config = {
                headers: {'content-type':'multipart/formdata'}
            }

            const response = await API.post('/user',formData,config);
        
            if(response.data.response === 'true'){
                Swal.fire('Success', 'Successfully Created', 'success')
                this.props.fetchAllUser();
                this.props.history.push('/users')
            }else{
                Swal.fire('Failed', 'Please try with anathor email', 'error')
            }

        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }

        



    }

    render() {
        return (
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="Create User" />

            <div className="page-content-wrapper">
            <div className="container-fluid mb-4">


                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                

                            <form method="post" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" className="form-control" name="name" onChange={this.handleTextChange}  />
                                            <h6 className="text-danger">{this.validator.message('name', this.state.name, 'required|alpha')}</h6>

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" name="email" onChange={this.handleTextChange}  />
                                            <h6 className="text-danger">{this.validator.message('email', this.state.email, 'required|email')}</h6>

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Contact</label>
                                            <input type="text" className="form-control" name="contact" onChange={this.handleTextChange}  />
                                            <h6 className="text-danger">{this.validator.message('contact', this.state.contact, 'required|phone')}</h6>

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="text" className="form-control" name="password" onChange={this.handleTextChange}  />
                                            <h6 className="text-danger">{this.validator.message('password', this.state.password, 'required|alpha_num_dash_space|min:6|max:20')}</h6>

                                        </div>
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>User Type</label>
                                            <select class="form-control" name="usertype" onChange={this.handleTextChange}>
                                                <option value="">Select</option>
                                                <option>User</option>
                                                <option>Admin</option>
                                            </select>
                                            <h6 className="text-danger">{this.validator.message('usertype', this.state.usertype, 'required')}</h6>

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>User Image</label>
                                            <input type="file" className="filestyle" data-buttonname="btn-secondary" onChange={this.handleImageChange} />
                                            <h6 className="text-danger">{this.validator.message('image', this.state.image, 'required')}</h6>

                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input type="text" className="form-control" name="country" onChange={this.handleTextChange} />
                                            <h6 className="text-danger">{this.validator.message('country', this.state.country, 'required|alpha|min:2|max:20')}</h6>

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input type="text" className="form-control" name="state" onChange={this.handleTextChange} />
                                            <h6 className="text-danger">{this.validator.message('state', this.state.state, 'required|alpha|min:2|max:20')}</h6>

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input type="text" className="form-control" name="city" onChange={this.handleTextChange} />
                                            <h6 className="text-danger">{this.validator.message('city', this.state.city, 'required|alpha|min:2|max:20')}</h6>

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-primary float-right">Create</button>
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        {this.state.tempimage===''
                                        ?
                                        <>
                                        <img src="https://maestroselectronics.com/wp-content/uploads/bfi_thumb/blank-user-355ba8nijgtrgca9vdzuv4.jpg" className="w-50" alt=""/>
                                        </>
                                        :
                                        <>
                                        <img src={this.state.tempimage} className="w-50" alt=""/>
                                        </>
                                        }
                                        
                                    </div>
                                    <div className="col-md-12 mt-3  text-center">
                                        
                                        <h2>{this.state.name==='' ? <>Full Name</> : this.state.name }</h2>
                                        <h3>{this.state.email==='' ? <>email@email.com</> : this.state.email }</h3>
                                        <h4>{this.state.password==='' ? <>password</> : this.state.password }</h4>
                                        <h4>{this.state.contact==='' ? <>9090909090</> : this.state.contact }</h4>
                                        <h4>{this.state.country==='' ? <>Country</> : this.state.country } / {this.state.state==='' ? <>State</> : this.state.state } / {this.state.city==='' ? <>City</> : this.state.city }</h4>
                                        <h5>{this.state.usertype==='' ? <></> : this.state.usertype }</h5>
                                            
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

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, {fetchAllUser})(UsersCreate)
