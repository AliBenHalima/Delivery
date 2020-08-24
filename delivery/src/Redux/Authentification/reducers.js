import {LOGIN,LOGOUT, FETCH_FAILED, POSTSUCCESS,POSTREQUEST,POSTFAILED,POST_LOGUP_SUCCESS,
    POST_LOGUP_FAILED,REFRESH_STORE} from './types';
import {VALUE} from './types';
import {login, postrequest,postfailed ,postsuccess} from './actions';
import {actionReducer2} from './actions';
import {FetchSuccess,FetchRequest,FetchFailed} from './actions';

const initialstate={
    log:false,
    num:0
}
const initialstate2={
    value:"my second reducer"
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




// export const FetchReducer=(state=FetchState,Action)=>{
//     switch (Action.type) {
//         case FetchRequest:
//             return {
//                 ...state,loading : true
//             }
//             case FetchSuccess:
//             return {
//                 ...state,loading : false,users:Action.payload
//             }
//             case FetchFailed
//             return {
//                 ...state,loading : false,error:Action.payload
//             }

//         default:
//            return state;
//     }
// }

export const LoginReducer=(state=initialstate,Action)=>{
    switch (Action.type) {
        case LOGIN:
            return {
                ...state,log: true
            }
            case LOGOUT:
                return {
                    ...state,log: false
                }
        default:
           return state;
    }
}

const LoginState={
    authenticated : false, 
    error:'',
    status:""
}

export const PostReducer=(state=LoginState,Action)=>{
    switch (Action.type) {
        case POSTREQUEST:
            return {
                ...state,authenticated : false
            }
            case POSTSUCCESS:
            //     let st = {...state};
            //     st.authenticated = true;
            // return {...state,st    }
            return{
                ...state,authenticated : true,status:Action.payload,error:""
            }
            case POSTFAILED:
            return {
                ...state,authenticated : false,error:Action.payload
            }
            case REFRESH_STORE:
                return {
                    ...state,authenticated : true
                }

        default:
           return state;
    }
}

const LogupState={
    isLoggedUp:false,
    status:""
}

export const PostReducerLogUp=(state=LogupState,Action)=>{
    switch (Action.type) {
            case POST_LOGUP_SUCCESS:
            //     let st = {...state};
            //     st.authenticated = true;
            // return {...state,st    }
            return{
                ...state, isLoggedUp:true,status:Action.payload
            }
            case POST_LOGUP_FAILED:
            return {
                ...state,isLoggedUp:false,status:Action.payload
            }

        default:
           return state;
    }
}