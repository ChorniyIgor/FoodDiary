import React from "react";
import classes from "./Modal.css";

const Modal = props => {
  const overlayRef = React.createRef();
  function keyDownHandler(event) {
    const ESC_CODE = 27;
    if (event.keyCode === ESC_CODE) props.onClose();
  }
  function onOverlayClickHendler(evt) {
    if (evt.target === overlayRef.current) props.onClose();
  }
  return (
    <div
      className={classes.ModalOverlay}
      onClick={onOverlayClickHendler}
      tabIndex="0"
      onKeyDown={keyDownHandler}
      ref={overlayRef}
    >
      <div className={classes.Modal}>
        <span className={classes.ModalClose} onClick={props.onClose}>
          x
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
