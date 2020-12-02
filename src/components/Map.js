import React from "react";
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

function MyComponent() {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCvjpFtnnspPCQx-e4biZP44Q7tXQrs1gg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
