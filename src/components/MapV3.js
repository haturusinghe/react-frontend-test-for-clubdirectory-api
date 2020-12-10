import React, { useState, useContext } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import DataContext from "../contexts/DataContext";

const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "100%",
};

let myPlaces = [];
const myPlaces2 = [
  { id: "colombo", pos: { lat: 6.93197, lng: 79.85775 } },
  { id: "kalutara", pos: { lat: 6.58084, lng: 79.96293 } },
];

const options = {
  disableDefaultUI: true,
};

export default function MapV3() {
  const [mapRef, setMapRef] = useState(null);
  console.log(mapRef);

  const dataContext = useContext(DataContext);
  const { markers, center, logHello } = dataContext;

  if (markers === undefined || markers.length === 0) {
    // markers empty or does not exist
    myPlaces.push(center);
  } else {
    myPlaces = markers;
  }

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    myPlaces2.map((place) => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
    dataContext.updateMapLoad(isLoaded);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCvjpFtnnspPCQx-e4biZP44Q7tXQrs1gg",
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) {
    return "Loading Maps";
  } else {
    console.log("loaded");
    logHello("hello", isLoaded);
  }
  return (
    <>
      <GoogleMap
        // Do stuff on map initial laod
        onLoad={loadHandler}
        // Save the current center position in state

        // Save the user's map click position
        center={center}
        options={options}
        zoom={12}
        onBoundsChanged={(e) => {
          console.log("change");
        }}
        mapContainerStyle={containerStyle}
      >
        {markers.map((marker, index) => {
          return <Marker position={marker} key={index} />;
        })}
      </GoogleMap>
    </>
  );
}
