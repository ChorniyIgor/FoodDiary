import React from "react";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import styles from "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import rootReduser from "./redux/rootReducer";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(reduxThunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App className={styles.body} />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
