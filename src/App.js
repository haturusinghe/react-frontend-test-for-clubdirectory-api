import MapV3 from "./components/MapV3";
import Form2 from "./components/Form";
import React from "react";
import DataProvider from "./contexts/DataProvider";
import Results from "./components/Results";
import "./styles/grid.css";
import { Typography } from "@material-ui/core";

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

        <div className="footer">
          <Typography
            variant="subtitle2"
            gutterBottom
            className="inputLabelStyle"
            style={{ padding: "5px", marginTop: 0 }}
          >
            Made by <a href="https://github.com/haturusinghe/">haturusinghe</a>{" "}
            🎉
          </Typography>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
