// const { createStore } = require("redux");
import {createStore, compose, applyMiddleware} from 'redux';
import { reducer} from './Authentification/reducers'
import  thunk from 'redux-thunk'
import { logger} from 'redux-logger'
import {combRed} from './Authentification/combReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

const SaveToLocalStorage=(state)=>{
    try{
        const serializedState= JSON.stringify(state)
        localStorage.setItem('state',serializedState)}
        catch(e){
            console.log(e)
        }
    }
 
    const loadFromLocalStorage =()=>{
        try{
            const serializedState =localStorage.getItem('state')
            if(serializedState ===null) return undefined
            return JSON.parse(serializedState)}
            catch(e){
                console.log(e);
                return undefined
            }
        }
        const persistedState=loadFromLocalStorage();
        
    export const store = createStore(combRed(history),persistedState,composeWithDevTools(applyMiddleware(routerMiddleware(history),logger,thunk)));
 
      
    
    store.subscribe(()=>SaveToLocalStorage(store.getState()))



