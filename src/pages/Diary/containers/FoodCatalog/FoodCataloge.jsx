import FoodCatalogList from "./FoodCatalogList/FoodCatalogList";
import { useDispatch, useSelector } from "react-redux";
import { setCatalogSearchString } from "../../../../store/FoodCatalog/FoodCatalogSlice";
import AddDishModal from "./AddDishModal/AddDishModal";
import AddDishToDiaryBoardModal from "./AddToDiaryBoardModal/AddToDiaryBoardModal";
import { openModal } from "../../../../store/Modal/ModalSlice";
import Button from "../../../../UI/Button/Button";
import Input from "../../../../UI/Input/Input";
import classes from "./FoodCataloge.module.css";
import {
  getFiltratedDishesFromCatalog,
  getSearchVal,
} from "../../../../store/FoodCatalog/FoodCatalogSelectors";

const FoodCatalog = () => {
  const dispatch = useDispatch();
  const searchVal = useSelector(getSearchVal);
  const searchRes = useSelector((store) => {
    return getFiltratedDishesFromCatalog(store, searchVal);
  });

  const onInputChangeHendler = (evt) => {
    dispatch(setCatalogSearchString(evt.target.value.trim()));
  };

  const onAddNewDishBtnClickHandler = () => {
    dispatch(openModal("AddDishModal"));
  };

  return (
    <section className={classes.FoodCataloge}>
      <h2>Dishes</h2>
      <Input
        onInput={onInputChangeHendler}
        className={classes.FoodCatalogInput}
        placeholder={"Search"}
      />
      <FoodCatalogList serchRes={searchRes} />
      <Button text="Add" onClick={onAddNewDishBtnClickHandler} color="green" />
      <AddDishModal />
      <AddDishToDiaryBoardModal />
    </section>
  );
};

export default FoodCatalog;
