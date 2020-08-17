// const { LOGIN } = require("./types")
import { LOGIN } from "./types";
import { VALUE } from "./types";
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED } from "./types";
import axios from 'axios';

export const login = (number) => {
  return {
    type: LOGIN,
    payload: number,
  };
};

export const actionReducer2 = () => {
  return {
    type: VALUE,
    payload: "this is a 2ND reducer Payload",
  };
};

export const FetchRequest = () => {
  return {
    type: FETCH_REQUEST,
  };
};

export const FetchSuccess = (users) => {
  return {
    type: FETCH_SUCCESS,
    payload: users,
  };
};

export const FetchFailed = (error) => {
  return {
    type: FETCH_FAILED,
    payload: error,
  };
};

export const FetchUsers = () => {
  return (dispatch) => {
    dispatch(FetchRequest());
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      const users = response.data;
      dispatch(FetchSuccess(users));
    }).catch(error=>{
        const errorMsg = error.message;
        dispatch(FetchFailed(errorMsg));
    });

  };
};
