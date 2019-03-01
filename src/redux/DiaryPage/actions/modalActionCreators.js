import { OPEN_MODAL, CLOSE_MODAL, OPEN_MODAL_WITH_PROPS, SHOW_MSG, HIDE_MSG } from "./actionTypes";

export function openModal(modalName, props = {}) {
  return {
    type: OPEN_MODAL,
    modalName,
    props
  };
}

export function openModalWithProps(modalName, props = {}) {
  return {
    type: OPEN_MODAL_WITH_PROPS,
    modalName,
    props
  };
}

export function closeModal(modalName) {
  return {
    type: CLOSE_MODAL,
    modalName
  };
}

export function showMsg(modalType) {
  return dispatch => {
    const timer = setTimeout(() => {
      dispatch(hideMsg());
    }, 3000);

    dispatch({
      type: SHOW_MSG,
      modalType,
      timer
    });
  };
}

export function hideMsg() {
  return (dispatch, getState) => {
    const timer = getState().modalWindows.infoModal.timer;
    clearTimeout(timer);
    dispatch({
      type: HIDE_MSG
    });
  };
}
