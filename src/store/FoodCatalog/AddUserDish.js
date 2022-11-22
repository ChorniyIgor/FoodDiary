import { showMsg } from "../Modal/ModalSlice";
import Firebase from "../../Firebase";
import { addCustomUserDish } from "./FoodCatalogSlice";
import { userMessagesMap } from "../../userMessagesMap";

export const AddUserDish = (newDish) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const formatedData = {
        [newDish.dishName]: { ...newDish },
      };
      const key = await Firebase.sendNewDish(formatedData, state.Auth.userId);
      dispatch(addCustomUserDish({ ...newDish, key: key.name }));
      const msg = userMessagesMap["SUCCESS"];
      dispatch(showMsg(msg.type, msg.msg));
    } catch (error) {
      const errorMsg =
        userMessagesMap[error.message] || userMessagesMap["FAILED_TO_FETCH"];
      dispatch(showMsg(errorMsg.type, errorMsg.msg));
    }
  };
};
