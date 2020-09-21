"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FetchComments = exports.Fetch_Comments_Failed = exports.Fetch_Comments_Success = exports.Fetch_Comments_Request = void 0;

var _types = require("./types");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Fetch_Comments_Request = function Fetch_Comments_Request() {
  return {
    type: _types.FETCH_COMMENT_REQUEST
  };
};

exports.Fetch_Comments_Request = Fetch_Comments_Request;

var Fetch_Comments_Success = function Fetch_Comments_Success(comments) {
  return {
    type: _types.FETCH_COMMENT_SUCCESS,
    payload: comments
  };
};

exports.Fetch_Comments_Success = Fetch_Comments_Success;

var Fetch_Comments_Failed = function Fetch_Comments_Failed(error) {
  return {
    type: _types.FETCH_COMMENT_FAILED,
    payload: error
  };
};

exports.Fetch_Comments_Failed = Fetch_Comments_Failed;

var FetchComments = function FetchComments() {
  return function (dispatch) {
    // dispatch(Fetch_Comments_Request());
    _axios["default"].get("http://localhost:3000/Comment/list").then(function (response) {
      var users = response.data;
      console.log("Commmmmmmment", users);
      dispatch(Fetch_Comments_Success(response.data));
    })["catch"](function (error) {
      var errorMsg = error.message;
      dispatch(Fetch_Comments_Failed(errorMsg));
    });
  };
};

exports.FetchComments = FetchComments;