import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL,POST_PRODUCTS_SUCCESS,POST_PRODUCTS_FAIL,LIKE_DISLIKE_SUCCESS,LIKE_DISLIKE_FAILED, REFRESH_STORE_PROD } from "./types";
import axios from 'axios';
const token = localStorage.getItem("token");



export const Fetch_Products_Success = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products

  };
};

export const Fetch_Products_Fail = (error) => {
  return {
    type: FETCH_PRODUCTS_FAIL,
    payload: {},
    error:error
  };
};

export const FetchProducts = () => {
    return (dispatch) => {
        axios.get("http://localhost:3000/Product/All",{
          headers: {
            "authtoken": token
          }}).then((res) => {
          console.log("Log in Data is here", res);
         const Allproducts=res.data;
        dispatch(Fetch_Products_Success(Allproducts));
      }).catch(error=>{
          const errorMsg = error.message;
          dispatch(Fetch_Products_Fail(errorMsg));
      });
  
    };
  };

  export const refreshStore_Prod = (products) => {
    return {
      type: REFRESH_STORE_PROD,
      payload: products,
    
    };
  };

  export const RefreshStore = () => {
    return (dispatch) => {
        axios.get("http://localhost:3000/Product/All",{
          headers: {
            "authtoken": token
          }}).then((res) => {
          console.log("Log in Data is here", res);
           const Allproducts=res.data;
        dispatch(refreshStore_Prod(Allproducts));
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
        console.log("dATA of Res",Data);
        axios.post("http://localhost:3000/Reservation/AddReservation", Data, {
          headers: {
            "authtoken": token
          },
        }).then((res) => {
            console.log("Redux  Data is here for post reservation", res);
       
          

          dispatch(Post_Products_Success(res.data));
        }).catch(error=>{
            const errorMsg = error.message;
            dispatch(Post_Products_Fail(errorMsg));
        });
    
      };
    };

    // Like / Dislike Product

   
    export const Like_Dislike_Success = (success) => {
      return {
        type: LIKE_DISLIKE_SUCCESS,
        payload: success,
      };
    };
    
    export const Like_Dislike_Failed = (error) => {
      return {
        type: LIKE_DISLIKE_FAILED,
        payload: error,
      };
    };
    export const Like_Dislike_Product = (DATA) => {
      const token = localStorage.getItem("token");
      

      return (dispatch) => {
        // dispatch(Fetch_Comments_Request());
        axios.put("http://localhost:3000/Product/likeProduct",DATA,{
          headers: {
            "authtoken": token }//the token is a variable which holds the token
          }).then((response) => {
          
          if(response.data.success)
          console.log("heeeeeeeeeeeeeeere",response)
       
          dispatch(Like_Dislike_Success(response.data.prod.likes));
          dispatch(FetchProducts());
         
        }).catch(error=>{
            const errorMsg = error.message;
            dispatch(Like_Dislike_Failed(error));
        });
    
      };
    };
    