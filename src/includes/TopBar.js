import React, { Component } from 'react'
import cookie from 'react-cookies'
import { store } from 'react-notifications-component';
import { withRouter } from 'react-router-dom'
import {Helmet} from "react-helmet";
import { MdSettings,MdCropFree,MdNotifications,MdLockOpen } from "react-icons/md";


class TopBar extends Component {

 
  handleLogout = () => {
    cookie.remove('userlogin',{path:'/'})
    cookie.remove('userdata',{path:'/'})
    

    store.addNotification({
      title: 'Well done',
      message: 'You successfully logged out from this website',
      type: 'success',                         // 'default', 'success', 'info', 'warning'
      container: 'top-right',                // where to position the notifications
      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
      dismiss: {
        duration: 3000
      }
    })

    this.props.history.push(`/login/`, null);
  }

    render() {
      const user = cookie.load('userdata');
        return (
            <>
            <Helmet>
              <title> 
              { ` QtonixBlog - ${ this.props.pagename }` }
              </title>
            </Helmet>
                {/* Top Bar Start */}
            <div className="topbar">
              <nav className="navbar-custom">
                {/* Search input */}
                <div className="search-wrap" id="search-wrap">
                  <div className="search-bar">
                    <input className="search-input" type="search" placeholder="Search" />
                    <a href="#" className="close-search toggle-search" data-target="#search-wrap">
                      <i className="mdi mdi-close-circle" />
                    </a>
                  </div>
                </div>
                <ul className="list-inline float-right mb-0">
                  {/* Search */}
                  {/* <li className="list-inline-item dropdown notification-list">
                    <a className="nav-link waves-effect toggle-search" href="#" data-target="#search-wrap">
                      <i className="mdi mdi-magnify noti-icon" />
                    </a>
                  </li> */}
                  {/* Fullscreen */}
                  <li className="list-inline-item dropdown notification-list hidden-xs-down">
                    <a className="nav-link waves-effect" href="#" id="btn-fullscreen">
                      <MdCropFree />
                    </a>
                  </li>
                  {/* notification*/}
                  <li className="list-inline-item dropdown notification-list">
                    <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                      <MdNotifications />
                      <span className="badge badge-danger noti-icon-badge">3</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                      {/* item*/}
                      <div className="dropdown-item noti-title">
                        <h5>Notification (3)</h5>
                      </div>
                      {/* item*/}
                      <a href="javascript:void(0);" className="dropdown-item notify-item active">
                        <div className="notify-icon bg-success"><i className="mdi mdi-cart-outline" /></div>
                        <p className="notify-details"><b>Your order is placed</b><small className="text-muted">Dummy text of the printing and typesetting industry.</small></p>
                      </a>
                      {/* item*/}
                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <div className="notify-icon bg-warning"><i className="mdi mdi-message" /></div>
                        <p className="notify-details"><b>New Message received</b><small className="text-muted">You have 87 unread messages</small></p>
                      </a>
                      {/* item*/}
                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <div className="notify-icon bg-info"><i className="mdi mdi-martini" /></div>
                        <p className="notify-details"><b>Your item is shipped</b><small className="text-muted">It is a long established fact that a reader will</small></p>
                      </a>
                      {/* All*/}
                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        View All
                      </a>
                    </div>
                  </li>
                  {/* User*/}
                  <li className="list-inline-item dropdown notification-list">
                    <a className="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                      {/* <img src={process.env.REACT_APP_BACKENDURL+'/'+user.image} alt="user" className="rounded-circle" /> */}
                      {/* <i className="ion-ios7-bell noti-icon" /> */}
                      <MdSettings />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                      {/* <a className="dropdown-item" href="#"><i className="dripicons-user text-muted" /> Profile</a>
                      <a className="dropdown-item" href="#"><i className="dripicons-wallet text-muted" /> My Wallet</a>
                      <a className="dropdown-item" href="#"><span className="badge badge-success float-right m-t-5">5</span><i className="dripicons-gear text-muted" /> Settings</a>
                      <a className="dropdown-item" href="#"><i className="dripicons-lock text-muted" /> Lock screen</a> */}
                      {/* <div className="dropdown-divider" /> */}
                      <a className="dropdown-item" onClick={this.handleLogout}><MdLockOpen /> Logout</a>
                    </div>
                  </li>
                </ul>
                {/* Page title */}
                <ul className="list-inline menu-left mb-0">
                  <li className="list-inline-item">
                    <button type="button" className="button-menu-mobile open-left waves-effect">
                      <i className="ion-navicon" />
                    </button>
                  </li>
                  <li className="hide-phone list-inline-item app-search">
                    <h3 className="page-title">{this.props.pagename}</h3>
                  </li>
                </ul>
                <div className="clearfix" />
              </nav>
            </div>
            {/* Top Bar End */}

            </>

        )
    }
}

export default withRouter(TopBar);
