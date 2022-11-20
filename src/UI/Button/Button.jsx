import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const cls = [classes.Button];
  const color = props.color || "grey";
  const type = props.type || "button";
  if (color === "blue") cls.push(classes.ButtonBlue);
  if (color === "grey") cls.push(classes.ButtonGrey);
  if (color === "green") cls.push(classes.ButtonGreen);

  return (
    <button className={cls.join(" ")} onClick={props.onClick} type={type}>
      {props.text}
    </button>
  );
};

export default Button;
