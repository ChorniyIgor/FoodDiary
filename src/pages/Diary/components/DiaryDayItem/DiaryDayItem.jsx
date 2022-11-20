import React, { useState } from "react";
import DishesListItem from "../../containers/MainDiaryBoard/DishesListItem/DishesListItem";
import styles from "./DiaryDayItem.module.css";

const DiaryItem = (props) => {
  const [showDishesList, setShowDishesList] = useState(false);

  const onDayToggleClick = () => {
    setShowDishesList((state) => !state);
  };

  const getTotal = (dishes) => {
    function getSumm(obj, prop) {
      return dishes
        .reduce((summ, current) => {
          return summ + parseFloat(current[prop]);
        }, 0)
        .toFixed(2);
    }

    return (
      <div className={[styles.ListTable, styles.ListTableHeader].join(" ")}>
        <span>Total</span>
        <span>{getSumm(dishes, "dishWeight")}</span>
        <span>{getSumm(dishes, "kkal")}</span>
        <span>{getSumm(dishes, "proteins")}</span>
        <span>{getSumm(dishes, "fats")}</span>
        <span>{getSumm(dishes, "carbohydrates")}</span>
        <span />
      </div>
    );
  };

  const dishesList = (dishes) => {
    const cls = [styles.DishList];
    showDishesList
      ? cls.push(styles.DishListOpen)
      : cls.push(styles.DishListHide);
    return (
      <ul className={cls.join(" ")}>
        <div className={[styles.ListTable, styles.ListTableHeader].join(" ")}>
          <span>Dish</span>
          <span>Weight g.</span>
          <span>Caloric content</span>
          <span>Proteins g.</span>
          <span>Fats g.</span>
          <span>Carbohydrates</span>
          <span />
        </div>

        {dishes.map((dish, i) => {
          return (
            <DishesListItem
              styles={styles.ListTable}
              dish={dish}
              key={i}
              dateOfList={props.dateOfList}
              keyOfList={props.keyOfList}
            />
          );
        })}
        {getTotal(dishes)}
      </ul>
    );
  };

  const cls = [styles.DayToggle];
  showDishesList ? cls.push(styles.DayToggleOpen) : cls.push();
  return (
    <li className={styles.DayItem}>
      <button onClick={onDayToggleClick} className={cls.join(" ")}>
        {props.dateOfList}
      </button>
      {dishesList(props.foodList)}
    </li>
  );
};

export default DiaryItem;
