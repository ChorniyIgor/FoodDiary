import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReduser from "./store/rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

//const store = createStore(rootReduser, applyMiddleware(reduxThunk));
const store = configureStore({
  reducer: rootReduser,
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
