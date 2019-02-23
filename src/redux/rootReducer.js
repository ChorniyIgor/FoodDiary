import { combineReducers } from "redux";
import foodDiary from "./reducers/foodDiaryReducer";
import foodCatalog from "./reducers/foodCatalogReducer";
import modal from "../hoc/Modal/modalReducer";

export default combineReducers({
  foodDiary,
  foodCatalog,
  modal
});
