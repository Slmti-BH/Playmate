import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignInForm extends Component {
  render() {
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
          <button>register</button>
        </Link>
      </div>
    );
  }
}

export default SignInForm;
