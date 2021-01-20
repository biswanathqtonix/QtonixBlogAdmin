import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import API from '../../api/API'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import LoadingScreen from '../../includes/LoadingScreen'
import { MdModeEdit,MdDelete } from "react-icons/md";


export class UserView extends Component {

    constructor(props){
        super(props)
            this.state={
                userdata:null
            }
        
    }

    componentWillMount(){
        API.get(`/user/${this.props.match.params.id}`)
        .then(response=>{
            var userdata = response.data.data
            this.setState({
                userdata
            })
        })
    }
    
    handleDelete = (e) => {
        var redi = this.props.history.push;
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this profile.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#f27474',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!"
         }).then(
               function (isConfirm) { 
                if (isConfirm.value){

                    API.patch(`/user/${e}`)
                    .then(response=>{

                        if(response.data.response === 'true'){
                            Swal.fire('Success', 'Successfully Removed', 'success')
                            redi('/users')
                        }else{
                            Swal.fire('Failed', 'Please try again', 'error')
                        }
                    })
                   } else {
                    
                   }
                },
               function () { 
                });

    }

    render() {
        
            var user = this.state.userdata
            if(!user){
                return(
                    <LoadingScreen />
                )
            }

        return (
            <React.StrictMode>
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename='Profile' />
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                
                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <img src={process.env.REACT_APP_BACKENDURL+'/'+user.image} className="w-100" alt="ProfileImage"/>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>ID: {user._id}</h5>
                                                <h5>Name: {user.name}</h5>
                                                <h5>Email: {user.email}</h5>
                                                <h5>Password: {user.password}</h5>
                                                <h5>City: {user.city}</h5>
                                                <h5>State: {user.state}</h5>
                                                <h5>Country: {user.country}</h5>
                                                <h5>UserType: {user.usertype}</h5>
                                                <h5>Contact: {user.contact}</h5>
                                                <h5>RegDate:  <Moment format="YYYY-MM-DD dddd  HH:MM:ss">{user.createdAt}</Moment></h5>
                                                <br/>
                                                <Link exact to={`/users/${user._id}/edit`} className="btn btn-info btn-sm"><MdModeEdit /> Edit</Link>
                                                &nbsp;
                                                <Link className="btn btn-danger btn-sm" onClick={()=>this.handleDelete(user._id)}><MdDelete /> Delete</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">

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

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
