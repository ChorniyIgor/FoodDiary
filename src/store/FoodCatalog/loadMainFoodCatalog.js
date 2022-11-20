import DataAdapter from "../../dataAdapter";
import Firebase from "../../Firebase";
import { showMsg } from "../Modal/ModalSlice";
import { loadMainCatalog } from "./FoodCatalogSlice";

export const loadMainFoodCatalog = () => {
  return async (dispatch, getState) => {
    const state = getState();
    if (!state.Auth.isLogged) return;
    try {
      const mainFoodCatalog = await Firebase.getMainFoodCatalog();
      dispatch(loadMainCatalog(DataAdapter.dishes(mainFoodCatalog)));
    } catch (e) {
      console.log("loadUserFoodCatalog error", e);
      dispatch(
        showMsg("error", "Щось пішло не так, спробуйте оновити сторінку")
      );
    }
  };
};
