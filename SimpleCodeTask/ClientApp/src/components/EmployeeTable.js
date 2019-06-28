import React, { Component } from 'react';

export class EmployeeTable extends Component {

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
              <th>Email</th>
              <th>Salary</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {this.props.employees.map(employee =>
              <tr key={employee.name}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.birth}</td>
                <td>
                  <button onClick={() => this.props.onDelete(employee.id)}>del</button>
                  <button>edit</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
