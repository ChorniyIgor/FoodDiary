import React from "react";
import classes from "./InputLabel.css";

const Input = props => {
  return (
    <label className={classes.Input}>
      <p>{props.labelText}</p>
      {props.children}
    </label>
  );
};

export default Input;
