import React from "react";
import classes from "./FoodCatalogList.css";

const FoodCatalogList = props => {
  return (
    <ul className={classes.FoodList}>
      {props.dishes.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  );
};

export default FoodCatalogList;
