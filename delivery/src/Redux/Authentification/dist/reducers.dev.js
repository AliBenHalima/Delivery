"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostReducerLogUp = exports.PostReducer = exports.LoginReducer = exports.reducer2 = void 0;

var _types = require("./types");

var _actions = require("./actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialstate = {
  log: false,
  num: 0
};
var initialstate2 = {
  value: "my second reducer"
};

var reducer2 = function reducer2() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialstate2;
  var Action = arguments.length > 1 ? arguments[1] : undefined;

  switch (Action.type) {
    case _types.VALUE:
      return _objectSpread({}, state, {
        value: "new value"
      });

    default:
      return state;
  }
}; // export const FetchReducer=(state=FetchState,Action)=>{
//     switch (Action.type) {
//         case FetchRequest:
//             return {
//                 ...state,loading : true
//             }
//             case FetchSuccess:
//             return {
//                 ...state,loading : false,users:Action.payload
//             }
//             case FetchFailed
//             return {
//                 ...state,loading : false,error:Action.payload
//             }
//         default:
//            return state;
//     }
// }


exports.reducer2 = reducer2;

var LoginReducer = function LoginReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialstate;
  var Action = arguments.length > 1 ? arguments[1] : undefined;

  switch (Action.type) {
    case _types.LOGIN:
      return _objectSpread({}, state, {
        log: true
      });

    case _types.LOGOUT:
      return _objectSpread({}, state, {
        log: false
      });

    default:
      return state;
  }
};

exports.LoginReducer = LoginReducer;
var LoginState = {
  authenticated: false,
  error: "",
  status: "",
  userId: ""
};

var PostReducer = function PostReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LoginState;
  var Action = arguments.length > 1 ? arguments[1] : undefined;

  switch (Action.type) {
    case _types.POSTREQUEST:
      return _objectSpread({}, state, {
        authenticated: false
      });

    case _types.POSTSUCCESS:
      //     let st = {...state};
      //     st.authenticated = true;
      // return {...state,st    }
      return _objectSpread({}, state, {
        authenticated: true,
        status: Action.payload,
        error: "",
        userId: Action.userId
      });

    case _types.POSTFAILED:
      return _objectSpread({}, state, {
        authenticated: false,
        error: Action.payload,
        userId: "",
        status: "you are not logged in"
      });

    case _types.SIGN_OUT:
      return {
        authenticated: false,
        status: "You are not logged in "
      };

    case _types.REFRESH_STORE:
      return _objectSpread({}, state, {
        authenticated: true
      });

    default:
      return state;
  }
};

exports.PostReducer = PostReducer;
var LogupState = {
  isLoggedUp: false,
  status: ""
};

var PostReducerLogUp = function PostReducerLogUp() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LogupState;
  var Action = arguments.length > 1 ? arguments[1] : undefined;

  switch (Action.type) {
    case _types.POST_LOGUP_SUCCESS:
      //     let st = {...state};
      //     st.authenticated = true;
      // return {...state,st    }
      return _objectSpread({}, state, {
        isLoggedUp: true,
        status: Action.payload
      });

    case _types.POST_LOGUP_FAILED:
      return _objectSpread({}, state, {
        isLoggedUp: false,
        status: Action.payload
      });

    default:
      return state;
  }
};

exports.PostReducerLogUp = PostReducerLogUp;