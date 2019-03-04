import React from "react";
import { connect } from "react-redux";
import { openModalWithProps } from "../../../../../../redux/Modal/modalActionCreators";
import classes from "./CatalogListItem.css";
import { deleteUserDishItem } from "../../../../../../redux/DiaryPage/actions/foodCatalogActionCreators";

const CatalogListItem = props => {
  function onListItemClickHendler() {
    const info = {
      dishName: props.item.name,
      kkal: props.item.dishProps.kkal,
      proteins: props.item.dishProps.proteins,
      fats: props.item.dishProps.fats,
      carbohydrates: props.item.dishProps.carbohydrates
    };
    props.AddDishToDiaryBoardModal(info);
  }

  function onEditBtnClickhendler() {
    props.EditDishModal(props.item);
  }

  function onDeleteBtnClickhendler() {
    props.DeleteUserDish(props.item);
  }

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

function mapDispatchToProps(dispatch) {
  return {
    AddDishToDiaryBoardModal: props => {
      dispatch(openModalWithProps("AddDishToDiaryBoardModal", props));
    },
    EditDishModal: props => {
      dispatch(openModalWithProps("AddDishModal", props));
    },
    DeleteUserDish: dishItem => {
      dispatch(deleteUserDishItem(dishItem));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CatalogListItem);
