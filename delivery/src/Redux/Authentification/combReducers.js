import { FetchProd_Red } from "../Products/reducers";
import { ADDReducer, DispatchIntoAttente } from "../Cart/reducers";
import { connectRouter } from 'connected-react-router'
import { FetchComments_Red } from "../Comments/reducers";
import { FetchRes_Red } from "../Reservations/reducers";

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
  CommentsRed:FetchComments_Red,
  Attente : DispatchIntoAttente,
  Reservations  :FetchRes_Red,
  router:connectRouter(history)


  
});