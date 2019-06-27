import React, { Component } from 'react';

export class FetchEmployee extends Component {
  displayName = FetchEmployee.name

  constructor(props) {
    super(props);
    this.state = { employees: [], loading: true };

    fetch('api/Employee/')
      .then(response => response.json())
        .then(data => {
          this.setState({ ...data, loading: false });
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
      : FetchEmployee.renderEmployeeTable(this.state.employees);

    return (
      <div>
        <h1>Employee list</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
