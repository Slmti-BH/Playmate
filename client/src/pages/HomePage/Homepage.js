import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import SignInForm from "../../components/SignInForm/SignInForm";

class Homepage extends Component {
  //   state = {
  //     isSignedUp: false,
  //     isLoggedIn: false,
  //     isLoginError: false,
  //     errorMessage: "",
  //   };

  login = (e) => {
    e.preventDefault();
    // console.log(e);
    // axios
    //   .post(loginUrl, {
    //     username: e.target.username.value,
    //     password: e.target.password.value,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       isLoggedIn: true,
    //     });
    //     sessionStorage.setItem("token", response.data.token);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({ isLoginError: true, errorMessage: err });
    //   });
  };

  signup = (e) => {
    e.preventDefault();
    // axios
    //   .post(signupUrl, {
    //     name: e.target.name.value,
    //     username: e.target.username.value,
    //     password: e.target.password.value,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       isSignedUp: true,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  };

  //   on mount check token in session storage

  componentDidMount() {
    //   do i need to also check if token is the right token?
    if (localStorage.getItem("token") !== null) {
      this.setState({
        isSignedUp: true,
        isLoggedIn: true,
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <h1>logo</h1>
        </div>
        <p>The more we get together, the happier we'll be!</p>
        {this.props.state.isLoggedIn && this.props.state.isSignedUp ? (
          <Link to="/profile">
            <button>Find playmate</button>
          </Link>
        ) : (
          // pass props
          <Link
            // to="/sign-in"
            to={{
              pathname: "/sign-in",
              state: {
                handleSubmit: this.props.state.isSignedUp,
              },
            }}
          >
            <button>Find playmate</button>
          </Link>
        )}
      </div>
    );
  }
}

export default Homepage;
