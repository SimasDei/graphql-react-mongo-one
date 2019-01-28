import React, { Component } from 'react';
import './Auth.css';
import AuthContext from '../context/auth-context';

export class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailElement = React.createRef();
    this.passwordElement = React.createRef();
  }

  submitHander = e => {
    e.preventDefault();
    const email = this.emailElement.current.value;
    const password = this.passwordElement.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"})
            {
              _id
              email
            }
          }
        `
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Request Failed');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  modeSwitchHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  render() {
    return (
      <form
        onSubmit={this.submitHander}
        className="auth-form"
        action=""
        method="post"
      >
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" name="email" id="email" ref={this.emailElement} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={this.passwordElement}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.modeSwitchHandler}>
            Switch to {this.state.isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
