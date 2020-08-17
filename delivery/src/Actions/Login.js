// import redux from 'redux'
var redux = require('redux');
// import { connect } from 'react-redux'


const Login = "LOGGED_IN";
 const login =()=>{
     return{
         type:Login , 
         info:"this user is logged in "
     }
 }
 
const Num = "Number";
const numb =()=>{
    return{
        type:Num , 
        info:"this is a number "
    }
}
const intinialstate={
    log :false
}
const NUmberState={
    value:0
}
 const reducer=(state=intinialstate,Action)=>{
     switch (Action.type) {
         case Login :
             return {...state,log : !state.log}
     
         default:
           return state;
     }
 }

 const  NumberReducer=(state=NUmberState,Action)=>{
    switch (Action.type) {
        case Num :
            return {...state, value: state.value +1}
    
        default:
          return state;
    }
}
//  const createStore = 
const combinereducers=redux.combineReducers;

const createStore = redux.createStore;
const store=createStore(combinereducers({
    bool:reducer,
    num:NumberReducer
}));

console.log("getstate",store.getState())
const unsubscribe =store.subscribe(()=>{console.log("initial state is",store.getState())})
store.dispatch(login());
store.dispatch(login());
store.dispatch(login());
store.dispatch(numb());
store.dispatch(numb());
unsubscribe();