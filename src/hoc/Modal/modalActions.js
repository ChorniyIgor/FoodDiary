export const ADD_NEW_DISH_MODAL_CLOSE = "ADD_NEW_DISH_MODAL_CLOSE";
export const ADD_NEW_DISH_MODAL_OPEN = "ADD_NEW_DISH_MODAL_OPEN";
export const ADD_NEW_DISH_MODAL_CLOSE = "ADD_NEW_DISH_MODAL_CLOSE";
export const ADD_DISH_TO_DIARY_MODAL_OPEN = "ADD_DISH_TO_DIARY_MODAL_OPEN";
export const ADD_DISH_TO_DIARY_MODAL_CLOSE = "ADD_DISH_TO_DIARY_MODAL_CLOSE";

export function closeAddNewDishModal() {
  return {
    type: ADD_NEW_DISH_MODAL_CLOSE
  };
}

export function openAddNewDishModal() {
  return {
    type: ADD_NEW_DISH_MODAL_OPEN
  };
}

export function closeAddDishToDiaryModal() {
  return {
    type: ADD_DISH_TO_DIARY_MODAL_CLOSE
  };
}

export function openAddDishToDiaryModal() {
  return {
    type: ADD_DISH_TO_DIARY_MODAL_OPEN
  };
}
