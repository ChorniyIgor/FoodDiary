import React from "react";
import { connect } from "react-redux";
import { openModalWithProps } from "../../../../../../redux/DiaryPage/actions/modalActionCreators";

const CatalogListItem = props => {
  function onListItemClickHendler() {
    const info = {
      dishName: props.item.name,
      kkal: props.item.dishProps.kkal,
      proteins: props.item.dishProps.proteins,
      fats: props.item.dishProps.fats,
      carbohydrates: props.item.dishProps.carbohydrates
    };
    props.modalOpen(info);
  }

  return <li onClick={onListItemClickHendler}>{props.item.name}</li>;
};

function mapDispatchToProps(dispatch) {
  return {
    modalOpen: props => {
      dispatch(openModalWithProps("AddDishToDiaryBoardModal", props));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CatalogListItem);
