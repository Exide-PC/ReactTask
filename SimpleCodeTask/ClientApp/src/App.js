import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { FetchEmployee } from './components/FetchEmployee';
import EditEmployee from './components/EditEmployee';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

export default class App extends Component {

  render() {
    return (
      <Layout>
        <Route path='/login/' exact component={Login} />
        <PrivateRoute path='/' exact component={FetchEmployee} />
        <PrivateRoute path='/employee/:id' component={EditEmployee} />
        <PrivateRoute path='/add/' exact component={EditEmployee} />
      </Layout>
    );
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}