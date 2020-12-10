import MapV3 from "./components/MapV3";
import Form2 from "./components/Form";
import React from "react";
import DataProvider from "./contexts/DataProvider";
import Results from "./components/Results";
import "./styles/grid.css";

function App() {
  return (
    <DataProvider>
      <div className="main-grid-container">
        <div className="map">
          <MapV3 />
        </div>

        <div className="results">
          <Results />
        </div>
        <div className="search">
          <Form2 />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
