import React, { useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DataContext from "../contexts/DataContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MyComponent() {
  const context = useContext(DataContext);
  const [map, setMap] = React.useState(null);
  const center = context.center;

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    console.log(bounds);
    console.log(context.center);
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
      >
        {/* Child components, such as markers, info windows, etc. */}
        {context.markers.map((marker, index) => {
          return <Marker position={marker} key={index} />;
        })}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
