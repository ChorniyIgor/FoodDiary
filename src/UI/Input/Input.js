import React from "react";
import classes from "./Input.css";

const Input = props => {
  const inputType = props.inputType || "text";
  const autoFocus = props.autoFocus || false;

  return (
    <label className={classes.Input}>
      <p>{props.labelText}</p>
      <input
        type={inputType}
        autoFocus={autoFocus}
        ref={props.inputRefer}
        required={props.isRequired}
        min={props.min}
        defaultValue={props.defaultValue}
        onInput={props.onInput}
      />
    </label>
  );
};

export default Input;
