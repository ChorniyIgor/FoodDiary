import DataAdapter from "../../../DataAdapter";
import Firebase from "../../../Firebase";

import {
  FOOD_SERCH,
  ADD_USER_DISH,
  LOAD_MAIN_FOOD_CATALOG,
  LOAD_USER_FOOD_CATALOG,
  DELETE_USER_DISH,
  EDIT_USER_DISH
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
    return mainFoodCatalog;
  };
}

export function loadUserFoodCatalog() {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const userFoodCatalog = await Firebase.getUserFoodCatalog(state.Auth.userId);
      dispatch({
        type: LOAD_USER_FOOD_CATALOG,
        userFoodCatalog: DataAdapter.dishes(userFoodCatalog, true)
      });
      dispatch(FoodCatalogUpdate());
      return userFoodCatalog;
    } catch (e) {
      console.log("loadUserFoodCatalog error", e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте оновити сторінку"));
    }
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
          [dishName]: { ...newDish[dishName], key: key.name, isUserDish: true }
        }
      });
      dispatch(FoodCatalogUpdate());
      dispatch(showMsg("success", "Страву успішно додано до вашого каталогу"));
    } catch {
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
}

export function editUserDish(lastItemName, dishItem) {
  return async (dispatch, getState) => {
    const state = getState();
    const data = { ...dishItem };
    delete data.key;
    try {
      const res = await Firebase.editUserDish(data, dishItem.key, state.Auth.userId);
      if (res === 200) {
        dispatch({
          type: EDIT_USER_DISH,
          lastItemName,
          dishItem
        });
        dispatch(FoodCatalogUpdate());
        dispatch(showMsg("success", "Інформацію про страву успішно оновлено"));
      } else dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
}

export function deleteUserDishItem(dishItem) {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const res = await Firebase.deleteUserDish(dishItem.dishProps.key, state.Auth.userId);
      if (res === 200) {
        dispatch({
          type: DELETE_USER_DISH,
          dishName: dishItem.name
        });
        dispatch(FoodCatalogUpdate());
        dispatch(showMsg("success", "Страву видалено"));
      } else {
        dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
      }
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
}
