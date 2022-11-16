import { loginIn } from "./AuthPageSlice";
import { autoLogout } from "./autoLogout";

export const saveLoginData = (data) => {
  return (dispatch) => {
    const logoutDate = new Date().getTime() + data.expiresIn * 1000;
    localStorage.setItem("logoutDate", logoutDate);
    localStorage.setItem("localId", data.localId);

    dispatch(autoLogout(data.expiresIn));
    dispatch(loginIn(data.localId));
  };
};
