import React, { Component } from "react";
import DataContext from "../contexts/DataContext";
import { Button, Grid } from "@material-ui/core";
import "../styles/result.css";
import RoomIcon from "@material-ui/icons/Room";

const styles = (theme) => ({
  card: {
    margin: "auto",
    marginTop: "10px",
    width: "50%",
    backgroundColor: "grey",
    padding: "20px",
  },
  icon: { fontSize: "50" },
});

class ResultTable extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.handleClick = this.handleClick.bind(this);
  }
  // Update the Context. If you recall from Step 2, this is
  // actually just calling this.setState() on our Provider!
  handleClick(values) {
    this.context.update(values);
  }

  // Call `handleClick` when the user clicks the component.
  render() {
    const newCenter = {
      lat: this.props.result.location.coordinates[1],
      lng: this.props.result.location.coordinates[0],
    };
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ margin: "10px", backgroundColor: "grey" }}
      >
        <Grid item xs={12} style={{ margin: 10 }}>
          {this.props.result.name}
        </Grid>
        <Grid
          item
          xs={4}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <RoomIcon style={{ fontSize: 60 }} />
          <Button
            onClick={() => {
              this.handleClick(newCenter);
            }}
          >
            Show on Map
          </Button>
        </Grid>
        <Grid item xs={8}>
          <div className="details">
            <div className="fieldcell">{this.props.result.address}</div>
            <div className="fieldcell">{this.props.result.email}</div>
            <div className="fieldcell">{this.props.result.contactNum}</div>
            <div className="fieldcell">{this.props.result.website}</div>
            <div className="fieldcell">{this.props.result.clubPresident}</div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

ResultTable.contextType = DataContext;

export default ResultTable;
