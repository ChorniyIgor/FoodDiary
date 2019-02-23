import React from "react";
import { connect } from "react-redux";
import { addDishToDiary } from "../../../../redux/actions/foodDiaryActionCreators";

const CatalogListItem = props => {
  return (
    <li
      onClick={() => {
        props.addDishToDiary(props.itemName);
      }}
    >
      {props.itemName}
    </li>
  );
};

function mapDispatchToProps(disapatch) {
  return {
    addDishToDiary: dishName => {
      disapatch(addDishToDiary(dishName));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CatalogListItem);
