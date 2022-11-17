import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AddDishModal: {
    isOpen: false,
  },
  AddDishToDiaryBoardModal: {
    isOpen: false,
    props: {
      dishName: "",
      dishWeight: "",
    },
  },
  infoModal: {
    isOpen: false,
    modalType: "",
    timer: null,
  },
};

const modalSlice = createSlice({
  name: "@@modal",
  initialState: initialState,
  reducers: {
    showInfoMsg: (state, action) => {
      state.infoModal = {
        isOpen: true,
        modalType: action.payload.modalType,
        modalMsg: action.payload.msg,
        timer: action.payload.timer,
      };
    },
    hideInfoMsg: (state) => {
      state.infoModal = {
        isOpen: false,
        modalType: "",
        timer: null,
      };
    },
    openModal: (state, action) => {
      state[action.payload] = {
        isOpen: true,
      };
    },
    openModalWithProps: (state, action) => {
      state[action.payload.modal] = {
        isOpen: true,
        props: action.payload.info,
      };
    },
    closeModal: (state, action) => {
      state[action.payload] = {
        isOpen: false,
      };
    },
  },
});

export const ModalReducer = modalSlice.reducer;
export const {
  showInfoMsg,
  hideInfoMsg,
  openModal,
  openModalWithProps,
  closeModal,
} = modalSlice.actions;

export const showMsg = (modalType, modalMsg) => {
  return (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(hideMsg());
    }, 3000);

    dispatch(showInfoMsg({ modalType, msg: modalMsg, timer }));
  };
};

export function hideMsg() {
  return (dispatch, getState) => {
    const timer = getState().modalWindows.infoModal.timer;
    clearTimeout(timer);
    dispatch(hideInfoMsg());
  };
}
