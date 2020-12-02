import React, { Component } from "react";
import DataContext from "./DataContext";

class DataProvider extends Component {
  // We'll use this component's state to hold our context. We'll
  // also add an `update` function to the state that will allow
  // us to update the state from anywhere in our application by
  // calling this.context.update().
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {
      x: 0,
      y: 0,
      centre: [],
      markers: [],
      data: [],
      center: { lat: 6.93197, lng: 79.85775 },
      update: this.updateState,
    };
  }

  // Call `this.context.update({ key: value })` from a consumer
  // to update this state.
  updateState(values) {
    this.setState(values);
  }

  // Wrap the children in DataContext.Provider and pass in the
  // state as a value.
  render() {
    return (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
