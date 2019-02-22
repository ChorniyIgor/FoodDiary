import { FOODSERCH } from "./actionTypes";

export function FoodCatalogSerch(serchVal) {
  return (dispatch, getState) => {
    const state = getState();
    const foodCatalog = state.foodCatalog.dishes;

    const serchDish = foodCatalog.filter(dish => {
      return dish.toUpperCase().indexOf(serchVal.toUpperCase()) >= 0;
    });

    dispatch({
      type: FOODSERCH,
      serchDish
    });
  };
}
