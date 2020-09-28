import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import {
  commentReducer,
  toggleLandscapeReducer,
  toggleReplyReducer,
  postCommentValueReducer,
} from "./reducers";

// initialise db if it has not been initialised
if (localStorage.getItem("comments") == null) {
  localStorage.setItem("comments", "[]");
}

const rootReducer = combineReducers({
  commentReducer,
  toggleLandscapeReducer,
  toggleReplyReducer,
  postCommentValueReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
