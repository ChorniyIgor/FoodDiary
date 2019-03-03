import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Menu.css";

const Menu = props => {
  return (
    <div className={classes.Menu}>
      {props.isLogged ? (
        <ul className={classes.MenuList}>
          <NavLink to="/">Головна</NavLink>
          <NavLink to="/diary">Щоденник</NavLink>
          <NavLink to="/logout">Вийти</NavLink>
        </ul>
      ) : (
        <ul className={classes.MenuList}>
          <NavLink to="/">Головна</NavLink>
          <NavLink to="/auth">Авторизація</NavLink>
        </ul>
      )}
    </div>
  );
};
function mapStateToProps(state) {
  return {
    isLogged: state.Auth.isLogged
  };
}

export default connect(mapStateToProps)(Menu);
