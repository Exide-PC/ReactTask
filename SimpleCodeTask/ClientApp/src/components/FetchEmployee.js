import React, { Component } from 'react';
import EmployeeApi from './EmployeeApi';
import EmployeeTable from './EmployeeTable';
import PageSelector from './PageSelector';
import { withRouter } from 'react-router-dom';

class FetchEmployee extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };

    EmployeeApi.getPage(0, (data) => {
      this.updateState(data);
    });
  }

  onPageClick(pageNum) {
    EmployeeApi.getPage(pageNum, (data) => {
      this.updateState(data);
    });
  }

  onDelete(id) {
    EmployeeApi.delete(id, (resp) => {
      const { pageNum } = this.state.data;
      EmployeeApi.getPage(pageNum, (data) => {
        this.updateState(data);
      });
    });
  }

  updateState(data) {
    const state = data
      ? { data: data, loading: false }
      : { data: {}, nothing: true, loading: false };

    this.setState(state);
  }

  render() {
    if (this.state.loading)
      return <h2 style={{ textAlign: 'center' }}><em>Loading...</em></h2 >;
    
    const { pageNum, pageCount, employees } = this.state.data || {};

    const tableAreaContent = employees
      ? <div>
          <PageSelector
            pageNum={pageNum}
            pageCount={pageCount}
            onPageClick={(p) => this.onPageClick(p)} />
          <EmployeeTable
            employees={employees}
            onDelete={(id) => this.onDelete(id)} />   
        </div>
      : <h2 style={{ textAlign: 'center' }}><em>Nothing to show :c</em></h2>

    return (
      <div>
        <h1>Employee database</h1>
        <button className="btn btn-primary" onClick={() => this.props.history.push("/add")}>Add new</button><br />
        {tableAreaContent}      
      </div>
    );
  }
}

export default withRouter(FetchEmployee);