import React, { Component } from "react";
import DataContext from "../contexts/DataContext";

import "../styles/result.css";

import ResultTable from "./ResultTable";
import { Grid, Typography } from "@material-ui/core";

class Results extends Component {
  // Update the Context. If you recall from Step 2, this is
  // actually just calling this.setState() on our Provider!
  handleClick(long) {
    console.log(long);
  }

  // Call `handleClick` when the user clicks the component.
  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          margin: "5px",
          width: "99%",

          backgroundColor: "white",
          border: "2px solid",
          borderColor: "#E7EDF3",
        }}
      >
        {this.context.data.length === 0 ? (
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Typography
              variant="h4"
              gutterBottom
              className="inputLabelStyle"
              style={{ padding: "5px", marginTop: 0 }}
            >
              No results available for the given search parameters
            </Typography>
          </Grid>
        ) : (
          this.context.data.map((item, index) => {
            return <ResultTable key={index} result={item} />;
          })
        )}
      </Grid>
    );
  }
}

Results.contextType = DataContext;

export default Results;
