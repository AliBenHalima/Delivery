// const { createStore } = require("redux");
import {createStore, applyMiddleware} from 'redux';
import { reducer} from './reducers'
import  thunk from 'redux-thunk'
import { logger} from 'redux-logger'
import {combRed} from './combReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(combRed,composeWithDevTools(applyMiddleware(logger,thunk)));
