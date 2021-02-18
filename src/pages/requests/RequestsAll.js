import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {fetchBlogs,fetchAllBlogCategory,getRequestFromUser} from '../../actions'
import Table from 'react-bootstrap/Table'
import LoadingScreen from '../../includes/LoadingScreen'
import Moment from 'react-moment';
import { MdDelete, MdModeEdit, MdVisibility } from "react-icons/md";
import API from '../../api/API'
import Swal from 'sweetalert2/dist/sweetalert2.js'


export class BlogAll extends Component {
    
    componentDidMount() {
        this.props.getRequestFromUser();

        const script = document.createElement("script");
        script.src = "/assets/js/dynamitable.jquery.min.js";
        script.async = true;
        document.body.appendChild(script);
    }


    handleDelete = e => {
        var mpropsh = this.props;

        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#f27474',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!"
         }).then(
               function (isConfirm) { 
                if (isConfirm.value){
                    API.patch(`/googlenotification/${e}`)
                    .then(response=>{
                        if(response.data.response === 'true'){
                            Swal.fire('Success', 'Successfully Created', 'success')
                            mpropsh.getRequestFromUser();
                        }else{
                            alert('Failed')
                        }
                    })
                   } else {
                    // Swal.fire("Failed", "Please try again", "error");
                    
                   }
                },
               function () { 
                Swal.fire('Cancelled')
        });



    }

    render() {
        var requests=this.props.requests;
        if(!requests){
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
            <TopBar pagename="Requests" />
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
                                  <th className="my_width150">Name</th>
                                  <th className="my_width200">Email</th>
                                  <th className="my_width100">Contact</th>
                                  <th className="my_width100">Date</th>
                                  <th className="my_width100"></th>
                                </tr>
                                            
                                <tr>
                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  
                                  <th></th>
                                </tr>
                              </thead>
                              
                              <tbody>
                                  {requests.map((req)=>{
                                      return(
                                          <tr key={req._id}>
                                              
                                              <td>{req.name}</td>
                                              <td>{req.email}</td>
                                              <td>{req.contact}</td>

                                              <td><Moment format="YYYY-MM-DD dddd  HH:MM:ss">{req.createdAt}</Moment></td>
                                              <td>
                                                  <center>
                                                  <Link onClick={()=>this.handleDelete(req._id)} className="rcicons ml-1"><MdDelete /></Link>
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
    blogs:state.blogs,
    categories:state.blogcategories,
    requests:state.requests
})


export default connect(mapStateToProps, {fetchBlogs,fetchAllBlogCategory,getRequestFromUser})(BlogAll)
