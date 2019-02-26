import React from "react";
import { connect } from "react-redux";
import { openModalWithProps } from "../../../../redux/actions/modalActionCreators";

const CatalogListItem = props => {
  function onListItemClickHendler() {
    const dishList = { ...props.dishList, ...props.dishUserList };
    const dishItem = dishList[props.item.key];
    const dishItemProps = dishItem[props.item.name];

    const info = {
      dishName: props.item.name,
      kkal: dishItemProps.kkal,
      proteins: dishItemProps.proteins,
      fats: dishItemProps.fats,
      carbohydrates: dishItemProps.carbohydrates
    };
    props.modalOpen(info);
  }

  return <li onClick={onListItemClickHendler}>{props.item.name}</li>;
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
