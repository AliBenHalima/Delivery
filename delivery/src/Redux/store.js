// const { createStore } = require("redux");
import {createStore, applyMiddleware} from 'redux';
import { reducer} from './Authentification/reducers'
import  thunk from 'redux-thunk'
import { logger} from 'redux-logger'
import {combRed} from './Authentification/combReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(combRed,composeWithDevTools(applyMiddleware(logger,thunk)));
