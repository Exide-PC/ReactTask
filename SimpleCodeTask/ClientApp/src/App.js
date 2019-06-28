import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EmployeeTable } from './components/EmployeeTable';
import { FetchEmployee } from './components/FetchEmployee';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
          <Route path='/' component={FetchEmployee} />
      </Layout>
    );
  }
}
