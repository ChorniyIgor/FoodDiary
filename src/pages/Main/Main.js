import React from "react";
import classes from "./Main.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = () => {
  const isLogged = useSelector((state) => state.Auth.isLogged);
  return (
    <div className={classes.Main}>
      <div className={classes.Container}>
        <h2>Your Personal</h2>
        <h1 className={classes.MainTitle}>Food Diary</h1>

        <q>
          Ever since humans learned how to cook food, they have been eating
          twice as much as nature requires.
        </q>
        <cite>B. Franklin;</cite>
        {isLogged ? (
          <NavLink to="/diary" className={classes.MainBtn}>
            Open the diary
          </NavLink>
        ) : (
          <NavLink to="/auth" className={classes.MainBtn}>
            Login / Register
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Main;
