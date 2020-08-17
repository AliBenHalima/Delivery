const { combineReducers } = require("redux");
const { reducer, reducer2,FetchReducer } = require("./reducers");

export const combRed = combineReducers({
  firstRed: reducer,
  sencondRed: reducer2,
  fetchred:FetchReducer
  
});