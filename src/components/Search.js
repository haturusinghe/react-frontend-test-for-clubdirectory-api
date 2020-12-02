import React, { Component } from "react";
import DataContext from "../contexts/DataContext";
import axios from "axios";

import InputAdornment from "@material-ui/core/InputAdornment";

import TextField from "@material-ui/core/TextField";

import SearchIcon from "@material-ui/icons/Search";

import IconButton from "@material-ui/core/IconButton";

import ClearIcon from "@material-ui/icons/Clear";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
    this.cancel = "";
  }
  // Update the Context. If you recall from Step 2, this is
  // actually just calling this.setState() on our Provider!
  handleClick() {
    this.context.update({ center: { lat: 7.93197, lng: 79.85775 } });
  }

  /**
   * Fetch the search results and update the state with the result.
   *
   * @param {int} updatedPageNo Updated Page No.
   * @param {String} query Search Query.
   *
   */
  fetchSearchResults = (updatedPageNo = "", query) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://rest-clubs.herokuapp.com/list?name=${query}`
      )
      .then((res) => {
        console.log(res.data);
        this.context.update({ data: res.data, loading: false });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.context.update({ loading: false });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if (!query) {
      this.setState({ query });
    } else {
      this.setState({ query }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  clearInput = (event) => {
    event.target.value = "";
  };

  // Call `handleClick` when the user clicks the component.
  render() {
    return (
      <>
        <TextField
          label="Search by Club Name"
          variant="outlined"
          onChange={this.handleOnInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onMouseDown={this.clearInput}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </>
    );
  }
}

Search.contextType = DataContext;

export default Search;
