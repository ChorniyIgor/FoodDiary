import Firebase from "../../Firebase";
import { showMsg } from "../Modal/modalActionCreators";
export const LOGIN_IN = `LOGIN_IN`;
export const LOGOUT = `LOGOUT`;

export function signUp(login, pass) {
  return async dispatch => {
    try {
      const res = await Firebase.userAuth(login, pass, false);
      switch (res) {
        case `EMAIL_EXISTS`:
          dispatch(showMsg("error", `Ввведений вами e-mail вже зареєстрований у системі`));
          break;
        case `INVALID_EMAIL`:
          dispatch(showMsg("error", `Ввведений вами e-mail некоректний`));
          break;
        case `MISSING_PASSWORD`:
          dispatch(showMsg("error", `Введено некоректний пароль.`));
          break;
        case `WEAK_PASSWORD : Password should be at least 6 characters`:
          dispatch(showMsg("error", `Введено некоректний пароль. Мінімальна довжина 6 символів`));
          break;
        default:
          dispatch(showMsg("success", `Реєстрація успішна`));
          dispatch(loginIn(res));
      }
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", `Щось пішло не так. Спробуйте ще раз`));
    }
  };
}

export function signIn(login, pass) {
  return async dispatch => {
    try {
      const res = await Firebase.userAuth(login, pass, true);

      switch (res) {
        case "EMAIL_NOT_FOUND":
          dispatch(showMsg("error", `E-mail введено не вірно`));
          break;
        case "INVALID_PASSWORD":
          dispatch(showMsg("error", `Пароль введено не вірно`));
          break;
        default:
          dispatch(showMsg("success", `Ви успішно авторизувались`));
          dispatch(loginIn(res));
      }
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", `Щось пішло не так. Спробуйте ще раз`));
    }
  };
}

export function loginIn(data) {
  return dispatch => {
    const logoutDate = new Date().getTime() + data.expiresIn * 1000;
    localStorage.setItem("logoutDate", logoutDate);
    localStorage.setItem("localId", data.localId);

    dispatch(autoLogout(data.expiresIn));
    dispatch({
      type: LOGIN_IN,
      userId: data.localId
    });
  };
}

export function autoLogin() {
  return dispatch => {
    const logoutDate = localStorage.getItem("logoutDate");
    const localId = localStorage.getItem("localId");

    if (new Date().getTime() < logoutDate) {
      if (!!localId) {
        dispatch(autoLogout((logoutDate - new Date().getTime()) / 1000));
        dispatch({
          type: LOGIN_IN,
          userId: localId
        });
      }
    }
  };
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("logoutDate");
  localStorage.removeItem("localId");

  return {
    type: LOGOUT
  };
}
