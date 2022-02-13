import React, { Component } from "react";
import Map from "../../components/Map/Map";
import axios from "axios";
import logo from "../../assets/images/logo.PNG";
import avatar from "../../assets/images/Circle-icons-profile.svg";
import "./ProfilePage.scss";
import Notes from "../../components/Notes/Notes";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import { io } from "socket.io-client";

const baseUrl = "http://localhost:8080/auth";
const profileUrl = `${baseUrl}/profile`;

const socket = io("http://127.0.0.1:8080");

class ProfilePage extends Component {
  state = {
    isLoading: true,
    userInfo: {},
    message: [],
    showModal: false,
    showProfileModal: false,
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
      })
      .catch((err) => {
        console.log(err);
        alert("Not authorized");
        this.props.history.push("/");
      });

    // connect to socket.io server
    socket.on("connect", () => {
      console.log("connected " + socket.id);
    });
    socket.on("got-message", (message) => {
      this.displayMessage(message);
    });
    socket.on("accept-message", (message) => {
      this.DisplayResponseMessage(message);
    });
    socket.on("decline-message", (message) => {
      this.DisplayResponseMessage(message);
    });
  }

  // to display response message
  DisplayResponseMessage = (message) => {
    const div = document.createElement("div");
    div.classList.add("msg-container");
    div.innerText = message;
    const ResCloseBtn = document.createElement("button");
    ResCloseBtn.innerText = "x";
    ResCloseBtn.classList.add("msg-close-btn");
    ResCloseBtn.addEventListener("click", (e) => {
      document.location.href = "/profile";
    });
    div.appendChild(ResCloseBtn);
    document.getElementById("message-container").appendChild(div);
  };

  // to display message
  displayMessage = (message) => {
    const div = document.createElement("div");
    div.classList.add("msg-container");
    const btnContainerDiv = document.createElement("div");
    btnContainerDiv.classList.add("msg-btn-container-div");
    const acceptBtn = document.createElement("button");
    acceptBtn.classList.add("msg-btn");
    acceptBtn.innerText = "Accept";

    const declineBtn = document.createElement("button");
    declineBtn.classList.add("msg-btn");
    declineBtn.innerText = "Decline";
    acceptBtn.addEventListener("click", (e) => {
      this.handleAcceptMessage();
      document.location.href = "/profile";
    });
    declineBtn.addEventListener("click", (e) => {
      this.handleDeclineMessage();
      document.location.href = "/profile";
    });
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("msg-close-btn");
    closeBtn.innerText = "x";
    closeBtn.addEventListener("click", (e) => {
      document.location.href = "/profile";
    });
    div.innerText = message;
    btnContainerDiv.appendChild(acceptBtn);
    btnContainerDiv.appendChild(declineBtn);
    div.appendChild(btnContainerDiv);
    div.appendChild(closeBtn);
    document.getElementById("message-container").appendChild(div);
  };

  handleMessage = (e) => {
    socket.emit(
      "join-req",
      `Request to join from  ${this.state.userInfo.name}.
       Number of children : ${this.state.userInfo.numberOfChildren}
       Children age group : ${this.state.userInfo.childrenAgeGroup}`
    );
  };

  handleAcceptMessage = () => {
    socket.emit(
      "accept-sent",
      `${this.state.userInfo.name} accepted your request to join.
           
       Number of children : ${this.state.userInfo.numberOfChildren}
       Children age group : ${this.state.userInfo.childrenAgeGroup}`
    );
  };

  handleDeclineMessage = () => {
    socket.emit(
      "decline-sent",
      `${this.state.userInfo.name} did not accept your request to join. Please try again later.`
    );
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

  // NotesModal
  handleShowModal = (e) => {
    e.preventDefault();
    this.setState({
      showModal: true,
    });
  };

  handleHideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleNotesSubmit = (e) => {
    e.preventDefault();
    const notesInput = e.target.notesInput.value;
    console.log(notesInput);

    notesInput
      ? axios
          .put(
            `http://localhost:8080/map/${this.state.userInfo.username}/edit`,
            {
              notes: notesInput,
            }
          )
          .then((res) => {
            console.log(res);
            e.target.reset();
            this.setState({
              showModal: false,
            });
          })
          .catch((err) => console.log(err))
      : alert("Please type your note.");
  };

  // profile modal
  handleShowProfileModal = (e) => {
    e.preventDefault();
    this.setState({
      showProfileModal: true,
    });
  };

  handleHideProfileModal = () => {
    this.setState({
      showProfileModal: false,
    });
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
          <div className="profile-info-modal-container">
            <ProfileInfo />
            <div
              className="user-container"
              onClick={this.handleShowProfileModal}
            >
              <div className="user-img-container">
                <img className="user-img" src={avatar} alt="User head shot." />
              </div>
              <h1 className="username">{userInfo.name}</h1>
            </div>
          </div>

          <button className="sign-out-btn" onClick={this.handleSignOut}>
            sign out
          </button>
        </div>
        <div className="alert-container">
          <span className="bell-emoji">🔔</span>{" "}
          <div id="message-container"></div>
        </div>
        <div className="profile-modal-container">
          <div className="profile-modal-inner-container">
            <Notes
              handleNotesSubmit={this.handleNotesSubmit}
              showModal={this.state.showModal}
              handleHideModal={this.handleHideModal}
            />
            <button
              className="add-notes-button"
              type="button"
              onClick={this.handleShowModal}
            >
              Add Notes
            </button>
          </div>
        </div>
        <div className="map-container">
          <Map handleJoin={this.handleMessage} userInfo={this.state.userInfo} />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
