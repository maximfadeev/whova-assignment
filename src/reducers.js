import { FETCH_COMMENTS, ADD_COMMENT, TOGGLE_LANDSCAPE, SET_LIKES, TOGGLE_REPLY } from "./types";

const initialStateComments = {
  comments: [],
};

export const commentReducer = (state = initialStateComments, action = {}) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, comments: action.payload };
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };

    case SET_LIKES: // this can definitely be better
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
      return { ...state, isLandscape: !state.isLandscape };
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
      return { ...state, reply: action.payload };
    default:
      return state;
  }
};
