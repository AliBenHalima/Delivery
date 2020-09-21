"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FetchComments_Red = void 0;

var _types = require("./types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CartState = {
  BasketNumber: 0,
  CartCost: 0,
  products: []
};
var CommmentsState = {
  Comments: [],
  status: ""
};

var FetchComments_Red = function FetchComments_Red() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CommmentsState;
  var Action = arguments.length > 1 ? arguments[1] : undefined;

  switch (Action.type) {
    case _types.FETCH_COMMENT_SUCCESS:
      // console.log("Action.pay", Action.payload)
      return _objectSpread({}, state, {
        Comments: Action.payload,
        status: "success"
      });

    case _types.FETCH_COMMENT_FAILED:
      //     let st = {...state};
      //     st.authenticated = true;
      // return {...state,st    }
      return _objectSpread({}, state, {
        status: "Failed"
      });

    default:
      return state;
  }
};

exports.FetchComments_Red = FetchComments_Red;