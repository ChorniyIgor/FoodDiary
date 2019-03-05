import Firebase from "../../../Firebase";
import DataAdapter from "../../../DataAdapter";
import { showMsg } from "../../Modal/modalActionCreators";
import { LOAD_USER_DIARY } from "./actionTypes";
export const ADD_DISH_TO_DIARY = "ADD_DISH_TO_DIARY";
export const ADD_DAY_TO_DIARY = "ADD_DAY_TO_DIARY";
export const EDIT_DISH_IN_DIARY = "EDIT_DISH_IN_DIARY";
export const DELETE_DISH_FROM_DIARY = "DELETE_DISH_FROM_DIARY";

export function loadUserDiary() {
  return async (dispatch, getState) => {
    const state = getState();
    const userDiary = await Firebase.getUserDiary(state.Auth.userId);
    const adaptedData = DataAdapter.userDiary(userDiary);
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
    kkal: (parseFloat(dishProps.kkal) * dishWeight).toFixed(2),
    proteins: (parseFloat(dishProps.proteins) * dishWeight).toFixed(2),
    fats: (parseFloat(dishProps.fats) * dishWeight).toFixed(2),
    carbohydrates: (parseFloat(dishProps.carbohydrates) * dishWeight).toFixed(2)
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
    try {
      const state = getState();
      const date = new Date().toDateString();
      const dayElement = getDayElementByDate(state.foodDiary, date);
      let dayKey = "";
      if (Array.isArray(dayElement)) {
        const res = await Firebase.sendNewDay(date, state.Auth.userId);
        dayKey = res.name;
        dispatch(addDayToDiary(date, dayKey));
      } else {
        dayKey = dayElement.key;
      }
      const calcProps = calculateDishParam(dishProps);
      const dishKey = await Firebase.sendNewDishToDiary(calcProps, dayKey, date, state.Auth.userId);
      dispatch({
        type: ADD_DISH_TO_DIARY,
        day: dayElement,
        dishProps: { ...calcProps, key: dishKey.name },
        dateNow: new Date().toDateString()
      });
      dispatch(showMsg("success", "Запис успішно додано у ваш щоденник"));
    } catch {
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
}

export function editDishInDiary(dishInfo) {
  return async (dispatch, getState) => {
    const state = getState();
    const dishProps = calculateDishParam({ ...dishInfo, ...dishInfo.dishPropsPer100g });
    try {
      const res = await Firebase.editDishInDiary(
        dishProps,
        dishInfo.key,
        dishInfo.keyOfList,
        dishInfo.dateOfList,
        state.Auth.userId
      );
      if (res === 200) {
        dispatch({
          type: EDIT_DISH_IN_DIARY,
          dishInfo: {
            ...dishInfo,
            ...calculateDishParam({ ...dishInfo, ...dishInfo.dishPropsPer100g })
          }
        });
        dispatch(showMsg("success", "Запис у щоденнику успішно оновлено"));
      }
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
}

export function deleteDishFromDiary(props) {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const res = await Firebase.deleteDishFromDiary(
        props.dishKey,
        props.keyOfList,
        props.dateOfList,
        state.Auth.userId
      );
      if (res === 200) {
        dispatch({
          type: DELETE_DISH_FROM_DIARY,
          listKey: props.keyOfList,
          dishKey: props.dishKey
        });
        dispatch(showMsg("success", "Запис успішно видалено зі щоденника"));
      }
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
}

export function addDayToDiary(date, key) {
  return {
    type: ADD_DAY_TO_DIARY,
    date,
    key
  };
}
