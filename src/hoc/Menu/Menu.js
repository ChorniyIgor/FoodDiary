import React from "react";
import { NavLink } from "react-router-dom";

const Menu = props => {
  return (
    <ul>
      <NavLink to="/">Головна</NavLink>
      <NavLink to="/diary">Щоденник</NavLink>
    </ul>
  );
};

export default Menu;
