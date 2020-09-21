"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Like_Dislike_Product = exports.Like_Dislike_Failed = exports.Like_Dislike_Success = exports.PostProducts = exports.Post_Products_Fail = exports.Post_Products_Success = exports.RefreshStore = exports.refreshStore_Prod = exports.FetchProducts = exports.Fetch_Products_Fail = exports.Fetch_Products_Success = void 0;

var _types = require("./types");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var token = localStorage.getItem("token");

var Fetch_Products_Success = function Fetch_Products_Success(products) {
  return {
    type: _types.FETCH_PRODUCTS_SUCCESS,
    payload: products
  };
};

exports.Fetch_Products_Success = Fetch_Products_Success;

var Fetch_Products_Fail = function Fetch_Products_Fail(error) {
  return {
    type: _types.FETCH_PRODUCTS_FAIL,
    payload: {},
    error: error
  };
};

exports.Fetch_Products_Fail = Fetch_Products_Fail;

var FetchProducts = function FetchProducts() {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3000/Product/All", {
      headers: {
        "authtoken": token
      }
    }).then(function (res) {
      console.log("Log in Data is here", res);
      var Allproducts = res.data;
      dispatch(Fetch_Products_Success(Allproducts));
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(Fetch_Products_Fail(errorMsg));
    });
  };
};

exports.FetchProducts = FetchProducts;

var refreshStore_Prod = function refreshStore_Prod(products) {
  return {
    type: _types.REFRESH_STORE_PROD,
    payload: products
  };
};

exports.refreshStore_Prod = refreshStore_Prod;

var RefreshStore = function RefreshStore() {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3000/Product/All", {
      headers: {
        "authtoken": token
      }
    }).then(function (res) {
      console.log("Log in Data is here", res);
      var Allproducts = res.data;
      dispatch(refreshStore_Prod(Allproducts));
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(Fetch_Products_Fail(errorMsg));
    });
  };
}; //Post reservations 


exports.RefreshStore = RefreshStore;

var Post_Products_Success = function Post_Products_Success(data) {
  return {
    type: _types.POST_PRODUCTS_SUCCESS,
    payload: data
  };
};

exports.Post_Products_Success = Post_Products_Success;

var Post_Products_Fail = function Post_Products_Fail(error) {
  return {
    type: _types.POST_PRODUCTS_FAIL,
    payload: error
  };
};

exports.Post_Products_Fail = Post_Products_Fail;

var PostProducts = function PostProducts(Data, token) {
  return function (dispatch) {
    console.log("dATA of Res", Data);

    _axios["default"].post("http://localhost:3000/Reservation/AddReservation", Data, {
      headers: {
        "authtoken": token
      }
    }).then(function (res) {
      console.log("Redux  Data is here for post reservation", res);
      dispatch(Post_Products_Success(res.data));
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(Post_Products_Fail(errorMsg));
    });
  };
}; // Like / Dislike Product


exports.PostProducts = PostProducts;

var Like_Dislike_Success = function Like_Dislike_Success(success) {
  return {
    type: _types.LIKE_DISLIKE_SUCCESS,
    payload: success
  };
};

exports.Like_Dislike_Success = Like_Dislike_Success;

var Like_Dislike_Failed = function Like_Dislike_Failed(error) {
  return {
    type: _types.LIKE_DISLIKE_FAILED,
    payload: error
  };
};

exports.Like_Dislike_Failed = Like_Dislike_Failed;

var Like_Dislike_Product = function Like_Dislike_Product(DATA) {
  var token = localStorage.getItem("token");
  return function (dispatch) {
    // dispatch(Fetch_Comments_Request());
    _axios["default"].put("http://localhost:3000/Product/likeProduct", DATA, {
      headers: {
        "authtoken": token
      } //the token is a variable which holds the token

    }).then(function (response) {
      if (response.data.success) console.log("heeeeeeeeeeeeeeere", response);
      dispatch(Like_Dislike_Success(response.data.prod.likes));
      dispatch(FetchProducts());
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(Like_Dislike_Failed(error));
    });
  };
};

exports.Like_Dislike_Product = Like_Dislike_Product;