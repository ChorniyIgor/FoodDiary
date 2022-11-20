import React from "react";
import styles from "./DishesListItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteDishFromDiary } from "../../../../../store/Diary/deleteDishFromDiary";
import { openModalWithProps } from "../../../../../store/Modal/ModalSlice";

const DishesListItem = (props) => {
  const cls = [styles.DishItem, styles.ItemСolumn];
  const dispatch = useDispatch();
  const { userDishes, dishes } = useSelector((state) => state.foodCatalog);
  const DishesList = {
    ...userDishes,
    ...dishes,
  };

  function onEditBtnClickHendler() {
    editDishFromDiary({
      ...props.dish,
      dishPropsPer100g: DishesList[props.dish.dishName],
      isEdit: true,
      keyOfList: props.keyOfList,
      dateOfList: props.dateOfList,
    });
  }

  function onDeleteBtnClickHendler() {
    dispatch(
      deleteDishFromDiary({
        dishKey: props.dish.key,
        dateOfList: props.dateOfList,
        keyOfList: props.keyOfList,
      })
    );
  }

  const editDishFromDiary = (props) => {
    dispatch(
      openModalWithProps({ modal: "AddDishToDiaryBoardModal", info: props })
    );
  };

  return (
    <li className={cls.join(" ")}>
      <div className={props.styles}>
        <span>{props.dish.dishName}</span>
        <span>{parseFloat(props.dish.dishWeight).toFixed(2)}</span>
        <span>{parseFloat(props.dish.kkal).toFixed(2)}</span>
        <span>{parseFloat(props.dish.proteins).toFixed(2)}</span>
        <span>{parseFloat(props.dish.fats).toFixed(2)}</span>
        <span>{parseFloat(props.dish.carbohydrates).toFixed(2)}</span>
        <span className={styles.Tools}>
          <i onClick={onEditBtnClickHendler}>Edit</i>
          <i onClick={onDeleteBtnClickHendler}>Delete</i>
        </span>
      </div>
    </li>
  );
};

export default DishesListItem;
