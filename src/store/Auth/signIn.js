import Firebase from "../../Firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showMsg } from "../../store/Modal/ModalSlice";
import { saveLoginData } from "./saveLoginData";

export const signIn = createAsyncThunk(
  "@@auth/SIGN_IN",
  async ({ login, pass }, { dispatch }) => {
    try {
      console.log(login, pass);
      const res = await Firebase.userAuth(login, pass, true);

      switch (res) {
        case "EMAIL_NOT_FOUND":
          dispatch(showMsg("error", `E-mail введено не вірно`));
          break;
        case "INVALID_PASSWORD":
          dispatch(showMsg("error", `Пароль введено не вірно`));
          break;
        case "MISSING_EMAIL":
          dispatch(showMsg("error", `Емейл не введено`));
          break;
        case "MISSING_PASSWORD":
          dispatch(showMsg("error", `Пароль не введено`));
          break;
        default:
          dispatch(showMsg("success", `Ви успішно авторизувались`));
          dispatch(saveLoginData(res));
      }
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", `Щось пішло не так. Спробуйте ще раз`));
    }
  }
);
