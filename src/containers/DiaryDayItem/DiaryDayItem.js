import React from "react";
import DishesListItem from "../DishesListItem/DishesListItem";

const diaryItem = props => {
  return (
    <li style={{ border: "1px solid red" }}>
      {props.dateOfList}
      <ul>
        {props.foodList.map((dish, i) => {
          return <DishesListItem dish={dish} key={i} />;
        })}
      </ul>
    </li>
  );
};

export default diaryItem;
