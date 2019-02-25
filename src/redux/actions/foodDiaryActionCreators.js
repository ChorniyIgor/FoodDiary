import Firebase from "../../Firebase";
import { LOAD_USER_DIARY } from "./actionTypes";
export const ADD_DISH_TO_DIARY = "ADD_DISH_TO_DIARY";
export const ADD_DAY_TO_DIARY = "ADD_DAY_TO_DIARY";

export function loadUserDiary() {
  return async dispatch => {
    const userDiary = await Firebase.getUserDiary();
    dispatch({
      type: LOAD_USER_DIARY,
      userDiary
    });
  };
}

function calculateDishParam(dishProps) {
  const dishWeight = dishProps.dishWeight / 100;
  const newdishProps = {
    dishName: dishProps.dishName,

    dishWeight: dishProps.dishWeight.toFixed(2),
    kkal: (dishProps.kkal * dishWeight).toFixed(2),
    proteins: (dishProps.proteins * dishWeight).toFixed(2),
    fats: (dishProps.fats * dishWeight).toFixed(2),
    carbohydrates: (dishProps.carbohydrates * dishWeight).toFixed(2)
  };
  return newdishProps;
}

export function addDishToDiary(dishProps) {
  return (dispatch, getState) => {
    const foodDiary = getState().foodDiary;
    const date = new Date().toDateString();

    if (!foodDiary[date]) {
      dispatch(addDayToDiary(date));
    }

    dispatch({
      type: ADD_DISH_TO_DIARY,
      dishProps: calculateDishParam(dishProps),
      dateNow: new Date().toDateString()
    });
  };
}

export function addDayToDiary(date) {
  return {
    type: ADD_DAY_TO_DIARY,
    date
  };
}
