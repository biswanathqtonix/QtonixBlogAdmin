import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from '../includes/Footer'
import Sidebar from '../includes/Sidebar'
import TopBar from '../includes/TopBar'

import {fetchAllUser,fetchAllBlogCategory,fetchBlogs,fetchPages} from '../actions'
import Loader from 'react-loader-spinner'

import $ from "jquery";

export class Home extends Component {

    componentDidMount() {
        this.props.fetchAllUser();
        this.props.fetchAllBlogCategory();
        this.props.fetchBlogs();
        this.props.fetchPages();

    

        $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
            console.log(data)
        })


        $.getJSON('http://api.ipstack.com/103.151.128.199?access_key=1a39f5f06e911f094bc8c5a0c0faca33', function(data) {
                console.log(JSON.stringify(data, null, 2));
        });
    }

    render() {
        var mprops = this.props;
        var allusers = mprops.allusers;
        var allblogcategories = mprops.allblogcategories;
        var allblogs = mprops.allblogs;
        var allpages = mprops.allpages;


        console.log()

        return (
            <>
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
            <div className="content">
            <TopBar pagename="Dashboard" />

            <div className="page-content-wrapper">
                   
            <div className="row">
            <div className="col-md-6 col-xl-3">
                <div className="card text-center m-b-30">
                <div className="mb-2 card-body text-muted">
                    
                    {Object.keys(allusers).length===0
                    ?
                    <Loader type="TailSpin" color="#29598a" height={30} width={30} />
                    :
                    <h3 className="text-info">{Object.keys(allusers).length}</h3>
                    }

                    Users
                </div>
                </div>
            </div>
            <div className="col-md-6 col-xl-3">
                <div className="card text-center m-b-30">
                <div className="mb-2 card-body text-muted">
                    {Object.keys(allblogs).length===0
                    ?
                    <Loader type="TailSpin" color="#29598a" height={30} width={30} />
                    :
                    <h3 className="text-purple">{Object.keys(allblogs).length}</h3>
                    }
                    Blogs
                </div>
                </div>
            </div>
            <div className="col-md-6 col-xl-3">
                <div className="card text-center m-b-30">
                <div className="mb-2 card-body text-muted">
                    {Object.keys(allpages).length===0
                    ?
                    <Loader type="TailSpin" color="#29598a" height={30} width={30} />
                    :
                    <h3 className="text-primary">{Object.keys(allpages).length}</h3>
                    }
                    Pages
                </div>
                </div>
            </div>
            <div className="col-md-6 col-xl-3">
                <div className="card text-center m-b-30">
                <div className="mb-2 card-body text-muted">
                    {Object.keys(allblogcategories).length===0
                    ?
                    <Loader type="TailSpin" color="#29598a" height={30} width={30} />
                    :
                    <h3 className="text-danger">{Object.keys(allblogcategories).length}</h3>
                    }
                    Blog Categories
                </div>
                </div>
            </div>
            </div>






            <div className="row">
                <div className="col-xl-8">
                    <div className="card m-b-30">
                    <div className="card-body">
                        <h4 className="mt-0 m-b-30 header-title">Latest Transactions</h4>
                        <div className="table-responsive">
                        <table className="table m-t-20 mb-0 table-vertical">
                            <tbody>
                            <tr>
                                <td>
                                <img src="assets/images/users/avatar-2.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2" />
                                Herbert C. Patton
                                </td>
                                <td><i className="mdi mdi-checkbox-blank-circle text-success" /> Confirm</td>
                                <td>
                                $14,584
                                <p className="m-0 text-muted font-14">Amount</p>
                                </td>
                                <td>
                                5/12/2016
                                <p className="m-0 text-muted font-14">Date</p>
                                </td>
                                <td>
                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <img src="assets/images/users/avatar-3.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2" />
                                Mathias N. Klausen
                                </td>
                                <td><i className="mdi mdi-checkbox-blank-circle text-warning" /> Waiting payment</td>
                                <td>
                                $8,541
                                <p className="m-0 text-muted font-14">Amount</p>
                                </td>
                                <td>
                                10/11/2016
                                <p className="m-0 text-muted font-14">Date</p>
                                </td>
                                <td>
                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <img src="assets/images/users/avatar-4.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2" />
                                Nikolaj S. Henriksen
                                </td>
                                <td><i className="mdi mdi-checkbox-blank-circle text-success" /> Confirm</td>
                                <td>
                                $954
                                <p className="m-0 text-muted font-14">Amount</p>
                                </td>
                                <td>
                                8/11/2016
                                <p className="m-0 text-muted font-14">Date</p>
                                </td>
                                <td>
                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <img src="assets/images/users/avatar-5.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2" />
                                Lasse C. Overgaard
                                </td>
                                <td><i className="mdi mdi-checkbox-blank-circle text-danger" /> Payment expired</td>
                                <td>
                                $44,584
                                <p className="m-0 text-muted font-14">Amount</p>
                                </td>
                                <td>
                                7/11/2016
                                <p className="m-0 text-muted font-14">Date</p>
                                </td>
                                <td>
                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <img src="assets/images/users/avatar-6.jpg" alt="user-image" className="thumb-sm rounded-circle mr-2" />
                                Kasper S. Jessen
                                </td>
                                <td><i className="mdi mdi-checkbox-blank-circle text-success" /> Confirm</td>
                                <td>
                                $8,844
                                <p className="m-0 text-muted font-14">Amount</p>
                                </td>
                                <td>
                                1/11/2016
                                <p className="m-0 text-muted font-14">Date</p>
                                </td>
                                <td>
                                <button type="button" className="btn btn-secondary btn-sm waves-effect">Edit</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card m-b-30">
                    <div className="card-body">
                        <h4 className="mt-0 m-b-15 header-title">Recent Activity Feed</h4>
                        <ol className="activity-feed mb-0">
                        <li className="feed-item">
                            <span className="date">Sep 25</span>
                            <span className="activity-text">Responded to need “Volunteer Activities”</span>
                        </li>
                        <li className="feed-item">
                            <span className="date">Sep 24</span>
                            <span className="activity-text">Added an interest “Volunteer Activities”</span>
                        </li>
                        <li className="feed-item">
                            <span className="date">Sep 23</span>
                            <span className="activity-text">Joined the group “Boardsmanship Forum”</span>
                        </li>
                        <li className="feed-item">
                            <span className="date">Sep 21</span>
                            <span className="activity-text">Responded to need “In-Kind Opportunity”</span>
                        </li>
                        <li className="feed-item">
                            <span className="date">Sep 18</span>
                            <span className="activity-text">Created need “Volunteer Activities”</span>
                        </li>
                        <li className="feed-item">
                            <span className="date">Sep 17</span>
                            <span className="activity-text">Attending the event “Some New Event”. Responded to needed.</span>
                        </li>
                        <li className="feed-item pb-1">
                            <span className="activity-text">
                            <a href className="text-primary">More Activities</a>
                            </span>
                        </li>
                        </ol>
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
    allusers:state.userslist,
    allblogcategories:state.blogcategories,
    allblogs:state.blogs,
    allpages:state.pages,

})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, {fetchAllUser,fetchAllBlogCategory,fetchBlogs,fetchPages})(Home)
