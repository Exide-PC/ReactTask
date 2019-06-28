import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchEmployee } from './components/FetchEmployee';
import EditEmployee from './components/EditEmployee';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route path='/' exact component={FetchEmployee} />
        <Route path='/employee/:id' component={EditEmployee} /> 
      </Layout>
    );
  }
}
