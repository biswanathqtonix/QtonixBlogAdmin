import React, { Component } from 'react'
import { connect } from 'react-redux'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import API from '../../api/API'
import SimpleReactValidator from 'simple-react-validator';
import 'react-image-crop/dist/ReactCrop.css';
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar'
import Footer from '../../includes/Footer'
import {Helmet} from "react-helmet";
import Loader from 'react-loader-spinner'

import LoadingScreen from '../../includes/LoadingScreen'

export class UserEdit extends Component {

    constructor(props){
        super(props)
        this.state={
            loader:false,
            id:'',
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
 
        API.get(`/user/${this.props.match.params.id}`)
        .then(response=>{
            var userdata = response.data.data
            this.setState({
                id:userdata._id,
                name:userdata.name,
                email:userdata.email,
                contact:userdata.contact,
                usertype:userdata.usertype,
                country:userdata.country,
                state:userdata.state,
                city:userdata.city,
                tempimage:userdata.image
            })
        })
    
    }

    

    handleTextChange(e){
        e.preventDefault();

        this.setState({
            [e.target.name]:e.target.value
        })
        
    }

    handleImageChange(e){
        e.preventDefault();
        this.setState({
            image:e.target.files[0],
            tempimage:URL.createObjectURL(e.target.files[0])
        })
    }

    handleSubmit = async e => {
        e.preventDefault();

        if (this.validator.allValid()) {

            this.setState({
                loader:true
            })
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
                headers: {'content-type':'multipart/formdata'},
            }
            API.put(`user/${this.state.id}`,formData,config)
            .then(response=>{
                if(response.data.response === 'true'){
                    Swal.fire('Success', 'Successfully Updated', 'success')
                    this.props.history.push('/users')
                }else{
                    this.setState({
                        loader:false
                    })
                    Swal.fire('Failed', 'Please try with anathor email', 'error')
                }
            })

        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }

        
        

    }


    render() {
        // console.log(this.state.userdata)
        var user = this.state;
        if(!user){
            return(
                <LoadingScreen />
            )
        }
        return (
            <React.StrictMode>
            <Helmet>
                <script src="/assets/plugins/bootstrap-filestyle/js/bootstrap-filestyle.min.js"></script>
            </Helmet>
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="Edit User" />

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
                                            <input type="text" className="form-control" name="name" onChange={this.handleTextChange} value={user.name} />
                                            <h6 className="text-danger">{this.validator.message('name', this.state.name, 'required|alpha')}</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" className="form-control" name="email" onChange={this.handleTextChange} value={user.email} readOnly />
                                            <h6 className="text-danger">{this.validator.message('email', this.state.email, 'required|email')}</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Contact</label>
                                            <input type="text" className="form-control" name="contact" onChange={this.handleTextChange} value={user.contact}  />
                                            <h6 className="text-danger">{this.validator.message('contact', this.state.contact, 'required|phone')}</h6>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>User Type</label>
                                            <select class="form-control" name="usertype" onChange={this.handleTextChange} value={user.usertype}>
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
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input type="text" className="form-control" name="country" onChange={this.handleTextChange} value={user.country} />
                                            <h6 className="text-danger">{this.validator.message('country', this.state.country, 'required|alpha|min:2|max:20')}</h6>                                       
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input type="text" className="form-control" name="state" onChange={this.handleTextChange} value={user.state} />
                                            <h6 className="text-danger">{this.validator.message('state', this.state.state, 'required|alpha|min:2|max:20')}</h6>                               
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input type="text" className="form-control" name="city" onChange={this.handleTextChange}  value={user.city}/>
                                            <h6 className="text-danger">{this.validator.message('city', this.state.city, 'required|alpha|min:2|max:20')}</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        {this.state.loader
                                        ?
                                        <Loader type="TailSpin" color="#2f8ee0" height={30} width={30} />
                                        :
                                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Update</button>
                                        // <Loader type="TailSpin" color="#2f8ee0" height={30} width={30} />
                                        }
                                        
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

                                    {user.image===''
                                    ?
                                    <img src={process.env.REACT_APP_BACKENDURL+'/'+user.tempimage} className="w-50" alt="11"/>
                                    :
                                    <img src={user.tempimage} className="w-50" alt="22"/>
                                    }
                                        
                                    </div>
                                    <div className="col-md-12 mt-3  text-center">
                                        
                                        <h2>{user.name==='' ? <>Full Name</> : user.name }</h2>
                                        <h3>{user.email==='' ? <>email@email.com</> : user.email }</h3>
                                        <h4>{user.password==='' ? <>password</> : user.password }</h4>
                                        <h4>{user.contact==='' ? <>9090909090</> : user.contact }</h4>
                                        <h4>{user.country==='' ? <>Country</> : user.country } / {user.state==='' ? <>State</> : user.state } / {user.city==='' ? <>City</> : user.city }</h4>
                                        <h5>{user.usertype==='' ? <></> : user.usertype }</h5>
                                            
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
            </React.StrictMode>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
