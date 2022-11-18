import { appLogout } from "./appLogout";

export const autoLogout = (time) => (dispatch) => {
  setTimeout(() => {
    dispatch(appLogout());
  }, time * 10000);
};
