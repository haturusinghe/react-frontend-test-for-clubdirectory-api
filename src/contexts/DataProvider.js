import React, { Component } from "react";
import DataContext from "./DataContext";
import axios from "axios";

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
      loading: true,
      markers: [],
      data: [],
      center: { lat: 6.93197, lng: 79.85775 },
      update: this.updateState,
      search: this.fetchSearchResults,
      logHello: this.logHello,
      changeCenter: this.changeCenter,
    };
  }

  // Call `this.context.update({ key: value })` from a consumer
  // to update this state.
  updateState(values) {
    this.setState({ center: values });
  }

  logHello(message) {
    console.log(message);
  }

  changeCenter(center) {
    console.log(center);
  }

  createMarkers() {}
  /**
   * Fetch the search results and update the state with the result.
   *
   * //https://rest-clubs.herokuapp.com/filter?name=${name}&meetingDay=${meetingDay}&meetingLanguage=${meetingLanguage}&latt=${latt}&long=${long}
   * @param {int} updatedPageNo Updated Page No.
   * @param {String} query Search Query.
   *
   */
  fetchSearchResults = (updatedPageNo = "", values) => {
    const { name, location, latt, long, meetingDay, meetingLanguage } = values;
    let queryString = `name=${name}`;
    if (latt && long) {
      queryString = queryString + `&latt=${latt}&long=${long}`;
    }
    if (meetingDay !== "") {
      queryString = queryString + `&meetingDay=${meetingDay}`;
    }
    if (meetingLanguage !== "") {
      queryString = queryString + `&meetingLanguage=${meetingLanguage}`;
    }
    const markerHolder = [];
    console.log(queryString);
    axios
      .get(`https://rest-clubs.herokuapp.com/filter?${queryString}`)
      .then((res) => {
        res.data.forEach((item, index) => {
          markerHolder.push({
            lat: item.location.coordinates[1],
            lng: item.location.coordinates[0],
          });
        });
        this.setState({
          data: res.data,
          center: markerHolder[0],
          loading: false,
          markers: markerHolder,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({ loading: false });
        }
      });
    this.createMarkers();
  };

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
