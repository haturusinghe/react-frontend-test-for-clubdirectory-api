import MapX from "./components/MapComp";
import MapXY from "./components/Map";
import Form from "./components/Form";
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import DataProvider from "./contexts/DataProvider";
import Search from "./components/Search";
import Results from "./components/Results";
import "./styles/grid.css";

function App() {
  return (
    <DataProvider>
      <div className="main-grid-container">
        <div className="search">
          <Form />
        </div>
        <div className="map">
          <MapX />
        </div>
        <div className="results">
          <Results />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
