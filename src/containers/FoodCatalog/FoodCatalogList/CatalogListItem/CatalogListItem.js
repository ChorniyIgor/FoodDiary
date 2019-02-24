import React from "react";
import { connect } from "react-redux";
import { openModalWithProps } from "../../../../redux/actions/modalActionCreators";

const CatalogListItem = props => {
  function onListItemClickHendler() {
    const dishList = { ...props.dishList, ...props.dishUserList };
    const dishItem = dishList[props.itemName];

    const info = {
      dishName: props.itemName,
      kkal: dishItem.kkal,
      proteins: dishItem.proteins,
      fats: dishItem.fats,
      carbohydrates: dishItem.carbohydrates
    };
    props.modalOpen(info);
  }

  return <li onClick={onListItemClickHendler}>{props.itemName}</li>;
};

function mapStateToProps(state) {
  return {
    dishList: state.foodCatalog.dishes,
    dishUserList: state.foodCatalog.userDishes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    modalOpen: props => {
      dispatch(openModalWithProps("AddDishToDiaryBoardModal", props));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListItem);
