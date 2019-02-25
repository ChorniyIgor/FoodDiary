import {
  FOOD_SERCH,
  ADD_USER_DISH,
  LOAD_MAIN_FOOD_CATALOG,
  LOAD_USER_FOOD_CATALOG
} from "./actionTypes";
import Firebase from "../../Firebase";

export function loadMainFoodCatalog() {
  return async dispatch => {
    const mainFoodCatalog = await Firebase.getMainFoodCatalog();
    dispatch({
      type: LOAD_MAIN_FOOD_CATALOG,
      mainFoodCatalog
    });
    dispatch(FoodCatalogUpdate());
    console.log(mainFoodCatalog);
  };
}

export function loadUserFoodCatalog() {
  return async dispatch => {
    const userFoodCatalog = await Firebase.getUserFoodCatalog();
    dispatch({
      type: LOAD_USER_FOOD_CATALOG,
      userFoodCatalog
    });
    dispatch(FoodCatalogUpdate());
    console.log(userFoodCatalog);
  };
}

export function FoodCatalogSerch(serchVal) {
  return (dispatch, getState) => {
    const state = getState();
    const foodCatalog = [
      ...Object.keys(state.foodCatalog.dishes),
      ...Object.keys(state.foodCatalog.userDishes)
    ].sort();

    const serchDish = foodCatalog.filter(dish => {
      return dish.toUpperCase().indexOf(serchVal.toUpperCase()) >= 0;
    });

    dispatch({
      type: FOOD_SERCH,
      serchDish
    });
  };
}

export function FoodCatalogUpdate() {
  return FoodCatalogSerch("");
}

export function AddUserDish(newDish) {
  return {
    type: ADD_USER_DISH,
    newDish
  };
}
