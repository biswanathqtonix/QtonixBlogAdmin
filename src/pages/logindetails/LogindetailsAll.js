import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import LoadingScreen from '../../includes/LoadingScreen'
import Moment from 'react-moment';
import { MdDelete, MdModeEdit, MdVisibility } from "react-icons/md";
import API from '../../api/API';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {loginDetails} from '../../actions';


export class LogindetailsAll extends Component {

    componentDidMount() {

        const script = document.createElement("script");
        script.src = "/assets/js/dynamitable.jquery.min.js";
        script.async = true;
        document.body.appendChild(script);

        this.props.loginDetails();
    }

    render() {
        var logindetails = this.props.logindetails.data;
        if(!logindetails){
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
            <TopBar pagename="All Login Details" />
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                
                              <div class="table-responsive">
                              <Table className="js-dynamitable" striped bordered hover >
                              <thead>
                                <tr>
                                  <th className="my_width100">Email</th>
                                  <th className="my_width100">IP</th>
                                  <th className="my_width150">Provider</th>

                                  <th className="my_width100">Country</th>
                                  <th className="my_width100">Region</th>
                                  <th className="my_width100">City</th>

                                  <th className="my_width200">DateAndTime</th>

                                  <th className="my_width100"></th>
                                </tr>
                                            
                                <tr>
                                  <th><input className="js-filter  form-control" type="text"  /></th>

                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  <th><input className="js-filter  form-control" type="text"  /></th>

                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  <th><input className="js-filter  form-control" type="text"  /></th>

                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  
                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  <th></th>
                                </tr>
                              </thead>
                              
                              <tbody>
                                  {logindetails.map((login)=>{
                                      return(
                                          <tr key={login._id}>
                                              <td>{login.user_email}</td>
                                              <td>{login.ip_ip}</td>
                                              <td>{login.ip_org}</td>
                                              <td>{login.ip_country_name}</td>
                                              <td>{login.ip_region}</td>
                                              <td>{login.ip_city}</td>


                                              <td><Moment format="YYYY-MM-DD dddd  HH:MM:ss">{login.createdAt}</Moment></td>
                                              <td>
                                                  <center>
                                                  <Link exact to={`/logindetails/${login._id}`} className="rcicons"><MdVisibility /></Link>
                                                  {/* <Link exact to={`/logindetails/${login._id}/edit`} className="rcicons ml-1"><MdModeEdit /></Link>
                                                  <Link onClick={()=>this.handleDelete(login._id)} className="rcicons ml-1"><MdDelete /></Link> */}
                                                  </center>
                                              </td>
                                          </tr>
                                      )
                                  })}

                              </tbody>
                            </Table>
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
    logindetails:state.logindetails
})


export default connect(mapStateToProps, {loginDetails})(LogindetailsAll)
