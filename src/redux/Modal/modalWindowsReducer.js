import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL_WITH_PROPS,
  SHOW_MSG,
  HIDE_MSG
} from "./modalActionCreators";

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
  },
  infoModal: {
    isOpen: false,
    modalType: "",
    timer: null
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

    case SHOW_MSG:
      return {
        ...state,
        infoModal: {
          isOpen: true,
          modalType: actions.modalType,
          modalMsg: actions.msg,
          timer: actions.timer
        }
      };
    case HIDE_MSG:
      return {
        ...state,
        infoModal: {
          isOpen: false,
          modalType: "",
          timer: null
        }
      };
    default:
      return state;
  }
}
