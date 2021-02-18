import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {ProtectedRouteUser} from './auth/auth'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import './scss/main.scss';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import 'sweetalert2/src/sweetalert2.scss'

import Home from './pages/Home';
import BlankPage from './pages/BlankPage';
import UsersAll from "./pages/users/UsersAll";
import UserView from './pages/users/UserView'
import UsersCreate from "./pages/users/UsersCreate";
import UserEdit from './pages/users/UserEdit'

import BlogAll from './pages/blogs/BlogAll'
import BlogCreate from './pages/blogs/BlogCreate'
import BlogView from './pages/blogs/BlogView'
import BlogEdit from './pages/blogs/BlogEdit'

import BlogCategory from './pages/settings/blogcategory/BlogCategory'
import BlogCategoryCreate from './pages/settings/blogcategory/BlogCategoryCreate'
import BlogCategoryEdit from './pages/settings/blogcategory/BlogCategoryEdit'

import AllPage from './pages/webpage/AllPage'
import CreatePage from './pages/webpage/CreatePage'
import ViewPage from './pages/webpage/ViewPage'
import EditPage from './pages/webpage/EditPage'

import RequestsAll from './pages/requests/RequestsAll'

import Menu from './pages/menu/Menu'

import NestableItem from './pages/NestableItem'

import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

import LogindetailsAll from './pages/logindetails/LogindetailsAll'
import LogindetailsView from './pages/logindetails/LogindetailsView'

function App() {
  return (
    <>
      <Router>
        <ReactNotification />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />


          <ProtectedRouteUser exact path="/" component={Home} />
          <ProtectedRouteUser exact path="/blankpage" component={BlankPage} />

          {/* USER */}
          <ProtectedRouteUser exact path="/users" component={UsersAll} />
          <ProtectedRouteUser exact path="/users/create" component={UsersCreate} />
          <ProtectedRouteUser exact path="/users/:id" component={UserView} />
          <ProtectedRouteUser exact path="/users/:id/edit" component={UserEdit} />
          {/* USER */}


          {/* LOGIN DETAILS */}
          <ProtectedRouteUser exact path="/logindetails" component={LogindetailsAll} />
          <ProtectedRouteUser exact path="/logindetails/:id" component={LogindetailsView} />
          {/* LOGIN DETAILS */}


          <ProtectedRouteUser exact path="/requests" component={RequestsAll} />

          


          <ProtectedRouteUser exact path="/menu" component={Menu} />

          
          <ProtectedRouteUser exact path="/nestable" component={NestableItem} />

          
          

          <ProtectedRouteUser exact path='/blogs' component={BlogAll} />
          <ProtectedRouteUser exact path='/blogs/create' component={BlogCreate} />
          <ProtectedRouteUser exact path='/blogs/:id' component={BlogView} />
          <ProtectedRouteUser exact path='/blogs/:id/edit' component={BlogEdit} />

          <ProtectedRouteUser exact path='/pages' component={AllPage} />
          <ProtectedRouteUser exact path='/pages/create' component={CreatePage} />
          <ProtectedRouteUser exact path='/pages/:id' component={ViewPage} />
          <ProtectedRouteUser exact path='/pages/:id/edit' component={EditPage} />



          

          <ProtectedRouteUser exact path='/settings/blogcategory' component={BlogCategory} />
          <ProtectedRouteUser exact path='/settings/blogcategory/create' component={BlogCategoryCreate} />
          <ProtectedRouteUser exact path='/settings/blogcategory/:id/edit' component={BlogCategoryEdit} />


        </Switch>

    </Router>
    </>
  );
}

export default App;
