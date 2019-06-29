import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import Auth from './Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.getIsLogged() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default PrivateRoute;