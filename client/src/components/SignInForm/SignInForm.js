import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SignInForm.scss";
import logo from "../../assets/images/logo.PNG";

class SignInForm extends Component {
  // state = {
  //   isSignedUp: true,
  //   isLoggedIn: false,
  //   isLoginError: false,
  //   errorMessage: "",
  // };

  render() {
    console.log(this.props);
    return (
      <div className="">
        <div className="home__logo-container">
          <img className="home__logo-img" src={logo} alt="" />
        </div>
        <div className="sign-in-form-container">
          <form
            className="sign-in-form"
            onSubmit={this.props.handleSignInSubmit}
          >
            <input
              className="sign-in-form__input"
              name="username"
              type="text"
              placeholder="User name"
            />
            <input
              className="sign-in-form__input"
              name="password"
              type="password"
              placeholder="password"
            />

            <button className="sign-in-form__submit-btn" type="submit">
              Login
            </button>
            <div className="sign-in-form__submit-btn">
              <Link to="/register">
                <button className="sign-in-form__submit-btn" type="submit">
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignInForm;
