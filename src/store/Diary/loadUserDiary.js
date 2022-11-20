import DataAdapter from "../../dataAdapter";
import { showMsg } from "../Modal/ModalSlice";
import { loadDiary } from "./DiarySlice";
import Firebase from "../../Firebase";
import { userMessagesMap } from "../../userMessagesMap";

export const loadUserDiary = () => {
  return async (dispatch, getState) => {
    const state = getState();
    if (!state.Auth.isLogged) return;
    try {
      const userDiary = await Firebase.getUserDiary(state.Auth.userId);

      const adaptedData = DataAdapter.userDiary(userDiary);
      dispatch(loadDiary(adaptedData));
    } catch (error) {
      const errorMsg =
        userMessagesMap[error.message] || userMessagesMap["FAILED_TO_FETCH"];
      dispatch(showMsg(errorMsg.type, errorMsg.msg));
    }
  };
};
