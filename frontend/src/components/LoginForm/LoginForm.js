import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = props => {
  return (
    <div className="row justify-content-center my-5">
      <div className="col-md-12 text-center">
        <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
      </div>
      <div className="col-md-8">
        <form onSubmit={props.onFormSubmition}>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="username">
              Username
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                placeholder="Please insert your username"
                ref={props.emailEl}
                required
                autoFocus
              />
            </div>
          </div>
          <div className="form-group row justify-content-between">
            <label className="my-2 mx-3" htmlFor="password">
              Password
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Please insert your password"
                required
                ref={props.passwordEl}
              />
            </div>
          </div>
          <div className="form-group row justify-content-end mt-5 mt-sm-0">
            <div className="col-sm-9 ">
              <button className="btn btn-lg btn-primary btn-block">
                {props.loginState ? "Sign in" : "Register"}
              </button>
            </div>
          </div>
        </form>
        <div>
          <Link className="caption" to="/forgot">
            I have forgotten my password
          </Link>
        </div>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default LoginForm;
