import React, { Component } from 'react';
import Auth from './Auth';
import { withRouter } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    Auth.login(data, () => {
      if (Auth.getIsLogged())
        this.props.history.push("/");
      else
        alert("Неверный логин или пароль");
    });
  }

  render() {
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <h1>Login page</h1>
        <p>
          <label htmlFor="login">Login</label>
        </p>
        <p>
          <input id="login" name="login" type="text"/>
        </p>
        <p>
          <label htmlFor="pass">Name</label>
        </p>
        <p>
          <input id="password" name="password" type="text" />
        </p>
        <button>Войти</button>
      </form>
    );
  }
}

export default withRouter(Login);