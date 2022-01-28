import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HomePage.scss";
import slider9 from "../../assets/images/slider9.jpg";
import logo from "../../assets/images/logo.PNG";

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
    return (
      <div className="home">
        <div className="home__logo-container">
          <img className="home__logo-img" src={logo} alt="" />
        </div>
        <div className="home__slider-container">
          <div className="home__slider-img-container">
            <img className="home__slider-img" src={slider9} alt="" />
          </div>
          <div className="home__text-container">
            <p className="home__text">
              The more we get together, the happier we'll be!
            </p>
          </div>
        </div>
        <div className="home__btn-container">
          <Link to={this.outputLink()} style={{ textDecoration: "none" }}>
            <button className="home__btn">Find playmate</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Homepage;
