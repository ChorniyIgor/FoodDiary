import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  isLogged: false,
};

const AuthSlice = createSlice({
  name: "@@auth",
  initialState: initialState,
  reducers: {
    loginIn: (store, action) => {
      store.isLogged = true;
      store.userId = action.payload;
    },
    logout: (store) => {
      store.isLogged = false;
      store.userId = null;
    },
  },
});

export const { loginIn, logout } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;
