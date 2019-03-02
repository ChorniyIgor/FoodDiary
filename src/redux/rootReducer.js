import { combineReducers } from "redux";
import Auth from "./AuthPage/reducer";
import foodDiary from "./DiaryPage/reducers/foodDiaryReducer";
import foodCatalog from "./DiaryPage/reducers/foodCatalogReducer";
import modalWindows from "./Modal/modalWindowsReducer";

export default combineReducers({
  Auth,
  foodDiary,
  foodCatalog,
  modalWindows
});
