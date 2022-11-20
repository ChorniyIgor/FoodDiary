import React from "react";
import { useDispatch } from "react-redux";
import { openModalWithProps } from "../../../../../../store/Modal/ModalSlice";
import classes from "./CatalogListItem.module.css";
import { deleteUserDishItem } from "../../../../../../store/FoodCatalog/deleteUserDishItem";

const CatalogListItem = (props) => {
  const dispatch = useDispatch();
  function onListItemClickHendler() {
    const info = {
      dishName: props.item.name,
      kkal: props.item.dishProps.kkal,
      proteins: props.item.dishProps.proteins,
      fats: props.item.dishProps.fats,
      carbohydrates: props.item.dishProps.carbohydrates,
    };
    AddDishToDiaryBoardModal(info);
  }

  function onEditBtnClickhendler() {
    EditDishModal(props.item);
  }

  function onDeleteBtnClickhendler() {
    DeleteUserDish(props.item);
  }

  const AddDishToDiaryBoardModal = (props) => {
    dispatch(
      openModalWithProps({
        modal: "AddDishToDiaryBoardModal",
        info: props,
      })
    );
  };

  const EditDishModal = (props) => {
    dispatch(openModalWithProps({ modal: "AddDishModal", info: props }));
  };

  const DeleteUserDish = (dishItem) => {
    dispatch(deleteUserDishItem(dishItem));
  };

  return props.item.dishProps.isUserDish ? (
    <li className={classes.CatalogListItem}>
      <span onClick={onListItemClickHendler}>{props.item.name}</span>
      <span onClick={onEditBtnClickhendler}>Редагувати</span>
      <span onClick={onDeleteBtnClickhendler}>Видалити</span>
    </li>
  ) : (
    <li className={classes.CatalogListItem}>
      <span onClick={onListItemClickHendler}>{props.item.name}</span>
    </li>
  );
};

export default CatalogListItem;
