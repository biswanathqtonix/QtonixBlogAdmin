import React, { Component } from 'react'
import { connect } from 'react-redux'
import {userLogin} from '../actions'
import { store } from 'react-notifications-component';
import cookie from 'react-cookies'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import SimpleReactValidator from 'simple-react-validator';
// import $ from "jquery";
import axios from 'axios'

import {isMobile,osName,osVersion,browserName,browserVersion,deviceType,mobileVendor,mobileModel,fullBrowserVersion} from 'react-device-detect';


export class Login extends Component {

    constructor(props){
        super(props)
        this.state=({
          email:'',
          password:'',
          ip_ip:'',
          loader:false  
        })
        this.validator = new SimpleReactValidator();
        this.handleChange=this.handleChange.bind(this);
    }


    componentDidMount(){
        axios.get('https://api.ipify.org?format=json')
        .then(response=>{
            // console.log(response.data.ip)
            axios.get(`https://ipapi.co/${response.data.ip}/json`)
            .then(response2 => {
             
                // https://ipapi.co/45.114.49.212/json/
                https://geolocation-db.com/json/
                this.setState({
                    ip_ip:response2.data.ip,
                    ip_continent_name:response2.data.continent_name,
                    ip_country_name:response2.data.country_name,
                    ip_country_code:response2.data.country_code,
                    ip_region:response2.data.region,
                    ip_city:response2.data.city,
                    ip_zip:response2.data.postal,
                    ip_latitude:response2.data.latitude,
                    ip_longitude:response2.data.longitude,
                    ip_country_flag:`https://www.countryflags.io/${response2.data.country_code}/flat/64.png`,
                    ip_timezone:response2.data.timezone,
                    ip_country_calling_code:response2.data.country_calling_code,
                    ip_currency:response2.data.currency,
                    ip_currency_name:response2.data.currency_name,
                    ip_languages:response2.data.languages,
                    ip_country_area:response2.data.country_area,
                    ip_country_population:response2.data.country_population,
                    ip_org:response2.data.org,

                    osName:osName,
                    osVersion:osVersion,
                    mobileVendor:mobileVendor,
                    mobileModel:mobileModel,
                    deviceType:deviceType,
                    browserName:browserName,
                    browserVersion:browserVersion,
                    fullBrowserVersion:fullBrowserVersion,

                })
                // console.log(this.state)

            })
        })
        
    

    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();


        if (this.validator.allValid()) {

            this.setState({
                loader:true
            })
    
            this.props.userLogin(this.state)
            .then(response=>{
    
                if(response.response === 'true'){
    
                    store.addNotification({
                        title: 'Well done',
                        message: 'You successfully logged in to this website',
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                          duration: 3000
                        }
                    })
    
                    cookie.remove('userdata', { path: '/' })
                    cookie.remove('userlogin', { path: '/' })
    
                    var expires = new Date();
                    expires.setSeconds(21600);
                    cookie.save('userdata', response.data, { path: '/',expires });
                    cookie.save('userlogin','true', { path: '/',expires })
    
                    this.props.history.push('/');
    
                }else{
                    this.setState({
                        loader:false
                    })
                    store.addNotification({
                        title: 'Failed',
                        message: 'Please check your email and password',
                        type: 'warning',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                          duration: 3000
                        }
                    })
                }
            })

        }else{
            this.validator.showMessages();
            this.forceUpdate();
        }


        
        
        
    }

    render() {
        return (
            <>
            

    
<style dangerouslySetInnerHTML={{__html: "\n\nbody {\n\n\n\t\t\tbackground: url(https://source.unsplash.com/user/erondu/1600x900) no-repeat center center fixed;\n\n\t\t\t-webkit-background-size: cover;\n\n\t\t\t-moz-background-size: cover;\n\n\t\t\t-o-background-size: cover;\n\n\t\t\tbackground-size: cover;\n            \n\n\t\t}\n        \n        html {\n    background: none;\n}\n\n\n\n\t" }} />

            <div className="account-pages my-5 pt-5">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card">
                        <div className="card-body">
                            <div className="text-center mt-4">
                            <div className="mb-3">
                                {/* <a href="index.html"><img src="/assets/images/logo-dark.png" height={30} alt="logo" /></a> */}
                            </div>
                            </div>
                            <div className="p-3">
                            <h4 className="font-size-18 text-muted mt-2 text-center">Welcome Back !</h4>
                            <p className="text-muted text-center mb-4">Sign in to continue to QtonixBlog</p>
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleChange} />
                                <h6 className="text-danger">{this.validator.message('email', this.state.email, 'required|email')}</h6>
                                
                                </div>
                                <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange}  />
                                <h6 className="text-danger">{this.validator.message('password', this.state.password, 'required')}</h6>
                                
                                </div>
                                <div className="form-group row mt-4">
                                <div className="col-sm-6 mt-2">
                                    <Link exact to='/forgotpassword' className="text-muted"><i className="mdi mdi-lock" /> Forgot your password?</Link>
                                </div>
                                <div className="col-sm-6 text-right">
                                    {this.state.loader
                                    ?
                                    <center>
                                    <Loader type="TailSpin" color="#2f8ee0" height={30} width={30} />
                                    </center>
                                    :
                                    <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                                    
                                    }
                                    
                                </div>
                                </div>
                            </form>
                            </div>

                            <div className="row" hidden>
                                <div className="col-md-12">
                                    <center>
                                    <h6><img src={this.state.ip_country_flag} alt="" width="65px"/></h6>
                                    </center>
                                </div>
                                <div className="col-md-6">
                                    <p>IP: {this.state.ip_ip}</p>
                                    <p>Country: {this.state.ip_country_name} - {this.state.ip_country_code}</p>
                                    <p>Region: {this.state.ip_region}</p>
                                    <p>City: {this.state.ip_city}</p>
                                    <p>ZIP: {this.state.ip_zip}</p>
                                    <p>Latitude: {this.state.ip_latitude}</p>
                                    <p>Longitude: {this.state.ip_longitude}</p>
                                    <p>Timezone: {this.state.ip_timezone}</p>
                                    <p>Currency: {this.state.ip_currency} - {this.state.ip_currency_name}</p>
                                    <p>ORG: {this.state.ip_org}</p>

                                </div>
                                <div className="col-md-6">
                                    <p>OS: {this.state.osName}</p>
                                    <p>OS Version: {this.state.osVersion}</p>
                                    <p>Mobile Vendor: {this.state.mobileVendor}</p>
                                    <p>Mobile Model: {this.state.mobileModel}</p>
                                    <p>Device Type: {this.state.deviceType}</p>
                                    <p>Browser: {this.state.browserName}</p>
                                    <p>Browser version: {this.state.browserVersion}</p>
                                    <p>Browser full version: {this.state.fullBrowserVersion}</p>

                                </div>
                                <div className="col-md-12">
                                <iframe src={`//maps.google.com/maps?q=${this.state.ip_latitude},${this.state.ip_longitude}&z=15&output=embed`} width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" />
                                </div>
                            </div>  
                            


                        </div>
                        </div>
                        {/* <div className="mt-5 text-center">
                        <p>© 2020 QtonixBlog</p>
                        </div> */}
                    </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps, {userLogin})(Login)
