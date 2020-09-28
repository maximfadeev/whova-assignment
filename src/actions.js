import {
  FETCH_COMMENTS,
  ADD_COMMENT,
  TOGGLE_LANDSCAPE,
  UPDATE_COMMENT,
  TOGGLE_REPLY,
} from "./types";
import db from "./db";

// find a better place and name for these
// let getComments = function (key) {
//   let comments = localStorage.getItem(key);
//   if (comments === null) {
//     return [];
//   } else {
//     return JSON.parse(localStorage.getItem(key));
//   }
// };

// let setComments = function (key, val) {
//   localStorage.setItem(key, JSON.stringify(val));
// };

export const getCommentsFromDb = () => {
  const comments = db.getComments();
  // let comments = JSON.parse(localStorage.getItem("comments")) || [];
  return { type: FETCH_COMMENTS, payload: comments };
};

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  };
};

export const updateComment = (comment) => {
  return {
    type: UPDATE_COMMENT,
    payload: comment,
  };
};

export const toggleLandscape = () => {
  return {
    type: TOGGLE_LANDSCAPE,
  };
};

// export const setReplyIsLiked = (comment) => {
//   return {
//     type: SET_LIKES,
//     payload: comment,
//   };
// };

export const toggleReply = (replyState) => {
  return {
    type: TOGGLE_REPLY,
    payload: replyState,
  };
};
