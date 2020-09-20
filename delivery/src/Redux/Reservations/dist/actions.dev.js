"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshStoreRes = exports.refreshStore_Reservation = exports.FetchReservation = exports.Fetch_Reservation_fail = exports.Fetch_Reservation_success = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Fetch_Reservation_success = function Fetch_Reservation_success(reservations) {
  return {
    type: _types.FETCH_RESERVATIONS_SUCCESS,
    payload: reservations
  };
};

exports.Fetch_Reservation_success = Fetch_Reservation_success;

var Fetch_Reservation_fail = function Fetch_Reservation_fail(error) {
  return {
    type: _types.FETCH_RESERVATIONS_FAILED,
    payload: {},
    error: error
  };
};

exports.Fetch_Reservation_fail = Fetch_Reservation_fail;

var FetchReservation = function FetchReservation() {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3000/Reservation/All").then(function (res) {
      var AllReservations = res.data;
      dispatch(Fetch_Reservation_success(AllReservations));
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(Fetch_Reservation_fail(errorMsg));
    });
  };
};

exports.FetchReservation = FetchReservation;

var refreshStore_Reservation = function refreshStore_Reservation(reservations) {
  return {
    type: _types.REFRESH_STORE_RES,
    payload: reservations
  };
};

exports.refreshStore_Reservation = refreshStore_Reservation;

var RefreshStoreRes = function RefreshStoreRes() {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3000/Reservation/All").then(function (res) {
      console.log("Log in Data is here", res);
      var AllReservations = res.data;
      dispatch(refreshStore_Reservation(AllReservations));
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(Fetch_Reservation_fail(errorMsg));
    });
  };
}; //Post reservations 
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


exports.RefreshStoreRes = RefreshStoreRes;