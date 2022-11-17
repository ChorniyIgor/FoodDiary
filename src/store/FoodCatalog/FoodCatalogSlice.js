import { createSlice } from "@reduxjs/toolkit";
import { showMsg } from "../Modal/ModalSlice";
import Firebase from "../../Firebase";
import DataAdapter from "../../dataAdapter";

const initialState = {
  dishes: {},
  userDishes: {},
  serchVal: [],
  userDishesIsLoading: false,
  mainDishesIsLoading: false,
};

const foodCatalogSlice = createSlice({
  name: "@@foodCatalog",
  initialState: initialState,
  reducers: {
    loadMainFoodCatalog: (state, action) => {
      state.dishes = action.payload;
      state.mainDishesIsLoading = true;
    },
    loadUserFoodCatalog: (state, action) => {
      state.userDishes = action.payload;
      state.userDishesIsLoading = true;
    },
    foodSearch: (state, action) => {
      state.serchVal = action.payload;
    },
    addCustomUserDish: (state, action) => {
      state.userDishes[action.payload.name] = action.payload.data;
    },
    editCustomUserDish: (state, action) => {
      let userDishes = { ...state.userDishes };
      delete userDishes[action.payload.lastItemName];
      action.payload.dishItem[
        Object.keys(action.payload.dishItem)[0]
      ].isUserDish = true;
      action.payload.dishItem[Object.keys(action.payload.dishItem)[0]].key =
        action.payload.dishItem.key;
      delete action.payload.dishItem.key;
      state.userDishes = { ...userDishes, ...action.payload.dishItem };
    },
    deleteCustomUserDish: (state, action) => {
      const newUserDishes = { ...state.userDishes };
      delete newUserDishes[action.payload];

      state.userDishes = newUserDishes;
    },
  },
});

export const {
  loadMainFoodCatalog: loadMainCatalog,
  loadUserFoodCatalog: loadUserCatalog,
  foodSearch,
  addCustomUserDish,
  editCustomUserDish,
  deleteCustomUserDish,
} = foodCatalogSlice.actions;

export function loadMainFoodCatalog() {
  return async (dispatch) => {
    try {
      const mainFoodCatalog = await Firebase.getMainFoodCatalog();
      dispatch(loadMainCatalog(DataAdapter.dishes(mainFoodCatalog)));
      dispatch(FoodCatalogUpdate());
    } catch (e) {
      console.log("loadUserFoodCatalog error", e);
      dispatch(
        showMsg("error", "Щось пішло не так, спробуйте оновити сторінку")
      );
    }
  };
}

export function loadUserFoodCatalog() {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const userFoodCatalog = await Firebase.getUserFoodCatalog(
        state.Auth.userId
      );
      dispatch(loadUserCatalog(DataAdapter.dishes(userFoodCatalog, true)));
      dispatch(FoodCatalogUpdate());
      return userFoodCatalog;
    } catch (e) {
      console.log("loadUserFoodCatalog error", e);
      dispatch(
        showMsg("error", "Щось пішло не так, спробуйте оновити сторінку")
      );
    }
  };
}

//search
function getFullFoodCatalog(state) {
  function getDishesWithKey(data) {
    const userDishes = [];
    for (let dish in data) {
      userDishes.push({
        name: dish,
        dishProps: data[dish],
      });
    }

    return userDishes;
  }

  return [
    ...getDishesWithKey(state.foodCatalog.userDishes),
    ...getDishesWithKey(state.foodCatalog.dishes),
  ];
}

export function FoodCatalogSerch(serchVal) {
  return (dispatch, getState) => {
    const state = getState();
    const actualFoodList = getFullFoodCatalog(state);

    const serchDish = actualFoodList.filter((dish) => {
      return dish.name.toUpperCase().indexOf(serchVal.toUpperCase()) >= 0;
    });

    dispatch(foodSearch(serchDish));
  };
}

export function FoodCatalogUpdate() {
  return FoodCatalogSerch("");
}

export const AddUserDish = (newDish) => {
  console.log("newDish", newDish);
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const key = await Firebase.sendNewDish(newDish, state.Auth.userId);
      const dishName = Object.keys(newDish)[0];
      dispatch(
        addCustomUserDish({
          name: dishName,
          data: { ...newDish[dishName], key: key.name, isUserDish: true },
        })
      );
      dispatch(FoodCatalogUpdate());
      dispatch(showMsg("success", "Страву успішно додано до вашого каталогу"));
    } catch (error) {
      console.log(error);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
};

export function editUserDish(lastItemName, dishItem) {
  return async (dispatch, getState) => {
    const state = getState();
    const data = { ...dishItem };
    delete data.key;
    try {
      await Firebase.editUserDish(data, dishItem.key, state.Auth.userId);
      dispatch(
        editCustomUserDish({
          lastItemName,
          dishItem,
        })
      );
      dispatch(FoodCatalogUpdate());
      dispatch(showMsg("success", "Інформацію про страву успішно оновлено"));
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
      await Firebase.deleteUserDish(dishItem.dishProps.key, state.Auth.userId);
      dispatch(deleteCustomUserDish(dishItem.name));
      dispatch(FoodCatalogUpdate());
      dispatch(showMsg("success", "Страву видалено"));
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
}

export const FoodCatalogReducer = foodCatalogSlice.reducer;
