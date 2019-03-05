import {
  ADD_DISH_TO_DIARY,
  ADD_DAY_TO_DIARY,
  DELETE_DISH_FROM_DIARY,
  EDIT_DISH_IN_DIARY
} from "../actions/foodDiaryActionCreators";
import { LOAD_USER_DIARY } from "../actions/actionTypes";

const initialState = [];

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOAD_USER_DIARY:
      return [...actions.userDiary];
    case ADD_DISH_TO_DIARY:
      const newState = [];
      state.forEach(el => {
        if (el.date !== actions.dateNow) {
          newState.push(el);
        } else {
          newState.push({
            ...el,
            dishes: [...el.dishes, actions.dishProps]
          });
        }
      });
      return newState;

    case EDIT_DISH_IN_DIARY:
      const newStateList = [...state];
      newStateList.forEach(dayItem => {
        if (dayItem.key === actions.dishInfo.keyOfList) {
          dayItem.dishes.forEach((dish, index) => {
            if (dish.key === actions.dishInfo.key) {
              dayItem.dishes[index] = actions.dishInfo;
            }
          });
        }
      });
      return newStateList;

    case DELETE_DISH_FROM_DIARY:
      const newDayState = [...state];
      newDayState.forEach(dayItem => {
        if (dayItem.key === actions.listKey) {
          dayItem.dishes.forEach((dish, index) => {
            if (dish.key === actions.dishKey) {
              dayItem.dishes.splice(index, 1);
            }
          });
        }
      });
      return newDayState;
    case ADD_DAY_TO_DIARY:
      return [
        ...state,
        {
          dishes: [],
          showDishesList: false,
          key: actions.key,
          date: actions.date
        }
      ];
    default:
      return state;
  }
}
