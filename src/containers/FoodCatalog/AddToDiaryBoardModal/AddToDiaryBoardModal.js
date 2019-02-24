import React from "react";
import classes from "./AddToDiaryBoardModal.css";
import Modal from "../../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../redux/actions/modalActionCreators";
import { addDishToDiary } from "../../../redux/actions/foodDiaryActionCreators";
import LabelInput from "../../../UI/InputLabel/InputLabel";

const AddDishToDiaryBoardModal = props => {
  const inputWeight = React.createRef();

  function onAddDishDiaryClickHendler() {
    const dishInfo = { ...props.dishProps, dishWeight: +inputWeight.current.value };
    console.log(dishInfo);
    props.addDishToDiary(dishInfo);
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
      <LabelInput labelText="Кількість у граммах">
        <input type="text" autoFocus ref={inputWeight} />
      </LabelInput>
      <button onClick={onAddDishDiaryClickHendler}>Додати у щоденник</button>
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
