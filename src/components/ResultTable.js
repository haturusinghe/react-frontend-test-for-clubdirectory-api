import React, { Component } from "react";
import DataContext from "../contexts/DataContext";
import { Button, Grid, ButtonGroup, Typography } from "@material-ui/core";
import "../styles/result.css";

class ResultTable extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.handleClick = this.handleClick.bind(this);
    this.showNearby = this.showNearby.bind(this);
  }
  // Update the Context. If you recall from Step 2, this is
  // actually just calling this.setState() on our Provider!
  handleClick(values) {
    this.context.update(values);
  }

  showNearby(values) {
    this.context.search(1, values);
  }

  // Call `handleClick` when the user clicks the component.
  render() {
    const newCenter = {
      lat: this.props.result.location.coordinates[1],
      lng: this.props.result.location.coordinates[0],
    };
    const nearbyCoor = {
      latt: this.props.result.location.coordinates[1],
      long: this.props.result.location.coordinates[0],
    };
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        style={{
          margin: "15px",
          width: "50%",
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "#E7EDF3",
          borderRadius: 16,
          padding: "8px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          className="inputLabelStyle"
          style={{ padding: "5px", marginBottom: 0 }}
        >
          {this.props.result.name}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          className="inputLabelStyle"
          style={{ padding: "5px", marginTop: 0 }}
        >
          {this.props.result.mailingAddress}
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            xs={6}
            style={{
              backgroundColor: "white",

              padding: "10px",
            }}
          >
            <h5 className="fieldcell">
              <i>Club Mailing Address:</i> {this.props.result.mailingAddress}
            </h5>
            <h5 className="fieldcell">
              <i>Club Email:</i> {this.props.result.email}
            </h5>
            <h5 className="fieldcell">
              <i>Club Contact Number: </i>
              {this.props.result.contactNum}
            </h5>
            <h5 className="fieldcell">
              <i>Club Website:</i> {this.props.result.website}
            </h5>
            <h5 className="fieldcell">
              <i>Current President:</i> {this.props.result.clubPresident}
            </h5>
          </Grid>
          <Grid
            container
            direction="column"
            xs={6}
            style={{
              backgroundColor: "#333333",
              border: "2px solid",
              borderColor: "#E7EDF3",
              borderRadius: 16,
              padding: "10px",
            }}
          >
            <h5 className="fieldcell wh">
              Meeting Day: {this.props.result.meetingDay}
            </h5>

            <h5 className="fieldcell wh">
              Meeting Time: {this.props.result.meetingTime}
            </h5>
            <h5 className="fieldcell wh">
              Meeting Address: {this.props.result.meetingAddress}
            </h5>
            <h5 className="fieldcell wh">
              Meeting Language: {this.props.result.meetingLanguage}
            </h5>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <ButtonGroup
            disableElevation
            variant="contained"
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            <Button
              onClick={() => {
                this.handleClick(newCenter);
              }}
            >
              Show on Map
            </Button>
            <Button
              onClick={() => {
                this.showNearby(nearbyCoor);
              }}
            >
              Show Nearby
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
}

ResultTable.contextType = DataContext;

export default ResultTable;
