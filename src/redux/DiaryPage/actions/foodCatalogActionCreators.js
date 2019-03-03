import DataAdapter from "../../../DataAdapter";
import Firebase from "../../../Firebase";

import {
  FOOD_SERCH,
  ADD_USER_DISH,
  LOAD_MAIN_FOOD_CATALOG,
  LOAD_USER_FOOD_CATALOG
} from "./actionTypes";
import { showMsg } from "../../Modal/modalActionCreators";

export function loadMainFoodCatalog() {
  return async dispatch => {
    const mainFoodCatalog = await Firebase.getMainFoodCatalog();
    dispatch({
      type: LOAD_MAIN_FOOD_CATALOG,
      mainFoodCatalog: DataAdapter.dishes(mainFoodCatalog)
    });
    dispatch(FoodCatalogUpdate());
  };
}

export function loadUserFoodCatalog() {
  return async (dispatch, getState) => {
    const state = getState();
    const userFoodCatalog = await Firebase.getUserFoodCatalog(state.Auth.userId);
    dispatch({
      type: LOAD_USER_FOOD_CATALOG,
      userFoodCatalog: DataAdapter.dishes(userFoodCatalog)
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
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const key = await Firebase.sendNewDish(newDish, state.Auth.userId);
      const dishName = Object.keys(newDish)[0];
      console.log(newDish);
      dispatch({
        type: ADD_USER_DISH,
        newDish: {
          [dishName]: { ...newDish[dishName], key: key.name }
        }
      });
      dispatch(FoodCatalogUpdate());
      dispatch(showMsg("success", "Страву успішно додано до вашого каталогу"));
    } catch {
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
}

function getFullFoodCatalog(state) {
  function getDishesWithKey(data) {
    // return obj {dishName, dishKey}
    const userDishes = [];
    for (let dish in data) {
      userDishes.push({
        name: dish,
        dishProps: data[dish]
      });
    }

    return userDishes;
  }

  return [
    ...getDishesWithKey(state.foodCatalog.userDishes),
    ...getDishesWithKey(state.foodCatalog.dishes)
  ];
}
