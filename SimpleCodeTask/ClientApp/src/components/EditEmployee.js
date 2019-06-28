import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import EmployeeApi from './EmployeeApi';

class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: new Date() };
  }

  handleChange(value) {
    this.setState({ startDate: value });
  }

  onSubmit(event) {
    const data = new FormData(event.target);
    EmployeeApi.add(data, (responce) => {
      this.setState({ redirect: true });
    });

    event.preventDefault();
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
      

    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <p>
          <label htmlFor="name">Name</label>
        </p>
        <p>
          <input id="name" name="name" type="text" />
        </p>
        <p>
          <label htmlFor="email">Email</label>
        </p>
        <p>
          <input id="email" name="email" type="email" />
        </p>
        <p>
          <label htmlFor="salary">Salary</label>
        </p>
        <p>
          <input id="salary" name="salary" type="text" />
        </p>
        <p>
          <label htmlFor="birthdate">Birth date</label>
        </p>
        <p>
          <DatePicker
            id="birthdate"
            name="birth"
            selected={this.state.startDate}
            onChange={(e) => this.handleChange(e)} />
        </p>
        <button class="btn btn-primary">Ok</button>
      </form>
    );
  }
}

export default EditEmployee;