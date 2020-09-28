import {
  FETCH_COMMENTS,
  ADD_COMMENT,
  TOGGLE_LANDSCAPE,
  UPDATE_COMMENT,
  TOGGLE_REPLY,
  POST_COMMENT_VALUE,
} from "./types";
import db from "./db";

export const getCommentsFromDb = () => {
  const comments = db.getComments();
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

export const toggleReply = (replyState) => {
  return {
    type: TOGGLE_REPLY,
    payload: replyState,
  };
};

export const changePostCommentValue = (value) => {
  return {
    type: POST_COMMENT_VALUE,
    payload: value,
  };
};
