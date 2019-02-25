import React from "react";
import classes from "./AddToDiaryBoardModal.css";
import Modal from "../../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../redux/actions/modalActionCreators";
import { addDishToDiary } from "../../../redux/actions/foodDiaryActionCreators";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";

const AddDishToDiaryBoardModal = props => {
  const inputWeight = React.createRef();

  function onAddDishDiaryClickHendler() {
    const dishInfo = { ...props.dishProps, dishWeight: +inputWeight.current.value };
    props.addDishToDiary(dishInfo);
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
          defaultValue={100}
          autoFocus={true}
        />
        <Button type="submit" text="Додати у щоденник" color="blue" />
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
    addDishToDiary: props => {
      dispatch(addDishToDiary(props));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDishToDiaryBoardModal);
