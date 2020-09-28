import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import {
  commentReducer,
  toggleLandscapeReducer,
  toggleReplyReducer,
  postCommentValueReducer,
} from "./redux/reducers";

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

serviceWorker.unregister();
