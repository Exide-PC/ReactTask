import React, { Component } from 'react';
import EmployeeApi from './EmployeeApi';
import { EmployeeTable } from './EmployeeTable';
import PageSelector from './PageSelector';

export class FetchEmployee extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };

    EmployeeApi.getEmployees(1, (data) => {
      this.setState({ ...data, loading: false });
    });
  }

  onPageClick(pageNum) {
    EmployeeApi.getEmployees(pageNum, (data) => {
      this.setState({ ...data, loading: false });
    });
  }

  render() {    
    if (this.state.loading)
      return <h2><em>Loading...</em></h2>;

    const { pageNum, pageCount, employees } = this.state;

    return (
      <div>
        <h1>Employee list</h1>
        <p>This component demonstrates fetching data from the server.</p>
        <PageSelector
          pageNum={pageNum}
          pageCount={pageCount}
          onPageClick={(p) => this.onPageClick(p)} />
        <EmployeeTable employees={employees} />        
      </div>
    );
  }
}
