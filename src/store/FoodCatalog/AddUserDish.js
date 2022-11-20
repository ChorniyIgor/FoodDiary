import { showMsg } from "../Modal/ModalSlice";
import Firebase from "../../Firebase";
import { addCustomUserDish } from "./FoodCatalogSlice";

export const AddUserDish = (newDish) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const key = await Firebase.sendNewDish(newDish, state.Auth.userId);
      const dishName = Object.keys(newDish)[0];
      dispatch(
        addCustomUserDish({
          name: dishName,
          data: { ...newDish[dishName], key: key.name, isUserDish: true },
        })
      );
      dispatch(showMsg("success", "Страву успішно додано до вашого каталогу"));
    } catch (error) {
      console.log(error);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
};
