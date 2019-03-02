export const OPEN_MODAL = "OPEN_MODAL";
export const OPEN_MODAL_WITH_PROPS = "OPEN_MODAL_WITH_PROPS";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SHOW_MSG = "SHOW_SUCCESS_MSG";
export const HIDE_MSG = "HIDE_SUCCESS_MSG";

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

export function showMsg(modalType, modalMsg) {
  return dispatch => {
    const timer = setTimeout(() => {
      dispatch(hideMsg());
    }, 3000);

    dispatch({
      type: SHOW_MSG,
      modalType,
      msg: modalMsg,
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
