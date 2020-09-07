import { FetchProd_Red } from "../Products/reducers";
import { ADDReducer } from "../Cart/reducers";
import { connectRouter } from 'connected-react-router'

const { combineReducers } = require("redux");
const { reducer, reducer2,FetchReducer,PostReducer,LoginReducer, PostReducerLogUp} = require("./reducers");

export const combRed =(history)=> combineReducers({
  // firstRed: reducer,
  // sencondRed: reducer2,
  // fetchred:FetchReducer,
  postRed:PostReducer,
  postLogup:PostReducerLogUp,
  FetchProd:FetchProd_Red,
  ADDReducer:ADDReducer,
  router:connectRouter(history)

  
});