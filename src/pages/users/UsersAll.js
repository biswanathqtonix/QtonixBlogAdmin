import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import LoadingScreen from '../../includes/LoadingScreen'
import {fetchAllUser} from '../../actions'
import cookie from 'react-cookies'
import { MdModeEdit,MdVisibility } from "react-icons/md";
import {Helmet} from "react-helmet";


export class UsersAll extends Component {

    componentDidMount() {
        this.props.fetchAllUser();

        const script = document.createElement("script");
        script.src = "/assets/plugins/datatables/jquery.dataTables.min.js";
        script.src = "/assets/plugins/datatables/dataTables.bootstrap4.min.js";
        script.src = "/assets/plugins/datatables/dataTables.responsive.min.js";
        script.src = "/assets/plugins/datatables/responsive.bootstrap4.min.js";
        script.src = "/assets/pages/datatables.init.js";
        script.async = true;
        document.body.appendChild(script);
    }

    render() {
        const users = this.props.users;
        if(!users){
            return(
                <LoadingScreen />
            )
        }
        
        var cookieuser = cookie.load('userdata');
        var cookieuserid=cookieuser._id;
        return (
            <React.StrictMode>
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="All User" />

            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                

                                <table id="datatable" className="table table-bordered dt-responsive nowrap" style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}}>
                                    <thead>
                                        <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>UserType</th>
                                        <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user)=>{
                                            return(
                                                <tr key={user._id}>
                                                    <td><img src={process.env.REACT_APP_BACKENDURL+'/'+user.imagethumb} width="30px" height="30px" alt=""/> </td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.contact}</td>
                                                    <td>{user.usertype}</td>
                                                    <td>
                                                      
                                                            
                                                          
                                                        <center>
                                                        <Link exact to={`/users/${user._id}`} className="rcicons"><MdVisibility /></Link>
                                                        <Link exact to={`/users/${user._id}/edit`} className="rcicons ml-1"><MdModeEdit /></Link>
                                                        {/* <Link onClick={()=>this.handleDelete(blog._id)} className="rcicons ml-1"><MdDelete /></Link> */}
                                                        </center>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        
                                        
                                    </tbody>
                                </table>





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
    users:state.userslist
})



export default connect(mapStateToProps, {fetchAllUser})(UsersAll)
