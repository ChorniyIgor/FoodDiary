import { FOOD_SERCH, ADD_USER_DISH } from "./actionTypes";

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
