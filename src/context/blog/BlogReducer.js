import {
  LIST_POSTS,
  POSTS_ERROR,
  DELETE_POST,
  EDITION_MODE,
  CLOSE_POSTS,
  SET_CURRENT,
  UPDATE_POST,
  ADD_POST,
  POST_NEW
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LIST_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        newP: false
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(posts => posts.id !== action.payload),
        loading: false
      };
    case EDITION_MODE:
      return {
        ...state,
        editing: true,
        current: action.payload
      };
    case CLOSE_POSTS:
      return {
        ...state,
        editing: false,
        newP: false,
        current: null
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id ? action.payload : post
        ),
        loading: false,
        current: null,
        editing: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case POST_NEW:
      return {
        ...state,
        newP: true,
        current: null
      };

    default:
      return state;
  }
};
