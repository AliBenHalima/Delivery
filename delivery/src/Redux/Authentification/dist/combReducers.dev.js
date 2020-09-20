"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combRed = void 0;

var _reducers = require("../Products/reducers");

var _reducers2 = require("../Cart/reducers");

var _connectedReactRouter = require("connected-react-router");

var _reducers3 = require("../Comments/reducers");

var _reducers4 = require("../Reservations/reducers");

var _require = require("redux"),
    combineReducers = _require.combineReducers;

var _require2 = require("./reducers"),
    reducer = _require2.reducer,
    reducer2 = _require2.reducer2,
    FetchReducer = _require2.FetchReducer,
    PostReducer = _require2.PostReducer,
    LoginReducer = _require2.LoginReducer,
    PostReducerLogUp = _require2.PostReducerLogUp;

var combRed = function combRed(history) {
  return combineReducers({
    // firstRed: reducer,
    // sencondRed: reducer2,
    // fetchred:FetchReducer,
    postRed: PostReducer,
    postLogup: PostReducerLogUp,
    FetchProd: _reducers.FetchProd_Red,
    ADDReducer: _reducers2.ADDReducer,
    CommentsRed: _reducers3.FetchComments_Red,
    Attente: _reducers2.DispatchIntoAttente,
    Reservations: _reducers4.FetchRes_Red,
    router: (0, _connectedReactRouter.connectRouter)(history)
  });
};

exports.combRed = combRed;