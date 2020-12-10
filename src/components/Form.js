import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";
import { Typography, Select, MenuItem, Button, Paper } from "@material-ui/core";
import DataContext from "../contexts/DataContext";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const initialFValues = {
  name: "",
  location: {},
  latt: null,
  long: null,
  meetingDay: "",
  meetingLanguage: "",
};

const initialMap = "";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    margin: theme.spacing(1),
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "90%",
    fontWeight: "100",
  },
  buttonLabel: {
    fontWeight: "100",
  },
  filter: {
    marginTop: "250",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginLeft: theme.spacing(1),
    position: "absolute",
    zIndex: 5000,
  },
}));

export default function Form() {
  const classes = useStyles(initialFValues);
  const [values, setValues] = React.useState(initialFValues);
  const [location, setLocation] = React.useState(initialMap);

  const dataContext = useContext(DataContext);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const formSubmit = () => (event) => {
    console.log(values);
    console.log(dataContext.mapLoaded);
    dataContext.search(1, values);
  };

  const clearInput = (prop) => (event) => {
    setValues({ ...values, [prop]: "" });
  };

  const resetForm = () => (event) => {
    console.log(location);
    setLocation(initialMap);
    setValues(initialFValues);
    console.log(location);
  };

  const handleLocChange = (address) => {
    setLocation(address);
  };

  const handleSelect = (address) => {
    console.log("hello");
    handleLocChange(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const { lat, lng } = latLng;
        setValues({ ...values, latt: lat, long: lng });
        console.log("Success", latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <div className={classes.textField}>
      <Typography variant="h2" gutterBottom>
        Clubs Directory
      </Typography>
      <div>
        <Typography variant="h6" gutterBottom className="inputLabelStyle">
          Club Name
        </Typography>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="search-name">Search</InputLabel>
          <OutlinedInput
            id="search-name"
            value={values.name}
            onChange={handleChange("name")}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={clearInput("name")}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={50}
          />
        </FormControl>
      </div>

      <div className={classes.withoutLabel}>
        <Typography variant="h6" gutterBottom className="inputLabelStyle">
          Filter By
        </Typography>
        {dataContext.mapLoaded ? (
          <div>
            <PlacesAutocomplete
              value={location}
              onChange={(address) => handleLocChange(address)}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.margin}
                  >
                    <InputLabel htmlFor="search-location">Location</InputLabel>

                    <OutlinedInput
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input",
                        labelWidth: 60,
                      })}
                    />
                  </FormControl>
                  <Paper elevation={3} className={classes.paper}>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose

                      return (
                        <MenuItem
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          {suggestion.description}
                        </MenuItem>
                      );
                    })}
                  </Paper>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        ) : (
          <div>Map Loading</div>
        )}
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Meeting Date
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={values.meetingDay}
              onChange={handleChange("meetingDay")}
            >
              <MenuItem value={"Monday"}>Monday</MenuItem>
              <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
              <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
              <MenuItem value={"Thursday"}>Thursday</MenuItem>
              <MenuItem value={"Friday"}>Friday</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={values.meetingLanguage}
              onChange={handleChange("meetingLanguage")}
            >
              <MenuItem value={"Sinhalese"}>Sinhalese</MenuItem>
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Tamil"}>Tamil</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SearchIcon />}
          onClick={formSubmit()}
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={resetForm()}
          startIcon={<DeleteIcon />}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
