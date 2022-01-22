import React, { Component } from "react";
import Map from "../../components/Map/Map";
import axios from "axios";

const baseUrl = "http://localhost:8080/auth";
const profileUrl = `${baseUrl}/profile`;

class ProfilePage extends Component {
  state = {
    isLoading: true,
    userInfo: {},
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
        return response;
      })
      .then((response) => {
        // Create WebSocket connection.
        const socket = new WebSocket("ws://localhost:8080");

        // Connection opened
        socket.addEventListener("open", function (event) {
          socket.send("Hello Server!");
        });

        // Listen for messages
        socket.addEventListener("message", function (event) {
          console.log("Message from server ", event.data);
        });
      })
      .catch((err) => {
        console.log(err);
        // on error redirect to home page
        this.props.history.push("/");
      });
  }

  join = (e) => {
    e.preventDefault();
    document.location.href = "/";
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
    console.log(this.props);
    const { isLoading, userInfo } = this.state;
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        <h1>Hello {userInfo.name}</h1>
        <button onClick={this.handleSignOut}>sign out</button>
        <Map handleJoin={this.join} userInfo={this.state.userInfo} />
      </div>
    );
  }
}

export default ProfilePage;
