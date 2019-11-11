import React, { Component } from "react";

import AuthContext from "../context/authContext";
import LoginForm from "../components/LoginForm/LoginForm";

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.adminCodeInput = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {
      email: email,
      password: password
    };

    let api = "/api/login";

    if (!this.state.isLogin) {
      api = "/api/users";
      requestBody.adminCode = this.adminCodeInput.current.value;
    }
    fetch(api, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        if (resData.token) {
          this.context.login(
            resData.token,
            resData.userId,
            resData.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <LoginForm
          onFormSubmition={this.submitHandler}
          emailEl={this.emailInput}
          passwordEl={this.passwordInput}
          adminCodeEl={this.adminCodeInput}
          onSwitchMode={this.switchModeHandler}
          loginState={this.state.isLogin}
        />
      </div>
    );
  }
}

export default AuthPage;
