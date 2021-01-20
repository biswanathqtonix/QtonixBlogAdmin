import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../../includes/Sidebar'
import TopBar from '../../includes/TopBar';
import Footer from '../../includes/Footer'
import API from '../../api/API'
import { Fetch } from 'react-request';

export class LogindetailsView extends Component {

    componentDidMount(){
        // alert(this.props.match.params.id);
    }

    render() {
        return (
            <>
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">             
            <TopBar pagename="View Login Details" />
            <div className="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                {/* <Fetch url="http://localhost:5000/api/user/logindetails/600274ebd740002bc0085412"> */}
                                <Fetch url={process.env.REACT_APP_BACKENDURL+`/api/user/logindetails/`+this.props.match.params.id}>

                                {({fetching,failed,data})=>{
                                    if(fetching){
                                        return <div>Loading data...</div>;
                                    }

                                    if(failed){
                                        return <div>The request did not succeed.</div>;
                                    }

                                    if(data){
                                        return(
                                            <div className="row">
                                                <div className="col-md-3">
                                                    {console.log(this.props)}
                                                    <h6>Email: {data.data.user_email}</h6>
                                                    <h6>Ip: {data.data.ip_ip}</h6>
                                                    <h6>Provider: {data.data.ip_org}</h6>
                                                    <h6>Country: {data.data.ip_country_name}</h6>
                                                    <h6>Area: {data.data.ip_country_area}</h6>
                                                    <h6>Population: {data.data.ip_country_population}</h6>
                                                    <h6>Region: {data.data.ip_region}</h6>
                                                    <h6>City: {data.data.ip_city}</h6>
                                                    <h6>Timezone: {data.data.ip_timezone}</h6>
                                                    <h6>Calling Code: {data.data.ip_country_calling_code}</h6>
                                                    <h6>Currency: {data.data.ip_currency}</h6>
                                                    <h6>Currency Name: {data.data.ip_currency_name}</h6>
                                                    <h6>Languages: {data.data.ip_languages}</h6>

                                                </div>
                                                <div className="col-md-2">
                                                    <h6>OS Name: {data.data.osName}</h6>
                                                    <h6>Vender: {data.data.mobileVendor}</h6>
                                                    <h6>Model: {data.data.mobileModel}</h6>
                                                    <h6>Device: {data.data.deviceType}</h6>
                                                    <h6>Browser: {data.data.browserName}</h6>
                                                    <h6>Version: {data.data.browserVersion}</h6>
                                                    <h6>Latitude: {data.data.ip_latitude}</h6>
                                                    <h6>Longitude: {data.data.ip_longitude}</h6>
                                                    <img src={data.data.ip_country_flag} alt="Country Flag"/>
                                                </div>
                                                <div className="col-md-7">
                                                    <iframe src={`//maps.google.com/maps?q=${data.data.ip_latitude},${data.data.ip_longitude}&z=15&output=embed`} width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" />
                                                
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null;
                                }}
                                
                                
                                </Fetch>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogindetailsView)
