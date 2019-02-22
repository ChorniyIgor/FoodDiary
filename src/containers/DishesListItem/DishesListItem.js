import React from "react";
import styles from "./DishesListItem.css";

const DishesListItem = props => {
  return (
    <li className={styles.DishItem}>
      {props.dish.dishName} : {props.dish.dishWeight} грам
    </li>
  );
};

export default DishesListItem;
