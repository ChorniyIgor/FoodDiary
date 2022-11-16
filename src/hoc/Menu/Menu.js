import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Menu.module.css";

const Menu = () => {
  const isLogged = useSelector((state) => state.Auth.isLogged);

  return (
    <div className={classes.Menu}>
      {isLogged ? (
        <ul className={classes.MenuList}>
          <NavLink to="/">Main</NavLink>
          <NavLink to="/diary">Diary</NavLink>
          <NavLink to="/logout">Sign out</NavLink>
        </ul>
      ) : (
        <ul className={classes.MenuList}>
          <NavLink to="/">Main</NavLink>
          <NavLink to="/auth">Sign in</NavLink>
        </ul>
      )}
    </div>
  );
};

export default Menu;
