import React from "react";
import styles from "./DishesListItem.css";

const DishesListItem = props => {
  const cls = [styles.DishItem, styles.ItemСolumn];
  return (
    <li className={cls.join(" ")}>
      <div className={props.styles}>
        <span>{props.dish.dishName}</span>
        <span>{props.dish.dishWeight} г</span>
        <span>{props.dish.kkal} ккал</span>
        <span>{props.dish.proteins} г</span>
        <span>{props.dish.fats} г</span>
        <span>{props.dish.carbohydrates}г</span>
        <span />
      </div>
    </li>
  );
};

export default DishesListItem;
