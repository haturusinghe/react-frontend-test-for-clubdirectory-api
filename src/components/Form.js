import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import RoomIcon from "@material-ui/icons/Room";
import ClearIcon from "@material-ui/icons/Clear";
import { Typography, Select, MenuItem, Button } from "@material-ui/core";
import DataContext from "../contexts/DataContext";

const initialFValues = {
  name: "",
  location: "",
  latt: null,
  long: null,
  meetingDay: "",
  meetingLanguage: "",
};

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
}));

export default function Form() {
  const classes = useStyles(initialFValues);
  const [values, setValues] = React.useState(initialFValues);

  const dataContext = useContext(DataContext);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const formSubmit = () => (event) => {
    dataContext.search(1, values);
  };

  const clearInput = (prop) => (event) => {
    setValues({ ...values, [prop]: "" });
  };

  const resetForm = () => (event) => {
    console.log(values);
    setValues(initialFValues);
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
        <div>
          <FormControl
            fullWidth
            className={classes.margin}
            variant="outlined"
            disabled
          >
            <InputLabel htmlFor="search-location">Location</InputLabel>
            <OutlinedInput
              id="search-location"
              value="Disabled"
              onChange={handleChange("location")}
              startAdornment={
                <InputAdornment position="start">
                  <RoomIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={clearInput("location")} disabled>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </div>
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
