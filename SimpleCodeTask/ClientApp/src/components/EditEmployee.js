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

  onTextChanged(e) {
    const field = e.target.id;
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
        <div style={{ marginTop: "30px" }} class="form-group">
          <label for="name">Employee name</label>
          <input value={name} onChange={(e) => this.onTextChanged(e)} type="text" class="form-control" id="name" name="name" placeholder="Enter name"/>
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input value={email} onChange={(e) => this.onTextChanged(e)} type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div class="form-group">
          <label for="salary">Salary</label>
          <input value={salary} onChange={(e) => this.onTextChanged(e)} type="number" class="form-control" id="salary" name="salary" placeholder="Enter salary" />
        </div>
        <div class="form-group">
          <label for="birth">Birthday</label><br/>
          <DatePicker
            id="birthdate"
            name="birth"
            selected={birth}
            inline
            onChange={(e) => this.handleChange(e)} />
        </div>
        <button class="btn btn-primary">Ok</button>
      </form>
    );
  }
}

export default withRouter(EditEmployee);