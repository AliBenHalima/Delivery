import {LOGIN, FETCH_FAILED} from './types';
import {VALUE} from './types';
import {login} from './actions';
import {actionReducer2} from './actions';
import {FetchSuccess,FetchRequest,FetchFailed} from './actions';

const initialstate={
    log:false,
    num:0
}
const initialstate2={
    value:"my second reducer"
}



export const reducer=(state=initialstate,Action)=>{
        switch (Action.type) {
            case LOGIN:
                return {
                    ...state,log: !state.log,num:eval(state.num) + eval(Action.payload)
                }

            default:
               return state;
        }
}

export const reducer2=(state=initialstate2,Action)=>{
    switch (Action.type) {
        case VALUE:
            return {
                ...state,value : "new value"
            }

        default:
           return state;
    }
}


const FetchState={
    loading : false, 
    users:[],
    error:''
}

export const FetchReducer=(state=FetchState,Action)=>{
    switch (Action.type) {
        case FetchRequest:
            return {
                ...state,loading : true
            }
            case FetchSuccess:
            return {
                ...state,loading : false,users:Action.payload
            }
            case FetchFailed:
            return {
                ...state,loading : false,error:Action.payload
            }

        default:
           return state;
    }
}