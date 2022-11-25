import Firebase from "../../Firebase";
import { userMessagesMap } from "../../userMessagesMap";
import { showMsg } from "../Modal/ModalSlice";
import { calculateDishParam } from "./calculateDishParam";
import { DiaryDaysSelector, editDish } from "./DiarySlice";

export const editDishInDiary = (dishInfo) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const dishes = [
        ...DiaryDaysSelector.selectById(state, dishInfo.keyOfList).dishes,
      ];
      let dishIndex = dishes.findIndex((dish) => dish.key === dishInfo.key);

      const dishProps = calculateDishParam({
        ...dishInfo,
        ...dishInfo.dishPropsPer100g,
      });

      dishes[dishIndex] = {
        ...dishes[dishIndex],
        ...dishProps,
      };

      await Firebase.editDishInDiary(
        dishProps,
        dishInfo.key,
        dishInfo.keyOfList,
        dishInfo.dateOfList,
        state.Auth.userId
      );
      dispatch(
        editDish({
          dishInfo,
          modificatedDishList: dishes,
          ...calculateDishParam({ ...dishInfo, ...dishInfo.dishPropsPer100g }),
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
