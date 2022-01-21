import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      <div>
        <form
          
          onSubmit={this.props.handleSignInSubmit}
        >
          <input name="username" type="text" placeholder="User name" />
          <input name="password" type="text" placeholder="password" />

          <button type="submit">Login</button>

          <Link to="/register">
            <button type="submit">Register</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default SignInForm;
