import { getFullFoodCatalog } from "./FoodCatalogSlice";

export const getSearchVal = (state) => state.foodCatalog.searchVal;

export const getAllDishesFromCataolog = (state) => getFullFoodCatalog(state);

export const getFiltratedDishesFromCatalog = (state, filter) => {
  console.log("filter", filter);
  if (filter === "") return getAllDishesFromCataolog(state);

  return getAllDishesFromCataolog(state).filter((dish) => {
    return dish.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0;
  });
};
//   state.foodCatalog.dishes.filter((dish) => {
//     return dish.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0;
//   });
