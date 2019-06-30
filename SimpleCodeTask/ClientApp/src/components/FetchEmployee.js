import React, { Component } from 'react';
import EmployeeApi from './EmployeeApi';
import EmployeeTable from './EmployeeTable';
import PageSelector from './PageSelector';
import { withRouter } from 'react-router-dom';

class FetchEmployee extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };

    EmployeeApi.getPage(1, (data) => {
      this.setState({ ...data, loading: false });
    });
  }

  onPageClick(pageNum) {
    EmployeeApi.getPage(pageNum, (data) => {
      this.setState({ ...data, loading: false });
    });
  }

  onDelete(id) {
    EmployeeApi.delete(id, (resp) => {
      const { pageNum } = this.state;
      EmployeeApi.getPage(pageNum, (data) => {
        this.setState({ ...data, loading: false })
      })
    });
  }

  onUpdate(employee) {
    debugger;
  }

  render() {    
    if (this.state.loading)
      return <h2><em>Loading...</em></h2>;

    const { pageNum, pageCount, employees } = this.state;

    return (
      <div>
        <h1>Employee database</h1>
        <button className="btn btn-primary" onClick={() => this.props.history.push("/add")}>Add new</button><br />
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

export default withRouter(FetchEmployee);