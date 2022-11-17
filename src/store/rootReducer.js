import { combineReducers } from "redux";
import { AuthReducer } from "./Auth/AuthSlice";
import { ModalReducer } from "./Modal/ModalSlice";
import { DiaryReducer } from "./Diary/DiarySlice";
import { FoodCatalogReducer } from "./FoodCatalog/FoodCatalogSlice";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  foodDiary: DiaryReducer,
  foodCatalog: FoodCatalogReducer,
  modalWindows: ModalReducer,
});

export default rootReducer;
