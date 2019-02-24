import React from "react";
import Modal from "../../../hoc/Modal/Modal";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../../redux/actions/modalActionCreators";
import { AddUserDish, FoodCatalogUpdate } from "../../../redux/actions/foodCatalogActionCreators";
import InputLabel from "../../../UI/InputLabel/InputLabel";

const AddDishModal = props => {
  const inputNameRef = React.createRef();
  const inputCaloriesRef = React.createRef();
  const inputProteinsRef = React.createRef();
  const inputFatsRef = React.createRef();
  const inputCarbohydratesRef = React.createRef();

  const addUserDish = () => {
    /*Арахіс: {
      kkal: 100,
      proteins: 18,
      fats: 10,
      carbohydrates: 40
    },*/
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
      <InputLabel labelText="Назва страви">
        <input type="text" autoFocus ref={inputNameRef} />
      </InputLabel>
      <InputLabel labelText="Калорійність">
        <input type="text" ref={inputCaloriesRef} />
      </InputLabel>
      <InputLabel labelText="Білки">
        <input type="text" ref={inputProteinsRef} />
      </InputLabel>
      <InputLabel labelText="Жири">
        <input type="text" ref={inputFatsRef} />
      </InputLabel>
      <InputLabel labelText="Вуглеводи">
        <input type="text" ref={inputCarbohydratesRef} />
      </InputLabel>

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
