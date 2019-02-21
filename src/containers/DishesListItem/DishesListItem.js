import React from "react";

const DishesListItem = props => {
  console.dir("work");
  return (
    <li>
      {props.dish.dishName} : {props.dish.dishWeight} грам
    </li>
  );
};

export default DishesListItem;
