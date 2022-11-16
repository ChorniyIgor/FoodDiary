import { combineReducers } from "redux";
import foodDiary from "./DiaryPage/reducers/foodDiaryReducer";
import foodCatalog from "./DiaryPage/reducers/foodCatalogReducer";
import modalWindows from "./Modal/modalWindowsReducer";
import { AuthReducer } from "../store/Auth/AuthPageSlice";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  foodDiary,
  foodCatalog,
  modalWindows,
});

export default rootReducer;
