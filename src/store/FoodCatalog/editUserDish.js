import { showMsg } from "../Modal/ModalSlice";
import { editCustomUserDish } from "./FoodCatalogSlice";
import Firebase from "../../Firebase";

export function editUserDish(lastItemName, dishItem) {
  return async (dispatch, getState) => {
    const state = getState();
    const data = { ...dishItem };
    delete data.key;
    try {
      await Firebase.editUserDish(data, dishItem.key, state.Auth.userId);
      dispatch(
        editCustomUserDish({
          lastItemName,
          dishItem,
        })
      );
      dispatch(showMsg("success", "Інформацію про страву успішно оновлено"));
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
}
