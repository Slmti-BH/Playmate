import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import SignInForm from "../../components/SignInForm/SignInForm";

class Homepage extends Component {
  state = {
    isSignedUp: false,
    isLoggedIn: false,
  };

  outputLink = () => {
    if (this.state.isLoggedIn && this.state.isSignedUp) {
      return "/profile";
    } else {
      return "/sign-in";
    }
  };

  //   on mount check token in session storage
  componentDidMount() {
    if (sessionStorage.getItem("token")) {
      this.setState({
        isSignedUp: true,
        isLoggedIn: true,
      });
    }
  }

  render() {
    const { isLoggedIn, isSignedUp } = this.state;
    return (
      <div>
        <div>
          <h1>logo</h1>
        </div>
        <p>The more we get together, the happier we'll be!</p>

        <Link to={this.outputLink()}>
          <button>Find playmate</button>
        </Link>
      </div>
    );
  }
}

export default Homepage;
