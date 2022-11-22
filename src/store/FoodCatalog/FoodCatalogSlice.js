import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const userDishesAdapter = createEntityAdapter({
  selectId: (dish) => dish.key,
});

const initialState = {
  dishes: {},
  userDishes: userDishesAdapter.getInitialState(),
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
      userDishesAdapter.setAll(state.userDishes, action.payload);
      state.userDishesIsLoading = true;
    },
    setCatalogSearchString: (state, action) => {
      state.searchVal = action.payload;
    },

    addCustomUserDish: (state, action) => {
      userDishesAdapter.addOne(state.userDishes, action.payload);
    },
    editCustomUserDish: (state, action) => {
      userDishesAdapter.updateOne(state.userDishes, {
        id: action.payload.key,
        changes: {
          ...action.payload,
        },
      });
    },
    deleteCustomUserDish: (state, action) => {
      userDishesAdapter.removeOne(state.userDishes, action.payload);
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

export const userDishesSelector = userDishesAdapter.getSelectors(
  (state) => state.foodCatalog.userDishes
);
