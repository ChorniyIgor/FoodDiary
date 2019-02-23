export const ADD_DISH_TO_DIARY = "ADD_DISH_TO_DIARY";

export function addDishToDiary(dishName) {
  return {
    type: ADD_DISH_TO_DIARY,
    dishName
  };
}
