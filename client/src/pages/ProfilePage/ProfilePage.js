import React, { Component } from "react";
import Map from "../../components/Map/Map";

class ProfilePage extends Component {
  //   state = {
  //     isLoading: true,
  //     userInfo: {},
  //   };
  //   on mount get user info
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>hello</h1>
        <Map />
      </div>
    );
  }
}

export default ProfilePage;
