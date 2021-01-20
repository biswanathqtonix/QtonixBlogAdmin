import React, { Component } from 'react'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import { connect } from 'react-redux'
import LoadingScreen from '../../includes/LoadingScreen'
import API from '../../api/API'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'


export class ViewPage extends Component {

    constructor(props){
        super(props)
        this.state={
            data:null
        }
    }
    
    componentDidMount(){
        API.get(`/page/${this.props.match.params.id}`)
        .then(response=>{
            this.setState({
                data:response.data.data
            })
        })
    }

    handleDelete = id => {
        var mpropsh = this.props.history;
        
        API.patch(`/page/${this.props.match.params.id}`)
        .then(response=>{
            if(response.data.response === true){
                Swal.fire('Success', 'Successfully Removed', 'success')
                mpropsh.push('/pages');
            }else{
                alert('Failed')
            }
        })
    }

    render() {
        if(!this.state.data){
            return(
                <LoadingScreen />
            )
        }
        return (
            <>
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="BlankPage" />
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="float-right">
                                    <Link to={`/pages/${this.state.data._id}/edit`} className="btn btn-info">Edit</Link>
                                    &nbsp;&nbsp;
                                    {
                                    (this.state.data.pagetype === 'static')
                                    ?
                                        <>

                                        </>
                                    :
                                        <>
                                            <Link className="btn btn-danger" onClick={()=>this.handleDelete(this.props.match.params.id)}>Delete</Link>
                                        </>
                                                        
                                    }
                                </div>
                                <h5>Page Name: {this.state.data.name}</h5>
                                <h5>Page URL: {this.state.data.url}</h5>
                                <h5>Meta Title: {this.state.data.metatitle}</h5>
                                <h5>Meta Description: {this.state.data.metadescription}</h5>
                                <h5>Content: </h5>
                                <hr/>
                                <div dangerouslySetInnerHTML={{__html: this.state.data.content}} />

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
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPage)
