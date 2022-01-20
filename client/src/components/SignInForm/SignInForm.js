import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignInForm extends Component {
  // state = {
  //   isSignedUp: true,
  //   isLoggedIn: false,
  //   isLoginError: false,
  //   errorMessage: "",
  // };

  // on form submit  isLoggedIn=true

  render() {
    console.log(this.props);
    return (
      <div>
        <form action="">
          <input type="text" placeholder="User name" />
          <input type="text" placeholder="password" />
          <Link to="/profile">
            <button type="submit">Login</button>
          </Link>
        </form>
        <Link to="/register">
          <button type="submit"> register</button>
        </Link>
      </div>
    );
  }
}

export default SignInForm;
