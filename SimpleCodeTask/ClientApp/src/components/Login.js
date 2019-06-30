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
      <div style={{ maxWidth: 300, margin: 'auto', marginTop: 100 }}>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div class="form-group">
            <label for="login">Login</label>
            <input type="text" class="form-control" id="login" name="login" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" name="password" />
          </div>
          <button class="btn btn-primary" style={{ width: '100%', display: 'block' }}>Sign in</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);