import React, { Component } from 'react';

export class EmployeeList extends Component {
  displayName = EmployeeList.name

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };

    fetch('api/Employee/GetList')
      .then(response => response.json())
      .then(data => {
        this.setState({ forecasts: data, loading: false });
      });
  }

  static renderEmployeeTable(employees) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee =>
            <tr key={employee.name}>
              <td>{employee.name}</td>
              <td>{employee.salary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : EmployeeList.renderEmployeeTable(this.state.forecasts);

    return (
      <div>
        <h1>Employee list</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
