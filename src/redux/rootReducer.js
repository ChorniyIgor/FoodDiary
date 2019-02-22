import { combineReducers } from "redux";
import foodDiary from "./reducers/foodDiaryReducer";
import foodCatalog from "./reducers/foodCatalogReducer";

export default combineReducers({
  foodDiary,
  foodCatalog
});
