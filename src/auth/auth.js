import React from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from 'react-cookies'


export const ProtectedRouteUser = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {

        // const logindata = localStorage.getItem('userlogin') === 'true'
        const logindata = cookie.load('userlogin') === 'true';
  
      
        if (logindata) {

          //Check Email Verify
          // var data = JSON.parse(localStorage.getItem('userdata'));
          var data=cookie.load('userdata');


        //   if(data.email_verify=='not-verified'){
        //     return <Redirect to="/emailverify" />
        //   }else{
        //     return <Component {...props} />;
        //   }

          return <Component {...props} />;

        } else {

          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );

        }
      }}
    />
  );
};