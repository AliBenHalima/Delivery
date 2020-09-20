"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Postlogup = exports.PostLogin = exports.FetchUsers = exports.refreshStore = exports.post_logup_failed = exports.post_logup_success = exports.Signout = exports.postfailed = exports.postsuccess = exports.postrequest = exports.FetchFailed = exports.FetchSuccess = exports.FetchRequest = exports.logout = exports.login = void 0;

var _types = require("./types");

var _axios = _interopRequireDefault(require("axios"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const { LOGIN } = require("./types")
var login = function login() {
  return {
    type: _types.LOGIN,
    payload: ""
  };
};

exports.login = login;

var logout = function logout() {
  return {
    type: _types.LOGOUT,
    payload: ""
  };
}; // export const actionReducer2 = () => {
//   return {
//     type: VALUE,
//     payload: "this is a 2ND reducer Payload",
//   };
// };


exports.logout = logout;

var FetchRequest = function FetchRequest() {
  return {
    type: _types.FETCH_REQUEST
  };
};

exports.FetchRequest = FetchRequest;

var FetchSuccess = function FetchSuccess(users) {
  return {
    type: _types.FETCH_SUCCESS,
    payload: users
  };
};

exports.FetchSuccess = FetchSuccess;

var FetchFailed = function FetchFailed(error) {
  return {
    type: _types.FETCH_FAILED,
    payload: error
  };
};

exports.FetchFailed = FetchFailed;

var postrequest = function postrequest() {
  return {
    type: _types.POSTREQUEST
  };
};

exports.postrequest = postrequest;

var postsuccess = function postsuccess(status, userId) {
  return {
    type: _types.POSTSUCCESS,
    payload: status,
    userId: userId
  };
};

exports.postsuccess = postsuccess;

var postfailed = function postfailed(error) {
  return {
    type: _types.POSTFAILED,
    payload: error
  };
};

exports.postfailed = postfailed;

var Signout = function Signout() {
  return {
    type: _types.SIGN_OUT
  };
};

exports.Signout = Signout;

var post_logup_success = function post_logup_success(status) {
  return {
    type: _types.POST_LOGUP_SUCCESS,
    payload: status
  };
};

exports.post_logup_success = post_logup_success;

var post_logup_failed = function post_logup_failed(status) {
  return {
    type: _types.POST_LOGUP_FAILED,
    payload: status
  };
};

exports.post_logup_failed = post_logup_failed;

var refreshStore = function refreshStore() {
  return {
    type: _types.REFRESH_STORE,
    payload: "store refreshed"
  };
};

exports.refreshStore = refreshStore;

var FetchUsers = function FetchUsers() {
  return function (dispatch) {
    dispatch(FetchRequest());

    _axios["default"].get("https://jsonplaceholder.typicode.com/users").then(function (response) {
      var users = response.data;
      dispatch(FetchSuccess(response.data.status));
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(FetchFailed(errorMsg));
    });
  };
};

exports.FetchUsers = FetchUsers;

var PostLogin = function PostLogin(Data) {
  return function (dispatch) {
    _axios["default"].post("http://localhost:3000/Sign/SignIn", Data).then(function (response) {
      var info = response.data;
      console.log("infos are ", info);

      if (response.data.status == "POST SUCCEEDED") {
        localStorage.setItem("token", response.data.token);
      }

      response.data.status == "POST SUCCEEDED" ? dispatch(postsuccess(info, response.userId)) : dispatch(postfailed(response.data.error));
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(postfailed(errorMsg));
    });
  };
};

exports.PostLogin = PostLogin;

var Postlogup = function Postlogup(Data) {
  return function (dispatch) {
    _axios["default"].post("http://localhost:3000/Sign/SignUp", Data).then(function (response) {
      var info = response.data;
      console.log("Logup infos are ", info);

      if (response.data.hasOwnProperty("success")) {
        dispatch(post_logup_success(info));
      } else {
        dispatch(post_logup_failed(response.data.error));
      }
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(post_logup_failed(errorMsg));
    });
  };
}; // Authentication Actions :


exports.Postlogup = Postlogup;