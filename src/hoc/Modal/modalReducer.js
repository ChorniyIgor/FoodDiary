import { ADD_NEW_DISH_MODAL_CLOSE, ADD_NEW_DISH_MODAL_OPEN } from "./modalActions";

const initialState = {
  isOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_DISH_MODAL_CLOSE:
      return {
        ...state,
        isOpen: false
      };
    case ADD_NEW_DISH_MODAL_OPEN:
      return {
        ...state,
        isOpen: true
      };
    default:
      return state;
  }
}
