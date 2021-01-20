import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import API from '../../api/API'
import {Link} from 'react-router-dom';
import { MdModeEdit,MdDelete } from "react-icons/md";
import LoadingScreen from '../../includes/LoadingScreen'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export class BlogView extends Component {

    constructor(props){
        super(props)
        this.state={
            blogs:[]
        }
    }

    componentDidMount(){
        API.get(`/blog/${this.props.match.params.id}`)
        .then(response=>{
            this.setState({
                blogs:response.data.data
            })
        })
    }

    handleDelete = e => {
        var mpropsh = this.props.history;
        var delid=this.props.match.params.id;
        

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
                    
                    API.patch(`/blog/${delid}`)
                    .then(response=>{
                        if(response.data.response === 'true'){
                            Swal.fire('Success', 'Successfully Created', 'success')
                            mpropsh.push('/blogs');
                        }else{
                            alert('Failed')
                        }
                    })

                   } else {
                   
                    
                   }
                },
               function () { 
                Swal.fire('Cancelled')
                });


    }
    

    render() {
        var blog= this.state.blogs;

        if(!blog){
            return(
                <LoadingScreen />
            )
        }

        return (
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="Blog Details"/>
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="float-right mb-2">
                                    <Link exact to={`/blogs/${blog._id}/edit`} className="btn btn-info"> <MdModeEdit />Edit</Link>
                                    <button onClick={()=>this.handleDelete(blog._id)} className="btn btn-danger ml-2"> <MdDelete />Delete</button>

                                </div>
                                <h3>{blog.title}</h3>
                                <h5>{blog.description}</h5>
                                <h5> <span className="badge badge-success">{blog.category} Blog</span> </h5>
                                <img src={process.env.REACT_APP_BACKENDURL+'/'+blog.image} className="w-100" alt=""/>
                                
                                <br/>
                                <div dangerouslySetInnerHTML={{__html: blog.content}} />
                                

                                <div className="h3 mt-5">5 Comments</div>
                                <div className="div">
                                    
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <h5>John Doe</h5>
                                            <h6>johndoe@gmail.com (3.12PM - 12 AUG 2020)</h6>
                                        </div>  
                                        <div className="col-md-12">
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, tempora! Eaque ab alias explicabo, est distinctio veniam, cupiditate vel dignissimos ea debitis, fuga asperiores aspernatur libero obcaecati odit sed dolores.</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <h5>John Doe</h5>
                                            <h6>johndoe@gmail.com (3.12PM - 12 AUG 2020)</h6>
                                        </div>  
                                        <div className="col-md-12">
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, tempora! Eaque ab alias explicabo, est distinctio veniam, cupiditate vel dignissimos ea debitis, fuga asperiores aspernatur libero obcaecati odit sed dolores.</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <h5>John Doe</h5>
                                            <h6>johndoe@gmail.com (3.12PM - 12 AUG 2020)</h6>
                                        </div>  
                                        <div className="col-md-12">
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, tempora! Eaque ab alias explicabo, est distinctio veniam, cupiditate vel dignissimos ea debitis, fuga asperiores aspernatur libero obcaecati odit sed dolores.</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <h5>John Doe</h5>
                                            <h6>johndoe@gmail.com (3.12PM - 12 AUG 2020)</h6>
                                        </div>  
                                        <div className="col-md-12">
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, tempora! Eaque ab alias explicabo, est distinctio veniam, cupiditate vel dignissimos ea debitis, fuga asperiores aspernatur libero obcaecati odit sed dolores.</p>
                                        </div>
                                    </div>

                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <form action="">
                                                <div className="form-group">
                                                    <textarea name="" className="form-control" rows="3"></textarea>
                                                 
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-primary">Submit</button>
                                                </div>
                                            
                                            </form>
                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)
