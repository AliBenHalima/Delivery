import { FetchProd_Red } from "../Products/reducers";

const { combineReducers } = require("redux");
const { reducer, reducer2,FetchReducer,PostReducer,LoginReducer, PostReducerLogUp} = require("./reducers");

export const combRed = combineReducers({
  // firstRed: reducer,
  // sencondRed: reducer2,
  // fetchred:FetchReducer,
  postRed:PostReducer,
  postLogup:PostReducerLogUp,
  FetchProd:FetchProd_Red
  
});