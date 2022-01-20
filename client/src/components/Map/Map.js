import React, { Component } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2VsYW1hd2l0LWhhaWxlbWFyaWFtIiwiYSI6ImNreWt2ZXdnZzI2aGgyd3Focjc5MDV3NHIifQ.d734Xg2hfTeIcZkjR5MTaA";

class Map extends Component {
  data = [
    {
      address: "716 6th Ave, New Westminster, BC V3M 2B3",
      user: "userURL-link",
      notes: "Will be leaving after 1 hour",
      coordinates: { lat: 49.21141, lng: -122.92295 },
    },
    {
      address: "610 6th St, New Westminster, BC V3L 3C2",
      user: "userURL-link",
      notes: "Will be leaving after half hour",
      coordinates: { lat: 49.2127, lng: -122.92219 },
    },
    {
      address: "805 Boyd St, New Westminster, BC V3M 5G7",
      user: "userURL-link",
      notes: "Will be leaving after 2 hour",
      coordinates: { lat: 49.19128, lng: -122.94572 },
    },
  ];

  state = {
    lng: -122.92295,
    lat: 49.21141,
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

    this.data.forEach((element) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([element.coordinates.lng, element.coordinates.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 30 }).setHTML(
            `<h1>${element.address}</h1>
             <h2>${element.user}</h2>
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
      })
      .catch((err) => console.log(err));
  }

  render() {
    // console.log(this.state.currentCoordinates);
    // console.log(this.state.lng, this.state.lat);
    return (
      <div
        ref={(el) => (this.mapContainer = el)}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    );
  }
}

export default Map;
