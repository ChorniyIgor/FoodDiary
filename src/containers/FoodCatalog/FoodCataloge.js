import React from "react";
import FoodCatalogList from "./FoodCatalogList/FoodCatalogList";
import { connect } from "react-redux";
import { FoodCatalogSerch, FoodCatalogUpdate } from "../../redux/actions/foodCatalogActionCreators";
import AddDishModal from "./AddDishModal/AddDishModal";
import AddDishToDiaryBoardModal from "./AddToDiaryBoardModal/AddToDiaryBoardModal";
import { openModal } from "../../redux/actions/modalActionCreators";

class FoodCatalog extends React.Component {
  componentDidMount = () => {
    this.props.foodCatalogUpdate();
  };

  render() {
    return (
      <section>
        <h2>Food cataloge</h2>
        <input
          type="text"
          onInput={evt => {
            this.props.onInput(evt.target.value);
          }}
        />
        <FoodCatalogList serchRes={this.props.serchRes} />
        <button
          onClick={() => {
            this.props.modalOpen();
          }}
        >
          Додати нову страву
        </button>
        <AddDishModal />
        <AddDishToDiaryBoardModal />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    serchRes: state.foodCatalog.serchVal,
    foodCatalog: state.foodCatalog.dishes,
    userFoodCatalog: state.foodCatalog.userDishes
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onInput: serchString => {
      dispatch(FoodCatalogSerch(serchString));
    },
    modalOpen: () => {
      dispatch(openModal("AddDishModal"));
    },
    foodCatalogUpdate: () => {
      dispatch(FoodCatalogUpdate());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodCatalog);
