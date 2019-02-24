import React from "react";
import classes from "./Modal.css";

const Modal = props => {
  return (
    <div className={classes.Modal}>
      <span className={classes.ModalClose} onClick={props.onClose}>
        x
      </span>
      {props.children}
    </div>
  );
};

export default Modal;
