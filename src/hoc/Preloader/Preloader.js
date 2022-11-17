import React from "react";
import classes from "./Preloader.module.css";

const Preloader = () => {
  return (
    <div className={classes.Overloy}>
      <div className={classes.PreloaderShow}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Preloader;
