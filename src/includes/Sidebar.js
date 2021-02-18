import React, { Component } from 'react'
import Safe from "react-safe"
import {Link} from 'react-router-dom'

export default class Sidebar extends Component {

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "/assets/js/jquery.min.js";
        script.src = "/assets/js/bootstrap.bundle.min.js";
        script.src = "/assets/js/modernizr.min.js";
        script.src = "/assets/js/jquery.slimscroll.js";
        script.src = "/assets/js/waves.js";
        script.src = "/assets/js/jquery.nicescroll.js";
        script.src = "/assets/js/jquery.scrollTo.min.js";

        script.src = "/assets/plugins/morris/morris.min.js";
        script.src = "/assets/plugins/raphael/raphael-min.js";


        script.src = "/assets/pages/dashboard.js";
        script.src = "/assets/js/app.js";


        script.async = true;

        document.body.appendChild(script);
      }


    render() {
        return (
            <>


                {/* ========== Left Sidebar Start ========== */}
    {/* <div className="left side-menu" style={{background: 'radial-gradient(at 50% -20%, #1967a9, #0a1832) fixed'}}> */}
    <div className="left side-menu">

      {/* LOGO */}
      <div className="topbar-left">
        <div className>
          {/*<a href="index.html" class="logo text-center">Fonik</a>*/}
          <a href="index.html" className="logo"><img src="/assets/images/logo.png" alt="logo" height={20} /></a>
        </div>
      </div>
      <div className="sidebar-inner slimscrollleft">
        <div id="sidebar-menu">
          <ul>
            <li className="menu-title">Main</li>
            <li>
              <Link exact to="/" className="waves-effect"><i className="dripicons-device-desktop" /><span> Dashboard </span></Link>
            </li>
            <li>
              <Link exact to="/requests" className="waves-effect"><i className="dripicons-direction" /><span> Requests </span></Link>
            </li>
            <li>
              <Link exact to="/menu" className="waves-effect"><i className="dripicons-network-3" /><span> Menu </span></Link>
            </li>
            <li>
              <Link exact to="/logindetails" className="waves-effect"><i className="dripicons-clock" /><span> Login Details </span></Link>
            </li>
            <li className="has_sub">
              <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-blog" /><span> Blogs <span className="float-right"><i className="mdi mdi-chevron-right" /></span> </span></a>
              <ul className="list-unstyled">
                <li><Link exact to="/blogs">All Blogs</Link></li>
                <li><Link exact to="/blogs/create">Create Blogs</Link></li>
              </ul>
            </li>
            <li className="has_sub">
              <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-user" /><span> Users <span className="float-right"><i className="mdi mdi-chevron-right" /></span> </span></a>
              <ul className="list-unstyled">
                <li><Link exact to="/users">All Users</Link></li>
                <li><Link exact to="/users/create">Create User</Link></li>
              </ul>
            </li>

            <li className="has_sub">
              <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-browser" /><span> Pages <span className="float-right"><i className="mdi mdi-chevron-right" /></span> </span></a>
              <ul className="list-unstyled">
                <li><Link exact to="/pages">All Pages</Link></li>
                <li><Link exact to="/pages/create">Create Page</Link></li>
              </ul>
            </li>

            <li className="has_sub">
              <a href="javascript:void(0);" className="waves-effect"><i className="dripicons-gear" /><span> Settings <span className="float-right"><i className="mdi mdi-chevron-right" /></span> </span></a>
              <ul className="list-unstyled">
                <li><Link exact to="/settings/blogcategory">Blog Category</Link></li>
              </ul>
            </li>

            





            
          </ul>
        </div>
        <div className="clearfix" />
      </div> {/* end sidebarinner */}
    </div>
    {/* Left Sidebar End */}
            </>
        )
    }
}
