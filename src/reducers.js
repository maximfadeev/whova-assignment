import {
  FETCH_COMMENTS,
  ADD_COMMENT,
  TOGGLE_LANDSCAPE,
  UPDATE_COMMENT,
  TOGGLE_REPLY,
  POST_COMMENT_VALUE,
} from "./types";

const initialStateComments = {
  comments: [],
};

export const commentReducer = (state = initialStateComments, action = {}) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, comments: action.payload };
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.slice(0, action.payload.id),
          action.payload,
          ...state.comments.slice(action.payload.id + 1),
        ],
      };

    default:
      return state;
  }
};

const initialStateLandscape = {
  isLandscape: false,
};

export const toggleLandscapeReducer = (state = initialStateLandscape, action = {}) => {
  switch (action.type) {
    case TOGGLE_LANDSCAPE:
      return { isLandscape: !state.isLandscape };
    default:
      return state;
  }
};

const initialStateReply = {
  reply: { isReplying: false, commentId: null },
};

export const toggleReplyReducer = (state = initialStateReply, action = {}) => {
  switch (action.type) {
    case TOGGLE_REPLY:
      return { reply: action.payload };
    default:
      return state;
  }
};

const initialPostCommentValue = {
  value: "",
};

export const postCommentValueReducer = (state = initialPostCommentValue, action = {}) => {
  switch (action.type) {
    case POST_COMMENT_VALUE:
      return { value: action.payload };
    default:
      return state;
  }
};
