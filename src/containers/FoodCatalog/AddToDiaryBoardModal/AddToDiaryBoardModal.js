import React from "react";
import Modal from "../../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../redux/actions/modalActionCreators";
import { addDishToDiary } from "../../../redux/actions/foodDiaryActionCreators";

const AddDishToDiaryBoardModal = props => {
  function onAddDishDiaryClickHendler() {
    props.addDishToDiary(props.dishProps);
    props.modalClose();
  }

  return props.show ? (
    <Modal onClose={props.modalClose}>
      <h1>{props.dishProps.dishName}</h1>
      <input type="text" placeholder={props.dishProps.dishWeight} />
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
