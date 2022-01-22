import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

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
          const marker = new mapboxgl.Marker()
            .setLngLat([element.lng, element.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 30 }).setHTML(
                `<h1>${element.address}</h1>
             <h2>${element.name}</h2>
            <h3>${element.notes}</h3>`
              )
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
    console.log(this.props.userInfo.name);
    // if (this.state.lat === null && this.state.lng === null) {
    //   return <p>Loading...</p>;
    // }
    return (
      <div
        ref={(el) => (this.mapContainer = el)}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    );
  }
}

export default Map;
