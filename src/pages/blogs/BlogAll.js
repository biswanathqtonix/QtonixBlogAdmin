import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {fetchBlogs,fetchAllBlogCategory} from '../../actions'
import Table from 'react-bootstrap/Table'
import LoadingScreen from '../../includes/LoadingScreen'
import Moment from 'react-moment';
import { MdDelete, MdModeEdit, MdVisibility } from "react-icons/md";
import API from '../../api/API'
import Swal from 'sweetalert2/dist/sweetalert2.js'


export class BlogAll extends Component {
    
    componentDidMount() {
        this.props.fetchBlogs();
        this.props.fetchAllBlogCategory();

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
                    API.patch(`/blog/${e}`)
                    .then(response=>{
                        if(response.data.response === 'true'){
                            Swal.fire('Success', 'Successfully Created', 'success')
                            mpropsh.fetchBlogs()
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
        var blogs=this.props.blogs;
        var categories = this.props.categories;
        if(!blogs){
            return(
                <LoadingScreen />
            )
        }
        if(!categories){
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
            <TopBar pagename="Blog All" />
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
                                  <th className="my_width100">Image</th>
                                  <th className="my_width150">Title</th>
                                  <th className="my_width200">Description</th>
                                  <th className="my_width100">Category</th>
                                  <th className="my_width150">Date</th>
                                  <th className="my_width150"></th>
                                </tr>
                                            
                                <tr>
                                  <th>
                                    {/* IMAGE */}
                                  </th>
                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  <th><input className="js-filter  form-control" type="text"  /></th>

                                  <th>
                                    <select className="js-filter  form-control">
                                      <option value="">Select</option>
                                      {categories.map((cate)=>{
                                        return(
                                          <option key={cate._id} value={cate.name}>{cate.name}</option>
                                        )
                                      })}


                                    </select>
                                  </th>
                                  <th><input className="js-filter  form-control" type="text"  /></th>
                                  <th></th>
                                </tr>
                              </thead>
                              
                              <tbody>
                                  {blogs.map((blog)=>{
                                      return(
                                          <tr key={blog._id}>
                                              <td> <img src={process.env.REACT_APP_BACKENDURL+'/'+blog.imagethumb} width="90px" alt=""/> </td>
                                              <td>{blog.title}</td>
                                              <td>{blog.description}</td>
                                              <td>{blog.category}</td>

                                              <td><Moment format="YYYY-MM-DD dddd  HH:MM:ss">{blog.createdAt}</Moment></td>
                                              <td>
                                                  <center>
                                                  <Link exact to={`/blogs/${blog._id}`} className="rcicons"><MdVisibility /></Link>
                                                  <Link exact to={`/blogs/${blog._id}/edit`} className="rcicons ml-1"><MdModeEdit /></Link>
                                                  <Link onClick={()=>this.handleDelete(blog._id)} className="rcicons ml-1"><MdDelete /></Link>
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
    categories:state.blogcategories
})


export default connect(mapStateToProps, {fetchBlogs,fetchAllBlogCategory})(BlogAll)
