import React from "react";
import classes from "./Input.css";

const Input = props => {
  const inputType = props.inputType || "text";
  return (
    <label className={classes.Input}>
      <p>{props.labelText}</p>
      <input type={inputType} autoFocus ref={props.inputRefer} />
    </label>
  );
};

export default Input;
