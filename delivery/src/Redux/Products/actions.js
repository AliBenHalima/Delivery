import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL,POST_PRODUCTS_SUCCESS,POST_PRODUCTS_FAIL } from "./types";
import axios from 'axios';

export const Fetch_Products_Success = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products

  };
};

export const Fetch_Products_Fail = (error) => {
  return {
    type: FETCH_PRODUCTS_FAIL,
    payload: error,
  };
};

export const FetchProducts = () => {
    return (dispatch) => {
        axios.get("http://localhost:3000/Product/All").then((res) => {
          console.log("Log in Data is here", res);
          const Allproducts=res.data;
        dispatch(Fetch_Products_Success(Allproducts));
      }).catch(error=>{
          const errorMsg = error.message;
          dispatch(Fetch_Products_Fail(errorMsg));
      });
  
    };
  };
  
  //Post reservations 
  export const Post_Products_Success = (data) => {
    return {
      type: POST_PRODUCTS_SUCCESS,
      payload: data,
    };
  };
  
  export const Post_Products_Fail = (error) => {
    return {
      type: POST_PRODUCTS_FAIL,
      payload: error,
    };
  };
  
  

    export const PostProducts = (Data,token) => {
      return (dispatch) => {
        axios.post("http://localhost:3000/Reservation/AddReservation", Data, {
          headers: {
            "authtoken": token
          },
        }).then((res) => {
            console.log("Redux  Data is here", res);

          dispatch(Post_Products_Success(res.data));
        }).catch(error=>{
            const errorMsg = error.message;
            dispatch(Post_Products_Fail(errorMsg));
        });
    
      };
    };