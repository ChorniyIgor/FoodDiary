import React from "react";
import { useDispatch } from "react-redux";
import { openModalWithProps } from "../../../../../../store/Modal/ModalSlice";
import classes from "./CatalogListItem.module.css";
import { deleteUserDishItem } from "../../../../../../store/FoodCatalog/deleteUserDishItem";

const CatalogListItem = (props) => {
  const dispatch = useDispatch();
  function onListItemClickHendler() {
    const info = {
      dishName: props.item.dishName,
      kkal: props.item.kkal,
      proteins: props.item.proteins,
      fats: props.item.fats,
      carbohydrates: props.item.carbohydrates,
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

  return props.item.isUserDish ? (
    <li className={classes.CatalogListItem}>
      <span onClick={onListItemClickHendler}>{props.item.dishName}</span>
      <span onClick={onEditBtnClickhendler}>Редагувати</span>
      <span onClick={onDeleteBtnClickhendler}>Видалити</span>
    </li>
  ) : (
    <li className={classes.CatalogListItem}>
      <span onClick={onListItemClickHendler}>{props.item.dishName}</span>
    </li>
  );
};

export default CatalogListItem;
