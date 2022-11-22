import React, { useRef } from "react";
import Modal from "../../../../../hoc/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../../../store/Modal/ModalSlice";
import { AddUserDish } from "../../../../../store/FoodCatalog/AddUserDish";
import { editUserDish } from "../../../../../store/FoodCatalog/editUserDish";

import Input from "../../../../../UI/Input/Input";
import Button from "../../../../../UI/Button/Button";

const AddDishModal = (props) => {
  const { isOpen: show, props: dishItem } = useSelector(
    (state) => state.modalWindows.AddDishModal
  );
  const isWithProps = !!dishItem;
  const dispatch = useDispatch();

  const inputNameRef = useRef();
  const inputCaloriesRef = useRef();
  const inputProteinsRef = useRef();
  const inputFatsRef = useRef();
  const inputCarbohydratesRef = useRef();

  const getDishPropsObj = () => {
    const dishName = inputNameRef.current.value;

    const kkal = parseFloat(inputCaloriesRef.current.value);
    const proteins = parseFloat(inputProteinsRef.current.value);
    const fats = parseFloat(inputFatsRef.current.value);
    const carbohydrates = parseFloat(inputCarbohydratesRef.current.value);
    const newDish = {
      dishName,
      kkal,
      proteins,
      fats,
      carbohydrates,
      isUserDish: true,
    };

    if (isWithProps) newDish.key = dishItem.key;
    return newDish;
  };

  function onFormSubmitHendler(evt) {
    evt.preventDefault();
    if (isWithProps) {
      //edit
      dispatch(editUserDish(dishItem.name, getDishPropsObj()));
    } else {
      dispatch(AddUserDish(getDishPropsObj()));
    }
    dispatch(closeModal("AddDishModal"));
  }

  const onModalCloseHandler = () => {
    dispatch(closeModal("AddDishModal"));
  };

  return show ? (
    <Modal onClose={onModalCloseHandler}>
      <h1>Here you can add your custom dish</h1>
      <form onSubmit={onFormSubmitHendler}>
        <Input
          labelText="Name"
          inputRefer={inputNameRef}
          isRequired={true}
          autoFocus={true}
          defaultValue={isWithProps ? dishItem.dishName : ""}
        />
        <Input
          labelText="Caloric content"
          inputRefer={inputCaloriesRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={isWithProps ? dishItem.kkal : 0}
        />
        <Input
          labelText="Proteins"
          inputRefer={inputProteinsRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={isWithProps ? dishItem.proteins : 0}
        />
        <Input
          labelText="Fats"
          inputRefer={inputFatsRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={isWithProps ? dishItem.fats : 0}
        />
        <Input
          labelText="Carbohydrates"
          inputRefer={inputCarbohydratesRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={isWithProps ? dishItem.carbohydrates : 0}
        />
        <Button type="submit" text="Save" color="green" />
        <Button text="Close" onClick={onModalCloseHandler} />
      </form>
    </Modal>
  ) : null;
};

export default AddDishModal;
