import React from "react";
import Modal from "../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { addUserDish, FoodCatalogUpdate } from "../../redux/actions/foodCatalogActionCreators";
import { closeAddNewDishModal } from "../../hoc/Modal/modalActions";

class AddDishToDiaryModall extends React.Component {
  render() {
    return (
      <Modal>
        <h2>Додати страву в щоденник</h2>
        <button>Зберегти</button>
        <button onClick={this.props.modalClose}>Закрити</button>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addDish: dishName => {
      dispatch(addUserDish(dishName));
    },
    modalClose: () => {
      dispatch(closeAddDishToDiaryModal());
    },
    foodCatalogUpdate: () => {
      dispatch(FoodCatalogUpdate());
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddDishToDiaryModall);
