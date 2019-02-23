import React from "react";
import Modal from "../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { addUserDish, FoodCatalogUpdate } from "../../redux/actions/foodCatalogActionCreators";
import { closeAddNewDishModal } from "../../hoc/Modal/modalActions";

class AddDishModall extends React.Component {
  state = {
    name: ""
  };

  onSaveBtnClickHandler = () => {
    this.props.addDish(this.state.name);
    this.props.foodCatalogUpdate();
    this.props.modalClose();
  };

  onInputChangeHandler = evt => {
    this.setState({
      ...this.state,
      name: evt.target.value
    });
  };

  render() {
    return (
      <Modal>
        <h2>Додати нову страву</h2>
        <input type="text" onInput={this.onInputChangeHandler} />
        <button onClick={this.onSaveBtnClickHandler}>Зберегти</button>
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
      dispatch(closeAddNewDishModal());
    },
    foodCatalogUpdate: () => {
      dispatch(FoodCatalogUpdate());
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddDishModall);
