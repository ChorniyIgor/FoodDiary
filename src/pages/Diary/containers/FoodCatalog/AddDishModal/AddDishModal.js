import React, { useRef } from "react";
import Modal from "../../../../../hoc/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../../../store/Modal/ModalSlice";
import { AddUserDish } from "../../../../../store/FoodCatalog/FoodCatalogSlice";
import { editUserDish } from "../../../../../store/FoodCatalog/FoodCatalogSlice";

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
      [dishName.toUpperCase()]: {
        kkal,
        proteins,
        fats,
        carbohydrates,
      },
    };
    if (isWithProps) newDish.key = dishItem.dishProps.key;
    return newDish;
  };

  function onFormSubmitHendler(evt) {
    evt.preventDefault();
    if (isWithProps) {
      console.log("edit");
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
      <h1>Додати нову страву</h1>
      <form onSubmit={onFormSubmitHendler}>
        <Input
          labelText="Назва страви"
          inputRefer={inputNameRef}
          isRequired={true}
          autoFocus={true}
          defaultValue={isWithProps ? dishItem.name : ""}
        />
        <Input
          labelText="Калорійність"
          inputRefer={inputCaloriesRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={isWithProps ? dishItem.dishProps.kkal : 0}
        />
        <Input
          labelText="Білки"
          inputRefer={inputProteinsRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={isWithProps ? dishItem.dishProps.proteins : 0}
        />
        <Input
          labelText="Жири"
          inputRefer={inputFatsRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={isWithProps ? dishItem.dishProps.fats : 0}
        />
        <Input
          labelText="Вуглеводи"
          inputRefer={inputCarbohydratesRef}
          inputType="number"
          isRequired={true}
          min={0}
          defaultValue={isWithProps ? dishItem.dishProps.carbohydrates : 0}
        />
        <Button type="submit" text="Зберегти" color="green" />
        <Button text="Закрити" onClick={onModalCloseHandler} />
      </form>
    </Modal>
  ) : null;
};

export default AddDishModal;
