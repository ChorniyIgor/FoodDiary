import {
  FOOD_SERCH,
  ADD_USER_DISH,
  DELETE_USER_DISH,
  EDIT_USER_DISH,
  LOAD_MAIN_FOOD_CATALOG,
  LOAD_USER_FOOD_CATALOG
} from "../actions/foodCatalogActionCreators";

const initialState = {
  dishes: {},
  userDishes: {},
  serchVal: [],
  userDishesIsLoading: false,
  mainDishesIsLoading: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOAD_MAIN_FOOD_CATALOG:
      return {
        ...state,
        dishes: actions.mainFoodCatalog,
        mainDishesIsLoading: true
      };
    case LOAD_USER_FOOD_CATALOG:
      return {
        ...state,
        userDishes: actions.userFoodCatalog,
        userDishesIsLoading: true
      };
    case FOOD_SERCH:
      return {
        ...state,
        serchVal: actions.serchDish
      };
    case ADD_USER_DISH:
      return {
        ...state,
        userDishes: { ...state.userDishes, ...actions.newDish }
      };
    case EDIT_USER_DISH:
      let userDishes = { ...state.userDishes };
      delete userDishes[actions.lastItemName];
      actions.dishItem[Object.keys(actions.dishItem)[0]].isUserDish = true;
      actions.dishItem[Object.keys(actions.dishItem)[0]].key = actions.dishItem.key;
      delete actions.dishItem.key;
      userDishes = { ...userDishes, ...actions.dishItem };
      return { ...state, userDishes };
    case DELETE_USER_DISH:
      const newUserDishes = { ...state.userDishes };
      delete newUserDishes[actions.dishName];
      return {
        ...state,
        userDishes: newUserDishes
      };
    default:
      return state;
  }
}
