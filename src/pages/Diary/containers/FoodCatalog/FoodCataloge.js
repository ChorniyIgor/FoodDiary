import React, { useEffect } from "react";
import FoodCatalogList from "./FoodCatalogList/FoodCatalogList";
import { useDispatch, useSelector } from "react-redux";
import {
  FoodCatalogUpdate,
  FoodCatalogSerch,
} from "../../../../store/FoodCatalog/FoodCatalogSlice";
import AddDishModal from "./AddDishModal/AddDishModal";
import AddDishToDiaryBoardModal from "./AddToDiaryBoardModal/AddToDiaryBoardModal";
import { openModal } from "../../../../store/Modal/ModalSlice";
import Button from "../../../../UI/Button/Button";
import Input from "../../../../UI/Input/Input";
import classes from "./FoodCataloge.module.css";

const FoodCatalog = () => {
  const dispatch = useDispatch();
  const { serchVal: serchRes } = useSelector((state) => state.foodCatalog);

  useEffect(() => {
    dispatch(FoodCatalogUpdate());
  }, [dispatch]);

  const onInputChangeHendler = (evt) => {
    dispatch(FoodCatalogSerch(evt.target.value.trim()));
  };

  const onAddNewDishBtnClickHandler = () => {
    dispatch(openModal("AddDishModal"));
  };

  return (
    <section className={classes.FoodCataloge}>
      <h2>Меню</h2>
      <Input onInput={onInputChangeHendler} />
      <FoodCatalogList serchRes={serchRes} />
      <Button
        text="Додати нову страву"
        onClick={onAddNewDishBtnClickHandler}
        color="green"
      />
      <AddDishModal />
      <AddDishToDiaryBoardModal />
    </section>
  );
};

export default FoodCatalog;
