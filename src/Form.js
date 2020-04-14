import React from "react";
import { FormControl, Input, InputLabel, Grid } from "@material-ui/core";

const Form = (props) => {
  console.log(props);
  return (
    <Grid item xs={12}>
      <FormControl>
        <InputLabel htmlFor="my-input">Search</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={props.changeEvent}
        />
      </FormControl>
    </Grid>
  );
};

export default Form;
