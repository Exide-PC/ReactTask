import React, { Component } from 'react';

export class EmployeeTable extends Component {
  displayName = EmployeeTable.name

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {this.props.employees.map(employee =>
              <tr key={employee.name}>
                <td>{employee.name}</td>
                <td>{employee.salary}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
