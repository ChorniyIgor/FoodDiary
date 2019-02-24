import React from "react";
import styles from "./DishesListItem.css";

const DishesListItem = props => {
  return (
    <li className={styles.DishItem}>
      {props.dish.dishName} : {props.dish.dishWeight} грам | {props.dish.kkal} ккал |
      {props.dish.proteins}г білка | {props.dish.fats}г жиру | {props.dish.carbohydrates}г вуглеводи
    </li>
  );
};

export default DishesListItem;
