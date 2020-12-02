import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DataContext from "../contexts/DataContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  disableDefaultUI: true,
};

var mapBody = {};

class MyMap extends Component {
  componentWillUpdate() {
    console.log("updated");
  }

  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyCvjpFtnnspPCQx-e4biZP44Q7tXQrs1gg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.context.center}
          zoom={12}
          onCenterChanged={() => {
            console.log(mapBody);
          }}
          onLoad={(map) => {
            mapBody = map;
            console.log(mapBody);
          }}
          options={options}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {this.context.markers.map((marker, index) => {
            return <Marker position={marker} key={index} />;
          })}
        </GoogleMap>
      </LoadScript>
    );
  }
}

MyMap.contextType = DataContext;

export default MyMap;
