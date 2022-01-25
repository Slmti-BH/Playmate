import React, { Component } from "react";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import ReactDOM from "react-dom";
import "./Map.scss";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2VsYW1hd2l0LWhhaWxlbWFyaWFtIiwiYSI6ImNreWt2ZXdnZzI2aGgyd3Focjc5MDV3NHIifQ.d734Xg2hfTeIcZkjR5MTaA";

class Map extends Component {
  state = {
    lng: -122.92219,
    lat: 49.2127,
    zoom: 10,
    currentCoordinates: [],
  };

  componentDidMount() {
    // display map
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    // use promise to get current user location to center the map
    const getCoordinates = () => {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };
    getCoordinates()
      .then((res) => {
        // console.log(res.coords);
        this.setState({
          currentCoordinates: [res.coords.longitude, res.coords.latitude],
          lng: res.coords.longitude,
          lat: res.coords.latitude,
        });
        return res;
      })
      .then((res) => {
        // make api call to post current position of user and details to map.json
        console.log(this.props.userInfo);
        const { name, username, numberOfChildren, childrenAgeGroup } =
          this.props.userInfo;
        const body = {
          name: name,
          username: username,
          numberOfChildren: numberOfChildren,
          childrenAgeGroup: childrenAgeGroup,
          lng: res.coords.longitude,
          lat: res.coords.latitude,
        };
        return axios.post("http://localhost:8080/map/", body);
      })
      .then((res) => {
        console.log(res);
        return axios.get(
          `http://localhost:8080/map/${this.props.userInfo.username}`
        );
      })
      .then((res) => {
        console.log(res.data);

        res.data.forEach((element) => {
          const innerHtmlContent = `<div><h1>Username: ${element.username}</h1>
      <p>Name: ${element.name}</p>
      <p>Number of children:${element.numberOfChildren}</p>
      <p>Children age group: ${element.childrenAgeGroup}</p>
      </div>`;
          const divElement = document.createElement("div");
          const joinBtn = document.createElement("div");
          joinBtn.innerHTML = "<button>Join</button>";
          divElement.innerHTML = innerHtmlContent;
          divElement.appendChild(joinBtn);
          joinBtn.addEventListener("click", (e) => {
            // this.props.history.push("/profile");
            this.props.handleJoin();
            document.location.href = "/profile";

            // console.log("join button clicked by" + element.username);
          });
          const marker = new mapboxgl.Marker()
            .setLngLat([element.lng, element.lat])
            .setPopup(
              new mapboxgl.Popup({
                closeOnClick: false,
                offset: 30,
              }).setDOMContent(divElement)
            )
            .addTo(map);
        });

        // Initialize the geolocate control.
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.props);
    // if (this.state.lat === null && this.state.lng === null) {
    //   return <p>Loading...</p>;
    // }
    return (
      <div>
        {/* <button onClick={this.props.handleJoin}>Join</button> */}
        <div
          className="mapbox-container"
          ref={(el) => (this.mapContainer = el)}
          style={{ width: "100%", height: "80vh" }}
        ></div>
      </div>
    );
  }
}

export default Map;
