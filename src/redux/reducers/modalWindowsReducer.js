import { OPEN_MODAL, CLOSE_MODAL, OPEN_MODAL_WITH_PROPS } from "../actions/actionTypes";

const initialState = {
  AddDishModal: {
    isOpen: false
  },
  AddDishToDiaryBoardModal: {
    isOpen: false,
    props: {
      dishName: "",
      dishWeight: ""
    }
  }
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case OPEN_MODAL:
      return {
        ...state,
        [actions.modalName]: {
          isOpen: true
        }
      };
    case OPEN_MODAL_WITH_PROPS:
      return {
        ...state,
        [actions.modalName]: {
          isOpen: true,
          props: actions.props
        }
      };
    case CLOSE_MODAL:
      return {
        ...state,
        [actions.modalName]: {
          isOpen: false
        }
      };
    default:
      return state;
  }
}
