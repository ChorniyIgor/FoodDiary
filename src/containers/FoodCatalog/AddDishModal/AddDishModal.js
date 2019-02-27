import React from "react";
import Modal from "../../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../redux/actions/modalActionCreators";
import { AddUserDish, FoodCatalogUpdate } from "../../../redux/actions/foodCatalogActionCreators";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";

const AddDishModal = props => {
  const inputNameRef = React.createRef();
  const inputCaloriesRef = React.createRef();
  const inputProteinsRef = React.createRef();
  const inputFatsRef = React.createRef();
  const inputCarbohydratesRef = React.createRef();

  const addUserDish = () => {
    const dishName = inputNameRef.current.value;

    const kkal = parseFloat(inputCaloriesRef.current.value);
    const proteins = parseFloat(inputProteinsRef.current.value);
    const fats = parseFloat(inputFatsRef.current.value);
    const carbohydrates = parseFloat(inputCarbohydratesRef.current.value);

    const newDish = {
      [dishName.toUpperCase()]: {
        kkal,
        proteins,
        fats,
        carbohydrates
      }
    };
    props.addUserDish(newDish);
    props.FoodCatalogUpdate();
  };

  function onFormSubmitHendler(evt) {
    evt.preventDefault();
    addUserDish();
    props.modalClose();
  }

  return props.show ? (
    <Modal onClose={props.modalClose}>
      <h1>Додати нову страву</h1>
      <form onSubmit={onFormSubmitHendler}>
        <Input
          labelText="Назва страви"
          inputRefer={inputNameRef}
          isRequired={true}
          autoFocus={true}
        />
        <Input
          labelText="Калорійність"
          inputRefer={inputCaloriesRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={0}
        />
        <Input
          labelText="Білки"
          inputRefer={inputProteinsRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={0}
        />
        <Input
          labelText="Жири"
          inputRefer={inputFatsRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={0}
        />
        <Input
          labelText="Вуглеводи"
          inputRefer={inputCarbohydratesRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={0}
        />
        <Button type="submit" text="Зберегти" color="blue" />
        <Button text="Закрити" onClick={props.modalClose} />
      </form>
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
