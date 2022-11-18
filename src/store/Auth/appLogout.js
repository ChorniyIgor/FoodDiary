import { logout } from "./AuthSlice";

export const appLogout = () => (dispatch) => {
  localStorage.removeItem("logoutDate");
  localStorage.removeItem("localId");

  dispatch(logout());
};
