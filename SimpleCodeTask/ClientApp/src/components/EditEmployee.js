import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { withRouter } from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";
import EmployeeApi from './EmployeeApi';

class EditEmployee extends Component {
  constructor(props) {
    super(props);

    const path = this.props.history.location.pathname.split("/");

    if (path[1] == "employee") {
      this.state = { loading: true };

      const id = Number(path[2]);

      EmployeeApi.getById(id, (json) => {
        // as soon as we get json, we replace UTC string with Date object
        json["birth"] = new Date(json["birth"]);
        this.setState({ employee: json, loading: false });
      });
    }
    else {
      this.state = { employee: { birth: new Date() }, loading: false };
    }
  }

  onTextChanged(field, e) {
    const value = e.target.value;
    this.state.employee[field] = value;

    this.setState(this.state);
  }

  handleChange(value) {
    const employee = { ...this.state.employee, birth: value };
    this.setState({ employee: employee });
  }

  onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    // We want to pass the utc string instead of local dd/MM/yyyy
    data.set("birth", this.state.employee.birth.toUTCString());

    if (this.state.employee.id)
      data.set("id", this.state.employee.id);

    EmployeeApi.addOrUpdate(data, (responce) => {
      this.props.history.push("/");
    });
  }

  render() {

    const { employee, loading } = this.state;
    const { id, name, email, salary, birth } = employee || {};

    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <p>
          <label htmlFor="name">Name</label>
        </p>
        <p>
          <input id="name" name="name" type="text" value={name} onChange={(e) => this.onTextChanged("name", e)} />
        </p>
        <p>
          <label htmlFor="email">Email</label>
        </p>
        <p>
          <input id="email" name="email" type="email" value={email} onChange={(e) => this.onTextChanged("email", e)}/>
        </p>
        <p>
          <label htmlFor="salary">Salary</label>
        </p>
        <p>
          <input id="salary" name="salary" type="number" value={salary} onChange={(e) => this.onTextChanged("salary", e)}/>
        </p>
        <p>
          <label htmlFor="birthdate">Birth date</label>
        </p>
        <p>
          <DatePicker
            id="birthdate"
            name="birth"
            dateFormat="dd/MM/yyyy"
            selected={birth}
            onChange={(e) => this.handleChange(e)} />
        </p>
        <button class="btn btn-primary">Ok</button>
      </form>
    );
  }
}

export default withRouter(EditEmployee);