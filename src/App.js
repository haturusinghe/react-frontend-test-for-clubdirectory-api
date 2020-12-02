import MapX from "./components/MapComp";
import React, { useState } from "react";
import DataProvider from "./contexts/DataProvider";
import Search from "./components/Search";
import "./styles/grid.css";

function App() {
  return (
    <DataProvider>
      <div className="main-grid-container">
        <div className="search">
          <Search />
        </div>
        <div className="map">
          <MapX />
        </div>
        <div className="results"></div>
      </div>
    </DataProvider>
  );
}

export default App;
