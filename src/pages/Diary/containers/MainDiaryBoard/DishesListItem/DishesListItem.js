import React from "react";
import styles from "./DishesListItem.css";

const DishesListItem = props => {
  const cls = [styles.DishItem, styles.ItemСolumn];
  return (
    <li className={cls.join(" ")}>
      <div className={props.styles}>
        <span>{props.dish.dishName}</span>
        <span>{props.dish.dishWeight}</span>
        <span>{props.dish.kkal}</span>
        <span>{props.dish.proteins}</span>
        <span>{props.dish.fats}</span>
        <span>{props.dish.carbohydrates}</span>
        <span />
      </div>
    </li>
  );
};

export default DishesListItem;
