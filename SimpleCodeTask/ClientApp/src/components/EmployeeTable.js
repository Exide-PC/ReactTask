import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class EmployeeTable extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onHeaderClick(key) {
    let { sort } = this.state || {};

    if (!sort || sort["column"] != key) {
      sort = {
          mode: "desc",
          column: key
        };
    }
    else {
      sort["mode"] = sort["mode"] === "desc" ? "asc" : "desc";
    }

    this.setState({ sort: sort });
  }
  
  render() {
    let finalArray = this.state.sort
      ? this.props.employees.sort((a, b) => a[this.state.sort.column] - b[this.state.sort.column])
      : this.props.employees;

    if (this.state.sort && this.state.sort.mode === "desc")
      finalArray.reverse();

    const headers = ["Name", "Email", "Salary", "Birth"];

    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              {headers.map(h => <th onClick={() => this.onHeaderClick(h.toLowerCase())}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {finalArray.map(employee =>
              <tr key={employee.name}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.birth.toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-link" onClick={() => this.props.onDelete(employee.id)}>Delete</button>
                  <button className="btn btn-link" onClick={() => this.props.history.push("/employee/" + employee.id)}>Edit</button>
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
