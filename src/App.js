import MapX from "./components/MapComp";

import Form from "./components/Form";
import React from "react";

import DataProvider from "./contexts/DataProvider";

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
