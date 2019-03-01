import {
  FOOD_SERCH,
  ADD_USER_DISH,
  LOAD_MAIN_FOOD_CATALOG,
  LOAD_USER_FOOD_CATALOG
} from "../actions/actionTypes";

const initialState = {
  dishes: {
    /* Арахіс: {
      kkal: 100,
      proteins: 18,
      fats: 10,
      carbohydrates: 40
    },
    Борщ: {
      kkal: 1100,
      proteins: 218,
      fats: 210,
      carbohydrates: 240
    },
    Кукурудза: {
      kkal: 100,
      proteins: 18,
      fats: 10,
      carbohydrates: 40
    },
    Каша: {
      kkal: 100,
      proteins: 18,
      fats: 10,
      carbohydrates: 40
    }*/
  },
  userDishes: {},
  serchVal: []
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOAD_MAIN_FOOD_CATALOG:
      return {
        ...state,
        dishes: actions.mainFoodCatalog
      };
    case LOAD_USER_FOOD_CATALOG:
      return {
        ...state,
        userDishes: actions.userFoodCatalog
      };
    case FOOD_SERCH:
      return {
        ...state,
        serchVal: actions.serchDish
      };
    case ADD_USER_DISH:
      console.log(actions.newDish);
      return {
        ...state,
        userDishes: { ...state.userDishes, ...actions.newDish }
      };
    default:
      return state;
  }
}
