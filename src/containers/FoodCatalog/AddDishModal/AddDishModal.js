import React from "react";
import Modal from "../../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../redux/actions/modalActionCreators";
import { AddUserDish, FoodCatalogUpdate } from "../../../redux/actions/foodCatalogActionCreators";

const AddDishModal = props => {
  const inputRef = React.createRef();
  const addUserDish = () => {
    props.addUserDish(inputRef.current.value);
    props.FoodCatalogUpdate();
  };
  return props.show ? (
    <Modal onClose={props.modalClose}>
      <h1>Додати нову страву</h1>
      <input type="text" ref={inputRef} />
      <button onClick={addUserDish}>Зберегти</button>
      <button onClick={props.modalClose}>Закрити</button>
    </Modal>
  ) : null;
};

function mapStateToProps(state) {
  return {
    show: state.modalWindows.AddDishModal.isOpen
  };
}
function mapDispatchToProps(dispatch) {
  return {
    modalOpen: () => {
      dispatch(openModal("AddDishModal"));
    },
    modalClose: () => {
      dispatch(closeModal("AddDishModal"));
    },
    addUserDish: dishName => {
      dispatch(AddUserDish(dishName));
    },
    FoodCatalogUpdate: () => {
      dispatch(FoodCatalogUpdate());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDishModal);
