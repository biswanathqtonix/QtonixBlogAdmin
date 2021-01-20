import React, { Component } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import API from '../api/API'

export default class ForgotPassword extends Component {

    constructor(props){
        super(props)
        this.state={
            email:''
        }
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        
        API.get(`/user/forgotpassword/${this.state.email}`)
        .then(response=>{
            if(response.data.response === 'true'){
                Swal.fire('Success', `Please check your email: ${this.state.email}`, 'success')
                this.props.history.push('/login',null);
            }else{
                Swal.fire('Failed', 'Please enter correct registrated email address', 'error')
            }
        })



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
                                <input type="email" className="form-control" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                                </div>
                                <div className="form-group row mt-4">
                                <div className="col-sm-12 text-right">
                                    <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Email Me</button>
                                </div>
                                </div>
                            </form>
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
