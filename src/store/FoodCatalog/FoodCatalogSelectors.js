import { getFullFoodCatalog } from "./getFullFoodCatalog";

export const getSearchVal = (state) => state.foodCatalog.searchVal;

export const getAllDishesFromCataolog = (state) => getFullFoodCatalog(state);

export const getFiltratedDishesFromCatalog = (state, filter) => {
  if (filter === "") return getAllDishesFromCataolog(state);

  return getAllDishesFromCataolog(state).filter((dish) => {
    return dish.dishName.toUpperCase().indexOf(filter.toUpperCase()) >= 0;
  });
};
