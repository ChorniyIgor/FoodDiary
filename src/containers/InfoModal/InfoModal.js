import React from "react";
import classes from "./InfoModal.css";
import { connect } from "react-redux";

const InfoModal = props => {
  if (props.infoModal.isOpen) {
    switch (props.infoModal.modalType) {
      case "success":
        return (
          <div className={[classes.ModalWrap, classes.ModalWrapSuccess].join(" ")}>
            <p>Дані успішно збережено</p>
          </div>
        );
      case "error":
        return (
          <div className={[classes.ModalWrap, classes.ModalWrapError].join(" ")}>
            <p>Сталась помилка. Спробуйте ще раз</p>
          </div>
        );
      default:
        return null;
    }
  } else return null;
};
function mapStateToProps(state) {
  return {
    infoModal: state.modalWindows.infoModal
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoModal);
