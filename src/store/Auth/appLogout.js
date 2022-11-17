import { logout } from "./AuthSlice";

export const appLogout = () => {
  localStorage.removeItem("logoutDate");
  localStorage.removeItem("localId");

  return (dispatch) => {
    dispatch(logout());
  };
};
