import { loginIn } from "./AuthSlice";
import { autoLogout } from "./autoLogout";

export const autoLogin = () => {
  return (dispatch) => {
    const logoutDate = localStorage.getItem("logoutDate");
    const localId = localStorage.getItem("localId");

    if (new Date().getTime() < logoutDate) {
      if (!!localId) {
        dispatch(autoLogout((logoutDate - new Date().getTime()) / 1000));
        dispatch(loginIn(localId));
      }
    }
  };
};
