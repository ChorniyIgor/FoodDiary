import React from "react";
import classes from "./InfoModal.module.css";
import { useSelector } from "react-redux";

const InfoModal = () => {
  const infoModal = useSelector((state) => state.modalWindows.infoModal);

  if (infoModal.isOpen) {
    switch (infoModal.modalType) {
      case "success":
        return (
          <div
            className={[classes.ModalWrap, classes.ModalWrapSuccess].join(" ")}
          >
            <p>{infoModal.modalMsg}</p>
          </div>
        );
      case "error":
        return (
          <div
            className={[classes.ModalWrap, classes.ModalWrapError].join(" ")}
          >
            <p>{infoModal.modalMsg}</p>
          </div>
        );
      default:
        return null;
    }
  } else return null;
};

export default InfoModal;
