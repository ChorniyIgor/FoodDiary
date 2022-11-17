import Firebase from "../../Firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showMsg } from "../../store/Modal/ModalSlice";
import { saveLoginData } from "./saveLoginData";

export const signUp = createAsyncThunk(
  "@@auth/SIGN_UP",
  async ({ login, pass }, { dispatch }) => {
    try {
      console.log(login, pass);
      const res = await Firebase.userAuth(login, pass, false);
      console.log(res);
      switch (res) {
        case `EMAIL_EXISTS`:
          dispatch(
            showMsg(
              "error",
              `Ввведений вами e-mail вже зареєстрований у системі`
            )
          );
          break;
        case `INVALID_EMAIL`:
          dispatch(showMsg("error", `Ввведений вами e-mail некоректний`));
          break;
        case `ADMIN_ONLY_OPERATION`:
          dispatch(showMsg("error", `Помилка сервера`));
          break;

        case `MISSING_PASSWORD`:
          dispatch(showMsg("error", `Введено некоректний пароль.`));
          break;
        case `WEAK_PASSWORD : Password should be at least 6 characters`:
          dispatch(
            showMsg(
              "error",
              `Введено некоректний пароль. Мінімальна довжина 6 символів`
            )
          );
          break;
        default:
          dispatch(showMsg("success", `Реєстрація успішна`));
          dispatch(saveLoginData(res));
      }
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", `Щось пішло не так. Спробуйте ще раз`));
    }
  }
);
