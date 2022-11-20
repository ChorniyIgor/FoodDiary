import { showMsg } from "../Modal/ModalSlice";
import { deleteCustomUserDish } from "./FoodCatalogSlice";
import Firebase from "../../Firebase";

export const deleteUserDishItem = (dishItem) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      await Firebase.deleteUserDish(dishItem.dishProps.key, state.Auth.userId);
      dispatch(deleteCustomUserDish(dishItem.name));
      dispatch(showMsg("success", "Страву видалено"));
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
};
