import Firebase from "../../Firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showMsg } from "../../store/Modal/ModalSlice";
import { saveLoginData } from "./saveLoginData";
import { userMessagesMap } from "../../userMessagesMap";

export const signUp = createAsyncThunk(
  "@@auth/signUp",
  async ({ login, pass }, { dispatch }) => {
    try {
      const res = await Firebase.userAuth(login, pass, false);

      if (res.email === login) {
        const msg = userMessagesMap["SUCCESS_REGISTER"];
        dispatch(showMsg(msg.type, msg.msg));
        dispatch(saveLoginData(res));
      }
    } catch (error) {
      const errorMsg =
        userMessagesMap[error.message] || userMessagesMap["FAILED_TO_FETCH"];
      dispatch(showMsg(errorMsg.type, errorMsg.msg));
    }
  }
);
