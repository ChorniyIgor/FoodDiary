import React from "react";
import { connect } from "react-redux";
import { openModalWithProps } from "../../../../redux/actions/modalActionCreators";

const CatalogListItem = props => {
  function onListItemClickHendler() {
    const info = {
      dishName: props.itemName,
      dishWeight: "500g"
    };
    props.modalOpen(info);
  }

  return <li onClick={onListItemClickHendler}>{props.itemName}</li>;
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
