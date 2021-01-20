import React from 'react'
import Sidebar from '../includes/Sidebar'
import TopBar from '../includes/TopBar';
import Footer from '../includes/Footer'
import Loader from 'react-loader-spinner'


export default function LoadingScreen() {
    return (
        <div id="wrapper">
                <Sidebar />
                <div className="content-page">
                <div className="content">             
                <TopBar pagename={<Loader type="Bars" color="#113c68" height={20} width={20} />} />
                <div className="page-content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center justify-content-center" style={{marginTop:"35vh"}}>
                        
                            <div>
                            <p><Loader type="Bars" color="#113c68" height={50} width={50} /></p>    
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
