import Firebase from "../../Firebase";
import { userMessagesMap } from "../../userMessagesMap";
import { showMsg } from "../Modal/ModalSlice";
import { deleteDish } from "./DiarySlice";

export const deleteDishFromDiary = (props) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      await Firebase.deleteDishFromDiary(
        props.dishKey,
        props.keyOfList,
        props.dateOfList,
        state.Auth.userId
      );
      dispatch(
        deleteDish({
          listKey: props.keyOfList,
          dishKey: props.dishKey,
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
