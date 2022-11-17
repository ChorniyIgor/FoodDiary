import { combineReducers } from "redux";
import foodCatalog from "./DiaryPage/reducers/foodCatalogReducer";
import { AuthReducer } from "../store/Auth/AuthSlice";
import { ModalReducer } from "../store/Modal/ModalSlice";
import { DiaryReducer } from "../store/Diary/DiarySlice";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  foodDiary: DiaryReducer,
  foodCatalog,
  modalWindows: ModalReducer,
});

export default rootReducer;
