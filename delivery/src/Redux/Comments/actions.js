import { ADD_TOCART,GET_FROM_CART, INCREMENT, DECREMENT,UPDATE_ON_DELETE,RESET_STORE, FETCH_COMMENT_REQUEST, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILED } from "./types";
import axios from 'axios';
export const Fetch_Comments_Request = () => {
  return {
    type: FETCH_COMMENT_REQUEST,
  };
};

export const Fetch_Comments_Success = (comments) => {
  return {
    type: FETCH_COMMENT_SUCCESS,
    payload: comments,
  };
};

export const Fetch_Comments_Failed = (error) => {
  return {
    type: FETCH_COMMENT_FAILED,
    payload: error,
  };
};
export const FetchComments = () => {
  console.log("Commmmmmmment")
  return (dispatch) => {
    // dispatch(Fetch_Comments_Request());
    axios.get("http://localhost:3000/Comment/list").then((response) => {
      const users = response.data;
      console.log("Commmmmmmment",users)
      dispatch(Fetch_Comments_Success(response.data));
    }).catch(error=>{
        const errorMsg = error.message;
        dispatch(Fetch_Comments_Failed(errorMsg));
    });

  };
};


