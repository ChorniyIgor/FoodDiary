import React from "react";
import classes from "./AddToDiaryBoardModal.css";
import Modal from "../../../../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../../../redux/Modal/modalActionCreators";
import {
  addDishToDiary,
  editDishInDiary
} from "../../../../../redux/DiaryPage/actions/foodDiaryActionCreators";
import Input from "../../../../../UI/Input/Input";
import Button from "../../../../../UI/Button/Button";

const AddDishToDiaryBoardModal = props => {
  const inputWeight = React.createRef();
  function onAddDishDiaryClickHendler() {
    if (props.dishProps.isEdit) {
      const dishInfo = {
        ...props.dishProps,
        dishWeight: +inputWeight.current.value
      };
      props.editDishInDiary(dishInfo);
    } else {
      const dishInfo = {
        ...props.dishProps,
        dishWeight: +inputWeight.current.value
      };
      props.addDishToDiary(dishInfo);
    }
  }

  function formSubmitHendler(evt) {
    evt.preventDefault();
    onAddDishDiaryClickHendler();
    props.modalClose();
  }

  return props.show ? (
    <Modal onClose={props.modalClose}>
      <h1 className={classes.BoardHeader}>{props.dishProps.dishName}</h1>
      <div className={classes.BoardInfo}>
        <p>Калорійність: {props.dishProps.kkal}</p>
        <p>Білки: {props.dishProps.proteins}</p>
        <p>Жири: {props.dishProps.fats}</p>
        <p>Вуглеводи: {props.dishProps.carbohydrates}</p>
      </div>
      <form onSubmit={formSubmitHendler}>
        <Input
          labelText="Кількість у граммах"
          inputRefer={inputWeight}
          inputType="number"
          isRequired={true}
          min={1}
          defaultValue={props.dishProps.dishWeight || 100}
          autoFocus={true}
        />
        {props.dishProps.isEdit ? (
          <Button type="submit" text="Зберегти зміни" color="green" />
        ) : (
          <Button type="submit" text="Додати у щоденник" color="green" />
        )}

        <Button text="Закрити" onClick={props.modalClose} />
      </form>
    </Modal>
  ) : null;
};

function mapStateToProps(state) {
  return {
    show: state.modalWindows.AddDishToDiaryBoardModal.isOpen,
    dishProps: state.modalWindows.AddDishToDiaryBoardModal.props
  };
}
function mapDispatchToProps(dispatch) {
  return {
    modalOpen: () => {
      dispatch(openModal("AddDishToDiaryBoardModal"));
    },
    modalClose: () => {
      dispatch(closeModal("AddDishToDiaryBoardModal"));
    },
    addDishToDiary: dishInfo => {
      dispatch(addDishToDiary(dishInfo));
    },
    editDishInDiary: dishInfo => {
      dispatch(editDishInDiary(dishInfo));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDishToDiaryBoardModal);
