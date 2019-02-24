import { OPEN_MODAL, CLOSE_MODAL, OPEN_MODAL_WITH_PROPS } from "./actionTypes";

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
