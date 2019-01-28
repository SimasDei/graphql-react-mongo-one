import React, { Component } from 'react';
import './Auth.css';

export class AuthPage extends Component {
  render() {
    return (
      <form className="auth-form" action="" method="post">
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button">Switch to Sign Up</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
