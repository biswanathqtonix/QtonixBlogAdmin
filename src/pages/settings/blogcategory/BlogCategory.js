import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Sidebar from '../../../includes/Sidebar'
import TopBar from '../../../includes/TopBar'
import Footer from '../../../includes/Footer'
import API from '../../../api/API'
import { MdDelete, MdModeEdit, MdCreate,MdAdd } from "react-icons/md";

import {fetchAllBlogCategory} from '../../../actions'
import Swal from 'sweetalert2/dist/sweetalert2.js'


export class BlogCategory extends Component {

    componentDidMount(){
        this.props.fetchAllBlogCategory()
    }

    handleDelete = e => {
        var props = this.props;
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

                    API.patch(`blogcategory/${e}`)
                    .then(response=>{
                        if(response.data.response === 'true'){

                            props.fetchAllBlogCategory()

                            Swal.fire('Success', 'Successfully Removed', 'success')
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
        var blogcategories = this.props.blogcategories
        if(!blogcategories){

        }
        return (
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="Blog Category" />
            <div className="page-content-wrapper mb-4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                    <Link className="btn btn-primary float-right" exact to='/settings/blogcategory/create'><MdAdd /> Create</Link>
                    </div>
                    {blogcategories.map((bcategory)=>{
                        return(
                            <div className="col-md-3 mt-4" key={bcategory._id}>
                                <div className="card">
                                    <div className="card-body">
                                    <img src={process.env.REACT_APP_BACKENDURL+'/'+bcategory.imagethumb} className="w-100" alt=""/>
                                        <h5>{bcategory.name} <span className="float-right">
                                            <Link exact to={`/settings/blogcategory/${bcategory._id}/edit`}><MdModeEdit /></Link> 
                                                &nbsp;&nbsp;
                                            <Link onClick={()=>this.handleDelete(bcategory._id)}><MdDelete /></Link></span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
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


export default connect(mapStateToProps, {fetchAllBlogCategory})(BlogCategory)
