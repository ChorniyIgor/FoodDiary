import { combineReducers } from "redux";
import Auth from "./AuthPage/reducer";
import foodDiary from "./DiaryPage/reducers/foodDiaryReducer";
import foodCatalog from "./DiaryPage/reducers/foodCatalogReducer";
import modalWindows from "./Modal/modalWindowsReducer";

const rootReducer = combineReducers({
  Auth,
  foodDiary,
  foodCatalog,
  modalWindows,
});

export default rootReducer;
