import React from "react";
import Modal from "../../../../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../../../store/Modal/ModalSlice";
import { AddUserDish } from "../../../../../store/FoodCatalog/FoodCatalogSlice";
import { editUserDish } from "../../../../../store/FoodCatalog/FoodCatalogSlice";

import Input from "../../../../../UI/Input/Input";
import { FoodCatalogUpdate } from "../../../../../store/FoodCatalog/FoodCatalogSlice";
import Button from "../../../../../UI/Button/Button";

const AddDishModal = (props) => {
  const inputNameRef = React.createRef();
  const inputCaloriesRef = React.createRef();
  const inputProteinsRef = React.createRef();
  const inputFatsRef = React.createRef();
  const inputCarbohydratesRef = React.createRef();

  const getDishPropsObj = () => {
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
        carbohydrates,
      },
    };
    if (props.isWithProps) newDish.key = props.dishItem.dishProps.key;
    return newDish;
  };

  function onFormSubmitHendler(evt) {
    evt.preventDefault();
    if (props.isWithProps) {
      console.log("edit");
      props.editUserDish(props.dishItem.name, getDishPropsObj());
    } else {
      props.addUserDish(getDishPropsObj());
    }
    props.FoodCatalogUpdate();
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
          defaultValue={props.isWithProps ? props.dishItem.name : ""}
        />
        <Input
          labelText="Калорійність"
          inputRefer={inputCaloriesRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={props.isWithProps ? props.dishItem.dishProps.kkal : 0}
        />
        <Input
          labelText="Білки"
          inputRefer={inputProteinsRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={
            props.isWithProps ? props.dishItem.dishProps.proteins : 0
          }
        />
        <Input
          labelText="Жири"
          inputRefer={inputFatsRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={props.isWithProps ? props.dishItem.dishProps.fats : 0}
        />
        <Input
          labelText="Вуглеводи"
          inputRefer={inputCarbohydratesRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={
            props.isWithProps ? props.dishItem.dishProps.carbohydrates : 0
          }
        />
        <Button type="submit" text="Зберегти" color="green" />
        <Button text="Закрити" onClick={props.modalClose} />
      </form>
    </Modal>
  ) : null;
};

function mapStateToProps(state) {
  return {
    show: state.modalWindows.AddDishModal.isOpen,
    dishItem: state.modalWindows.AddDishModal.props,
    isWithProps: !!state.modalWindows.AddDishModal.props,
    //  dishProps: state.modalWindows.AddDishModal.props
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
    addUserDish: (dishItem) => {
      dispatch(AddUserDish(dishItem));
      // dispatch(AddUserDish(dishItem));
    },
    editUserDish: (lastItemName, dishItem) => {
      dispatch(editUserDish(lastItemName, dishItem));
    },
    FoodCatalogUpdate: () => {
      dispatch(FoodCatalogUpdate());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDishModal);
