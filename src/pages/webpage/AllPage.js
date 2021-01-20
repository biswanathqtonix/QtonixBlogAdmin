import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import LoadingScreen from '../../includes/LoadingScreen'
import {fetchPages} from '../../actions'
import { MdDelete, MdModeEdit, MdVisibility } from "react-icons/md";
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import API from '../../api/API'


export class AllPage extends Component {

    componentDidMount() {


        const script = document.createElement("script");
        script.src = "/assets/plugins/datatables/jquery.dataTables.min.js";
        script.src = "/assets/plugins/datatables/dataTables.bootstrap4.min.js";
        script.src = "/assets/plugins/datatables/dataTables.responsive.min.js";
        script.src = "/assets/plugins/datatables/responsive.bootstrap4.min.js";
        script.src = "/assets/pages/datatables.init.js";
        script.async = true;
        document.body.appendChild(script);


        this.props.fetchPages();

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

                    API.patch(`/page/${e}`)
                    .then(response=>{
                        if(response.data.response === true){
                            Swal.fire('Success', 'Successfully Removed', 'success')
                            mpropsh.fetchPages();
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
        var pages = this.props.pages.data;
        var isPageAvailable = this.props.pages.response;

        if(!pages){
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
            <TopBar pagename="All Pages" />
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">

                                {isPageAvailable
                                ?
                                <table id="datatable" className="table table-bordered dt-responsive nowrap" style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}}>
                                    <thead>
                                        <tr>
                                        <th>Page Name</th>
                                        <th>Page URL</th>
                                        <th className="my_width100"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pages.map((page)=>{
                                            return(
                                                <tr key={page._id}>
                                                    <td>{page.name}</td>
                                                    <td>{process.env.REACT_APP_WEBSITEURL+page.url}</td>
                                                    <td width="90px">
                                                        <Link exact to={`/pages/${page._id}`} className="rcicons"><MdVisibility /></Link>
                                                        <Link exact to={`/pages/${page._id}/edit`} className="rcicons ml-1"><MdModeEdit /></Link>
                                                        {
                                                        (page.pagetype === 'static')
                                                        ?
                                                            <>

                                                            </>
                                                        :
                                                            <>
                                                            <Link onClick={()=>this.handleDelete(page._id)} className="rcicons ml-1"><MdDelete /></Link>
                                                            </>
                                                        
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                :
                                <>
                                <h2 className="text-center">No Records Found</h2>
                                </>
                                }
                                
                                
                                

                                


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
    pages:state.pages
})

export default connect(mapStateToProps, {fetchPages})(AllPage)
