import React from "react";
import styles from "./DishesListItem.module.css";
import { connect } from "react-redux";
import { deleteDishFromDiary } from "../../../../../store/Diary/DiarySlice";
import { openModalWithProps } from "../../../../../store/Modal/ModalSlice";

const DishesListItem = (props) => {
  const cls = [styles.DishItem, styles.ItemСolumn];

  function onEditBtnClickHendler() {
    props.editDishFromDiary({
      ...props.dish,
      dishPropsPer100g: props.DishesList[props.dish.dishName],
      isEdit: true,
      keyOfList: props.keyOfList,
      dateOfList: props.dateOfList,
    });
  }

  function onDeleteBtnClickHendler() {
    props.deleteDishFromDiary({
      dishKey: props.dish.key,
      dateOfList: props.dateOfList,
      keyOfList: props.keyOfList,
    });
  }

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
          <i onClick={onEditBtnClickHendler}>Редагувати</i>
          <i onClick={onDeleteBtnClickHendler}>Видалити</i>
        </span>
      </div>
    </li>
  );
};

function mapStateToProps(state) {
  return {
    DishesList: {
      ...state.foodCatalog.userDishes,
      ...state.foodCatalog.dishes,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editDishFromDiary: (props) => {
      dispatch(
        openModalWithProps({ modal: "AddDishToDiaryBoardModal", info: props })
      );
    },
    deleteDishFromDiary: (props) => {
      dispatch(deleteDishFromDiary(props));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DishesListItem);
