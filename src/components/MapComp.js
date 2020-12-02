import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import DataContext from "../contexts/DataContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 6.93197,
  lng: 79.85775,
};

const options = {
  disableDefaultUI: true,
};

class MyMap extends Component {
  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyCvjpFtnnspPCQx-e4biZP44Q7tXQrs1gg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.context.center}
          zoom={12}
          options={options}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    );
  }
}

MyMap.contextType = DataContext;

export default MyMap;
