import { combineReducers } from "redux";
import foodDiary from "./reducers/foodDiaryReducer";
import foodCatalog from "./reducers/foodCatalogReducer";
import modalWindows from "./reducers/modalWindowsReducer";

export default combineReducers({
  foodDiary,
  foodCatalog,
  modalWindows
});
