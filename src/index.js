import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./store/Auth/AuthSlice";
import { DiaryReducer } from "./store/Diary/DiarySlice";
import { FoodCatalogReducer } from "./store/FoodCatalog/FoodCatalogSlice";
import { ModalReducer } from "./store/Modal/ModalSlice";

const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    foodDiary: DiaryReducer,
    foodCatalog: FoodCatalogReducer,
    modalWindows: ModalReducer,
  },
  devTools: true,
});

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App className={styles.body} />
    </BrowserRouter>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);

serviceWorker.unregister();
