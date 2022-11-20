import DataAdapter from "../../dataAdapter";
import Firebase from "../../Firebase";
import { showMsg } from "../Modal/ModalSlice";
import { loadUserCatalog } from "./FoodCatalogSlice";

export const loadUserFoodCatalog = () => {
  return async (dispatch, getState) => {
    const state = getState();

    if (!state.Auth.isLogged) return;

    try {
      const userFoodCatalog = await Firebase.getUserFoodCatalog(
        state.Auth.userId
      );
      dispatch(loadUserCatalog(DataAdapter.dishes(userFoodCatalog, true)));

      return userFoodCatalog;
    } catch (e) {
      console.log("loadUserFoodCatalog error", e);
      dispatch(
        showMsg("error", "Щось пішло не так, спробуйте оновити сторінку")
      );
    }
  };
};
