import React, { useReducer } from "react";
import axios from "axios";
import BlogContext from "./BlogContext";
import BlogReducer from "./BlogReducer";
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

const BlogState = props => {
  const initialState = {
    loading: true,
    posts: [],
    error: null,
    editing: false,
    current: null,
    newP: false
  };

  const [state, dispatch] = useReducer(BlogReducer, initialState);

  // List Posts
  const listPosts = async () => {
    try {
      const res = await axios.get("/api/blog");

      dispatch({
        type: LIST_POSTS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: POSTS_ERROR
      });
    }
  };

  // Delete Post
  const deletePost = async id => {
    try {
      await axios.delete(`/api/blog/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Add Post
  const addPost = async post => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/blog", post, config);

      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Update Post
  const updatePost = async post => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(`/api/blog/${post.id}`, post, config);

      dispatch({
        type: UPDATE_POST,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Editing Mode ON
  const editingPost = post => {
    dispatch({ type: EDITION_MODE, payload: post });
  };

  // Editing Mode OFF
  const closeEditing = () => {
    dispatch({ type: CLOSE_POSTS });
  };

  // Set Current Post
  const currentPost = post => {
    dispatch({ type: SET_CURRENT, payload: post });
  };

  // Open New Post
  const newPost = () => {
    dispatch({ type: POST_NEW });
  };

  return (
    <BlogContext.Provider
      value={{
        loading: state.loading,
        posts: state.posts,
        error: state.error,
        editing: state.editing,
        current: state.current,
        newP: state.newP,
        listPosts,
        deletePost,
        editingPost,
        closeEditing,
        updatePost,
        currentPost,
        addPost,
        newPost
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
