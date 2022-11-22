import { showMsg } from "../Modal/ModalSlice";
import { deleteCustomUserDish } from "./FoodCatalogSlice";
import Firebase from "../../Firebase";
import { userMessagesMap } from "../../userMessagesMap";

export const deleteUserDishItem = (dishItem) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      await Firebase.deleteUserDish(dishItem.key, state.Auth.userId);
      dispatch(deleteCustomUserDish(dishItem.key));
      const msg = userMessagesMap["SUCCESS"];
      dispatch(showMsg(msg.type, msg.msg));
    } catch (error) {
      const errorMsg =
        userMessagesMap[error.message] || userMessagesMap["FAILED_TO_FETCH"];
      dispatch(showMsg(errorMsg.type, errorMsg.msg));
    }
  };
};
