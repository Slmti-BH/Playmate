import React, { Component } from "react";
import Map from "../../components/Map/Map";
import axios from "axios";
import logo from "../../assets/images/logo.PNG";
import avatar from "../../assets/images/Circle-icons-profile.svg";
import "./ProfilePage.scss";

const baseUrl = "http://localhost:8080/auth";
const profileUrl = `${baseUrl}/profile`;

class ProfilePage extends Component {
  state = {
    isLoading: true,
    userInfo: {},
    message: "",
  };
  //   on mount get user info, also need to grab map info
  componentDidMount() {
    // here grab token from sessionStorage
    const token = sessionStorage.getItem("token");

    axios
      .get(profileUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          userInfo: response.data,
        });
        // return response;
      })
      // .then((response) => {
      //   // Create WebSocket connection.
      //   const socket = new WebSocket("ws://localhost:8080");

      //   // Connection opened
      //   socket.addEventListener("open", function (event) {
      //     console.log("Connected to ws server.");
      //   });

      //   // Listen for messages
      //   socket.addEventListener("message", function (event) {
      //     console.log("Message from server ", event.data);
      //   });
      // })

      // .then((response) => {
      //   // Create WebSocket connection.
      //   const socket = new WebSocket(
      //     `ws://localhost:8080?userId=${this.state.userInfo.id}`
      //   );

      //   // Connection opened
      //   socket.addEventListener("open", function (event) {
      //     socket.send(
      //       JSON.stringify({
      //         receiverUserId: "user-id-of-the-receiver",
      //         myRandomMessage: "randomMessage",
      //       })
      //     );
      //   });

      //   // Listen for messages
      //   socket.addEventListener("message", function (event) {
      //     console.log("Message from server ", event.data);
      //   });
      // })
      .catch((err) => {
        console.log(err);
        // on error redirect to home page
        this.props.history.push("/");
      });
    // Create WebSocket connection.
    const socket = new WebSocket("ws://localhost:8080");

    // Connection opened
    socket.addEventListener("open", function (event) {
      console.log("Connected to ws server.");
    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);
    });
    const sendMessage = () => {
      socket.send(`${this.state.message} ${this.state.userInfo.username}`);
    };
  }

  join = (e) => {
    e.preventDefault();
    this.setState({
      message: "Request to Join.",
    });
    // console.log(this.state.message);
    // document.location.href = "/";
    // instead send invite to user on map marker
  };
  handleSignOut = (e) => {
    e.preventDefault();
    //  delete map data for user
    axios
      .delete(`http://localhost:8080/map/${this.state.userInfo.username}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    sessionStorage.clear();
    document.location.href = "/";
  };
  render() {
    console.log(this.state.userInfo);
    const { isLoading, userInfo } = this.state;
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        <div className="user-flex-container">
          <div className="home__logo-container">
            <img className="home__logo-img" src={logo} alt="" />
          </div>
          <div className="user-container">
            <div className="user-img-container">
              <img
                className="user-img"
                src={avatar}
                alt="User head shot image"
              />
            </div>
            <h1 className="username">{userInfo.name}</h1>
          </div>
          <button className="sign-out-btn" onClick={this.handleSignOut}>
            sign out
          </button>
        </div>
        <div className="map-container">
          <Map handleJoin={this.sendMessage} userInfo={this.state.userInfo} />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
