import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  inputAdornment = () => {
    return (
      <InputAdornment position="start">
        <RoomIcon />
      </InputAdornment>
    );
  };

  handleSelect = (address) => {
    this.handleChange(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="search-location">Location</InputLabel>

              <OutlinedInput
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                  labelWidth: 60,
                  startAdornment: this.inputAdornment,
                })}
              />
            </FormControl>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose

                return <MenuItem>{suggestion.description}</MenuItem>;
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
