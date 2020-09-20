import axios from 'axios';
import { FETCH_RESERVATIONS_FAILED, FETCH_RESERVATIONS_SUCCESS,REFRESH_STORE_RES } from './types';




export const Fetch_Reservation_success = (reservations) => {
  return {
    type: FETCH_RESERVATIONS_SUCCESS,
    payload: reservations

  };
};

export const Fetch_Reservation_fail = (error) => {
  return {
    type: FETCH_RESERVATIONS_FAILED,
    payload: {},
    error:error
  };
};

export const FetchReservation = () => {
    return (dispatch) => {
        axios.get("http://localhost:3000/Reservation/All").then((res) => {
         
         const AllReservations = res.data;
        dispatch(Fetch_Reservation_success(AllReservations));
      }).catch(error=>{
          const errorMsg = error.message;
          dispatch(Fetch_Reservation_fail(errorMsg));
      });
  
    };
  };

  export const refreshStore_Reservation = (reservations) => {
    return {
      type: REFRESH_STORE_RES,
      payload: reservations,
    
    };
  };

  export const RefreshStoreRes = () => {
    return (dispatch) => {
        axios.get("http://localhost:3000/Reservation/All").then((res) => {
          console.log("Log in Data is here", res);
           const AllReservations=res.data;
        dispatch(refreshStore_Reservation(AllReservations));
      }).catch(error=>{
          const errorMsg = error.message;
          dispatch(Fetch_Reservation_fail(errorMsg));
      });
  
    };
  };
  
  
  
  //Post reservations 
  // export const Post_Products_Success = (data) => {
  //   return {
  //     type: POST_PRODUCTS_SUCCESS,
  //     payload: data,
  //   };
  // };
  
  // export const Post_Products_Fail = (error) => {
  //   return {
  //     type: POST_PRODUCTS_FAIL,
  //     payload: error,
  //   };
  // };
  
  

  //   export const PostProducts = (Data,token) => {
  //     return (dispatch) => {
  //       console.log("dATA of Res",Data);
  //       axios.post("http://localhost:3000/Reservation/AddReservation", Data, {
  //         headers: {
  //           "authtoken": token
  //         },
  //       }).then((res) => {
  //           console.log("Redux  Data is here for post reservation", res);
       
          

  //         dispatch(Post_Products_Success(res.data));
  //       }).catch(error=>{
  //           const errorMsg = error.message;
  //           dispatch(Post_Products_Fail(errorMsg));
  //       });
    
  //     };
  //   };

  //   // Like / Dislike Product

   
  //   export const Like_Dislike_Success = (success) => {
  //     return {
  //       type: LIKE_DISLIKE_SUCCESS,
  //       payload: success,
  //     };
  //   };
    
  //   export const Like_Dislike_Failed = (error) => {
  //     return {
  //       type: LIKE_DISLIKE_FAILED,
  //       payload: error,
  //     };
  //   };
  //   export const Like_Dislike_Product = (DATA) => {
  //     const token = localStorage.getItem("token");
      

  //     return (dispatch) => {
  //       // dispatch(Fetch_Comments_Request());
  //       axios.put("http://localhost:3000/Product/likeProduct",DATA,{
  //         headers: {
  //           "authtoken": token }//the token is a variable which holds the token
  //         }).then((response) => {
          
  //         if(response.data.success)
  //         console.log("heeeeeeeeeeeeeeere",response)
       
  //         dispatch(Like_Dislike_Success(response.data.prod.likes));
  //         dispatch(FetchProducts());
         
  //       }).catch(error=>{
  //           const errorMsg = error.message;
  //           dispatch(Like_Dislike_Failed(error));
  //       });
    
  //     };
  //   };
    