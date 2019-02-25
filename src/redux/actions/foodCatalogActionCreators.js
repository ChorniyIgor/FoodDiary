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
  };
}

export function FoodCatalogSerch(serchVal) {
  return (dispatch, getState) => {
    const state = getState();
    const actualFoodList = getFullFoodCatalog(state);

    const serchDish = actualFoodList.filter(dish => {
      return dish.name.toUpperCase().indexOf(serchVal.toUpperCase()) >= 0;
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
  return async dispatch => {
    const key = await Firebase.sendNewDish(newDish);
    dispatch({
      type: ADD_USER_DISH,
      newDish: {
        [key.name]: newDish
      }
    });
    dispatch(FoodCatalogUpdate());
  };
}

function getFullFoodCatalog(state) {
  function getDishesWithKey(data) {
    // return obj {dishName, dishKey}
    const userDishes = [];
    Object.keys(data).forEach(name => {
      const item = data[name];
      const dishName = Object.keys(item)[0];
      userDishes.push({
        name: dishName,
        key: name
      });
    });
    return userDishes;
  }

  return [
    ...getDishesWithKey(state.foodCatalog.dishes),
    ...getDishesWithKey(state.foodCatalog.userDishes)
  ];
}
