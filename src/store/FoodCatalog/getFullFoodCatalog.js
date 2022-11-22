import { userDishesSelector } from "./FoodCatalogSlice";

export const getFullFoodCatalog = (state) => {
  function getDishesWithKey(data) {
    const userDishes = [];
    for (let dish in data) {
      userDishes.push({
        key: dish,
        ...data[dish],
      });
    }

    return userDishes;
  }

  return [
    ...userDishesSelector.selectAll(state),
    ...getDishesWithKey(state.foodCatalog.dishes),
  ];
  // return [];
};
