import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Menu = props => {
  return props.isLogged ? (
    <ul>
      <NavLink to="/">Головна</NavLink>
      <NavLink to="/diary">Щоденник</NavLink>
      <NavLink to="/logout">Вийти</NavLink>
    </ul>
  ) : (
    <ul>
      <NavLink to="/">Головна</NavLink>
      <NavLink to="/auth">Авторизація</NavLink>
    </ul>
  );
};
function mapStateToProps(state) {
  return {
    isLogged: state.Auth.isLogged
  };
}

export default connect(mapStateToProps)(Menu);
