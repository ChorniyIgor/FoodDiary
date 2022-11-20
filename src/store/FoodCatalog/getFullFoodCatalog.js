export const getFullFoodCatalog = (state) => {
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
};
