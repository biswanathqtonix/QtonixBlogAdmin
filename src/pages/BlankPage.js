import React, { Component } from 'react'
import Sidebar from '../includes/Sidebar'
import TopBar from '../includes/TopBar';
import Footer from '../includes/Footer'



export default class BlankPage extends Component {
    render() {
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
                                hello
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
