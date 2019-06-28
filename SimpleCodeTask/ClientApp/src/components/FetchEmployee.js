import React, { Component } from 'react';
import EmployeeApi from './EmployeeApi';
import { EmployeeTable } from './EmployeeTable';
import PageSelector from './PageSelector';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

export class FetchEmployee extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };

    EmployeeApi.get(1, (data) => {
      this.setState({ ...data, loading: false });
    });
  }

  onPageClick(pageNum) {
    EmployeeApi.get(pageNum, (data) => {
      this.setState({ ...data, loading: false });
    });
  }

  onDelete(id) {
    EmployeeApi.delete(id, (resp) => {
      const { pageNum } = this.state;
      EmployeeApi.get(pageNum, (data) => {
        this.setState({ ...data, loading: false })
      })
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
        <Link to={'employee/1'}>
            Add new
        </Link>
        <PageSelector
          pageNum={pageNum}
          pageCount={pageCount}
          onPageClick={(p) => this.onPageClick(p)} />
        <EmployeeTable
          employees={employees}
          onDelete={(id) => this.onDelete(id)} />        
      </div>
    );
  }
}
