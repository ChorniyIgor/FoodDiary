import Firebase from "../../Firebase";
import { userMessagesMap } from "../../userMessagesMap";
import { showMsg } from "../Modal/ModalSlice";
import { calculateDishParam } from "./calculateDishParam";
import { addDayToDiary, addDish } from "./DiarySlice";

const getDayElementByDate = (diary, date) => {
  return (
    diary.filter((el) => {
      return el.date === date;
    })[0] || []
  );
};

export const addDishToDiary = (dishProps) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const date = new Date().toDateString();
      const dayElement = getDayElementByDate(state.foodDiary.diary, date);
      let dayKey = "";
      if (Array.isArray(dayElement)) {
        const res = await Firebase.sendNewDay(date, state.Auth.userId);
        dayKey = res.name;
        dispatch(addDayToDiary({ date, dayKey }));
      } else {
        dayKey = dayElement.key;
      }
      const calcProps = calculateDishParam(dishProps);
      const dishKey = await Firebase.sendNewDishToDiary(
        calcProps,
        dayKey,
        date,
        state.Auth.userId
      );
      dispatch(
        addDish({
          day: dayElement,
          dishProps: { ...calcProps, key: dishKey.name },
          dateNow: new Date().toDateString(),
        })
      );
      const msg = userMessagesMap["SUCCESS"];
      dispatch(showMsg(msg.type, msg.msg));
    } catch (error) {
      const errorMsg =
        userMessagesMap[error.message] || userMessagesMap["FAILED_TO_FETCH"];
      dispatch(showMsg(errorMsg.type, errorMsg.msg));
    }
  };
};
