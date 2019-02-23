import React from "react";
import { connect } from "react-redux";
import classes from "./Modal.css";
import { closeModal } from "./modalActions";

const Modal = props => {
  if (!props.isOpen) return null;

  return (
    <div className={classes.Modal}>
      <span className={classes.ModalClose} onClick={props.modalClose}>
        x
      </span>
      {props.children}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isOpen: state.modal.isOpen
  };
}
function mapDispatchToProps(dispatch) {
  return {
    modalClose: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
