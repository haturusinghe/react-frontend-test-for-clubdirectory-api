import React, { Component } from "react";
import DataContext from "../contexts/DataContext";
import "../styles/result.css";

import ResultTable from "./ResultTable";

class Results extends Component {
  // Update the Context. If you recall from Step 2, this is
  // actually just calling this.setState() on our Provider!
  handleClick(long) {
    console.log(long);
  }

  // Call `handleClick` when the user clicks the component.
  render() {
    return (
      <div className="results-boii">
        {this.context.data.map((item, index) => {
          return <ResultTable key={index} result={item} />;
        })}
      </div>
    );
  }
}

Results.contextType = DataContext;

export default Results;
