import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dishes: {},
  userDishes: {},
  searchVal: "",
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
    setCatalogSearchString: (state, action) => {
      state.searchVal = action.payload;
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
  addCustomUserDish,
  editCustomUserDish,
  setCatalogSearchString,
  deleteCustomUserDish,
} = foodCatalogSlice.actions;

export const FoodCatalogReducer = foodCatalogSlice.reducer;
