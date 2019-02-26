import Firebase from "../../Firebase";
import userDiaryDataAdapter from "../../dataAdapter";
import { LOAD_USER_DIARY } from "./actionTypes";
export const ADD_DISH_TO_DIARY = "ADD_DISH_TO_DIARY";
export const ADD_DAY_TO_DIARY = "ADD_DAY_TO_DIARY";

export function loadUserDiary() {
  return async dispatch => {
    const userDiary = await Firebase.getUserDiary();
    const adaptedData = userDiaryDataAdapter(userDiary);
    dispatch({
      type: LOAD_USER_DIARY,
      userDiary: adaptedData
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

function getDayElementByDate(diary, date) {
  return (
    diary.filter(el => {
      return el.date === date;
    })[0] || []
  );
}

export function addDishToDiary(dishProps) {
  return async (dispatch, getState) => {
    const foodDiary = getState().foodDiary;
    const date = new Date().toDateString();
    const dayElement = getDayElementByDate(foodDiary, date);
    let dayKey = "";
    if (Array.isArray(dayElement)) {
      const res = await Firebase.sendNewDay(date);
      dayKey = res.name;
      dispatch(addDayToDiary(date, dayKey));
    } else {
      console.log("dayElement", dayElement);
      dayKey = dayElement.key;
    }
    const calcProps = calculateDishParam(dishProps);
    console.log("dayKey", dayKey);
    const dishKey = await Firebase.sendNewDishToDiary(calcProps, dayKey, date);
    dispatch({
      type: ADD_DISH_TO_DIARY,
      day: dayElement,
      dishProps: { ...calculateDishParam(dishProps), key: dishKey.name },
      dateNow: new Date().toDateString()
    });
  };
}

export function addDayToDiary(date, key) {
  return {
    type: ADD_DAY_TO_DIARY,
    date,
    key
  };
}
