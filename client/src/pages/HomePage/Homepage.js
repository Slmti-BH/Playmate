import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignInForm from "../../components/SignInForm/SignInForm";

class Homepage extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>logo</h1>
        </div>
        <p>The more we get together, the happier we'll be!</p>
        <Link to="/sign-in">
          <button>Find playmate</button>
        </Link>
      </div>
    );
  }
}

export default Homepage;
