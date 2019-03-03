import React from "react";
import classes from "./Main.css";
import { NavLink } from "react-router-dom";

const Main = props => {
  return (
    <div className={classes.Main}>
      <div className={classes.Container}>
        <h1 className={classes.MainTitle}>Ваш персональний щоденник харчування</h1>
        <NavLink to="/auth" className={classes.MainBtn}>
          Увійти / Зареєструватись
        </NavLink>
      </div>
    </div>
  );
};
export default Main;
