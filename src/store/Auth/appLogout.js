import { logout } from "./AuthPageSlice";

export const appLogout = () => {
  localStorage.removeItem("logoutDate");
  localStorage.removeItem("localId");

  return (dispatch) => {
    dispatch(logout());
  };
};
