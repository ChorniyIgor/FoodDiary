import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const inputType = props.inputType || "text";
  const autoFocus = props.autoFocus || false;
  const isInputInCorrect = props.isInputInCorrect || false;

  const cls = [classes.Input];
  if (isInputInCorrect) {
    cls.push(classes.InputError);
  }

  return (
    <label className={cls.join(" ")}>
      <p>{props.labelText}</p>
      <input
        type={inputType}
        autoFocus={autoFocus}
        ref={props.inputRefer}
        required={props.isRequired}
        min={props.min}
        defaultValue={props.defaultValue}
        onInput={props.onInput}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <span className={classes.ErrorMsg}>
        {isInputInCorrect ? props.errorMsg : null}
      </span>
    </label>
  );
};

export default Input;
