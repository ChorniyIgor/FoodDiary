import React from "react";
import FoodCatalogList from "./FoodCatalogList/FoodCatalogList";
import { connect } from "react-redux";
import {
  FoodCatalogSerch,
  FoodCatalogUpdate,
} from "../../../../redux/DiaryPage/actions/foodCatalogActionCreators";
import AddDishModal from "./AddDishModal/AddDishModal";
import AddDishToDiaryBoardModal from "./AddToDiaryBoardModal/AddToDiaryBoardModal";
import { openModal } from "../../../../redux/Modal/modalActionCreators";
import Button from "../../../../UI/Button/Button";
import Input from "../../../../UI/Input/Input";
import classes from "./FoodCataloge.module.css";

class FoodCatalog extends React.Component {
  componentDidMount = () => {
    this.props.foodCatalogUpdate();
  };

  onInputChangeHendler = (evt) => {
    this.props.onInput(evt.target.value.trim());
  };

  render() {
    return (
      <section className={classes.FoodCataloge}>
        <h2>Меню</h2>
        <Input onInput={this.onInputChangeHendler} />
        <FoodCatalogList serchRes={this.props.serchRes} />
        <Button
          text="Додати нову страву"
          onClick={this.props.modalOpen}
          color="green"
        />
        <AddDishModal />
        <AddDishToDiaryBoardModal />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    serchRes: state.foodCatalog.serchVal,
    foodCatalog: state.foodCatalog.dishes,
    userFoodCatalog: state.foodCatalog.userDishes,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onInput: (serchString) => {
      dispatch(FoodCatalogSerch(serchString));
    },
    modalOpen: () => {
      dispatch(openModal("AddDishModal"));
    },
    foodCatalogUpdate: () => {
      dispatch(FoodCatalogUpdate());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodCatalog);
