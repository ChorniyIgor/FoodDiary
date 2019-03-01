import { combineReducers } from "redux";
import foodDiary from "./DiaryPage/reducers/foodDiaryReducer";
import foodCatalog from "./DiaryPage/reducers/foodCatalogReducer";
import modalWindows from "./DiaryPage/reducers/modalWindowsReducer";

export default combineReducers({
  foodDiary,
  foodCatalog,
  modalWindows
});
