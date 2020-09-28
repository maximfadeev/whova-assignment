import { createStore } from "redux";
import { getCommentsFromDb, setCommentText } from "./reducers";
import { combineReducers } from "redux";

const initialState = {};

const rootReducer = combineReducers({
  comments: getCommentsFromDb,
  commentText: setCommentText,
});

const store = createStore(rootReducer, initialState);

export default store;
