import { showMsg } from "../Modal/ModalSlice";
import { editCustomUserDish } from "./FoodCatalogSlice";
import Firebase from "../../Firebase";
import { userMessagesMap } from "../../userMessagesMap";

export function editUserDish(lastItemName, dishItem) {
  return async (dispatch, getState) => {
    const state = getState();
    const data = { ...dishItem };
    delete data.key;
    const formatedData = {
      [dishItem.dishName]: { ...dishItem },
    };
    try {
      await Firebase.editUserDish(
        formatedData,
        dishItem.key,
        state.Auth.userId
      );

      dispatch(editCustomUserDish(dishItem));
      const msg = userMessagesMap["SUCCESS"];
      dispatch(showMsg(msg.type, msg.msg));
    } catch (error) {
      const errorMsg =
        userMessagesMap[error.message] || userMessagesMap["FAILED_TO_FETCH"];
      dispatch(showMsg(errorMsg.type, errorMsg.msg));
    }
  };
}
