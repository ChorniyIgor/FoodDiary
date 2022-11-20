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
          <NavLink
            className={(navData) => (navData.isActive ? classes.Active : "")}
            to="/FoodDiary/"
          >
            Main
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? classes.Active : "")}
            to="/FoodDiary/diary"
          >
            Diary
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? classes.Active : "")}
            to="/FoodDiary/logout"
          >
            Sign Out
          </NavLink>
        </ul>
      ) : (
        <ul className={classes.MenuList}>
          <NavLink
            className={(navData) => (navData.isActive ? classes.Active : "")}
            to="/FoodDiary/"
          >
            Main
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? classes.Active : "")}
            to="/FoodDiary/auth"
          >
            Sign In
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Menu;
