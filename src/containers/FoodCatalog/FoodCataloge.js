import React from "react";
import FoodCatalogList from "../FoodCatalogList/FoodCatalogList";
import { connect } from "react-redux";
import { FoodCatalogSerch } from "../../redux/actions/foodDiaryActionCreators";

const FoodCatalog = props => {
  return (
    <section>
      <h2>Food cataloge</h2>
      <input type="text" onKeyUp={props.onInput} />
      <FoodCatalogList dishes={props.foodCatalog} />
    </section>
  );
};

function mapStateToProps(state) {
  return {
    foodCatalog: state.foodCatalog.serchVal
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onInput: evt => {
      dispatch(FoodCatalogSerch(evt.target.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodCatalog);
