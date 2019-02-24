import React from "react";
import Modal from "../../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../redux/actions/modalActionCreators";
import { AddUserDish, FoodCatalogUpdate } from "../../../redux/actions/foodCatalogActionCreators";
import Input from "../../../UI/Input/Input";

const AddDishModal = props => {
  const inputNameRef = React.createRef();
  const inputCaloriesRef = React.createRef();
  const inputProteinsRef = React.createRef();
  const inputFatsRef = React.createRef();
  const inputCarbohydratesRef = React.createRef();

  const addUserDish = () => {
    const dishName = inputNameRef.current.value;

    const kkal = inputCaloriesRef.current.value;
    const proteins = inputProteinsRef.current.value;
    const fats = inputFatsRef.current.value;
    const carbohydrates = inputCarbohydratesRef.current.value;

    const newDish = {
      [dishName]: {
        kkal,
        proteins,
        fats,
        carbohydrates
      }
    };
    props.addUserDish(newDish);
    props.FoodCatalogUpdate();
  };
  return props.show ? (
    <Modal onClose={props.modalClose}>
      <h1>Додати нову страву</h1>
      <Input labelText="Назва страви" inputRefer={inputNameRef} />
      <Input labelText="Калорійність" inputRefer={inputCaloriesRef} inputType="number" />
      <Input labelText="Білки" inputRefer={inputProteinsRef} inputType="number" />
      <Input labelText="Жири" inputRefer={inputFatsRef} inputType="number" />
      <Input labelText="Вуглеводи" inputRefer={inputCarbohydratesRef} inputType="number" />

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
