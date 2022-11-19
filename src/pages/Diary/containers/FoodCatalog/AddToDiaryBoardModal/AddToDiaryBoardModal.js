import React, { useRef } from "react";
import classes from "./AddToDiaryBoardModal.module.css";
import Modal from "../../../../../hoc/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../../store/Modal/ModalSlice";
import {
  addDishToDiary,
  editDishInDiary,
} from "../../../../../store/Diary/DiarySlice";
import Input from "../../../../../UI/Input/Input";
import Button from "../../../../../UI/Button/Button";

const AddDishToDiaryBoardModal = (props) => {
  const dispatch = useDispatch();
  const inputWeight = useRef();
  const { isOpen: show, props: dishProps } = useSelector(
    (state) => state.modalWindows.AddDishToDiaryBoardModal
  );

  const onAddDishDiaryClickHendler = () => {
    if (dishProps.isEdit) {
      const dishInfo = {
        ...dishProps,
        dishWeight: +inputWeight.current.value,
      };
      dispatch(editDishInDiary(dishInfo));
    } else {
      const dishInfo = {
        ...dishProps,
        dishWeight: +inputWeight.current.value,
      };
      dispatch(addDishToDiary(dishInfo));
    }
  };

  const formSubmitHendler = (evt) => {
    evt.preventDefault();
    onAddDishDiaryClickHendler();
    dispatch(closeModal("AddDishToDiaryBoardModal"));
  };

  const onModalCloseHandler = () => {
    dispatch(closeModal("AddDishToDiaryBoardModal"));
  };

  return show ? (
    <Modal onClose={onModalCloseHandler}>
      <h1 className={classes.BoardHeader}>{dishProps.dishName}</h1>
      <div className={classes.BoardInfo}>
        <p>Caloric content: {dishProps.kkal}</p>
        <p>Proteins: {dishProps.proteins}</p>
        <p>Fats: {dishProps.fats}</p>
        <p>Carbohydrates: {dishProps.carbohydrates}</p>
      </div>
      <form onSubmit={formSubmitHendler}>
        <Input
          labelText="Weight"
          inputRefer={inputWeight}
          inputType="number"
          isRequired={true}
          min={1}
          defaultValue={dishProps.dishWeight || 100}
          autoFocus={true}
        />
        {dishProps.isEdit ? (
          <Button type="submit" text="Save changes" color="green" />
        ) : (
          <Button type="submit" text="Add to diary" color="green" />
        )}

        <Button text="Close" onClick={onModalCloseHandler} />
      </form>
    </Modal>
  ) : null;
};

export default AddDishToDiaryBoardModal;
