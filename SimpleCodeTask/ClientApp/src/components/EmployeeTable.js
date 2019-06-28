import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

export class EmployeeTable extends Component {

  constructor(props) {
    super(props);
    debugger;
  }

  onEditClick(employee) {
    debugger;
    this.props.history.push("/employee/" + employee.id);
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
                  <button onClick={() => this.props.onDelete(employee.id)}>Delete</button>
                  <button onClick={() => this.onEditClick(employee)}>Edit</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(EmployeeTable);
