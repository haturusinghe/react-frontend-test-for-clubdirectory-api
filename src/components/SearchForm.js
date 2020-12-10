import React from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {},
}));

const intialValues = {
  name: "",
  location: "",
  latt: null,
  long: null,
  meetingDay: "",
  meetingLanguage: "",
};

export default function SearchForm() {
  const [values, setValues] = useState(intialValues);
  const classes = useStyle();
  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={2}>
          <TextField
            variant="outlined"
            label="Club Name"
            value={values.name}
          ></TextField>
        </Grid>
        <Grid item xs={10}></Grid>
      </Grid>
    </form>
  );
}
