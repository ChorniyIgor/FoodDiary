import Firebase from "../../Firebase";
import { userMessagesMap } from "../../userMessagesMap";
import { showMsg } from "../Modal/ModalSlice";
import { calculateDishParam } from "./calculateDishParam";
import { editDish } from "./DiarySlice";

export const editDishInDiary = (dishInfo) => {
  return async (dispatch, getState) => {
    const state = getState();
    const dishProps = calculateDishParam({
      ...dishInfo,
      ...dishInfo.dishPropsPer100g,
    });
    try {
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
