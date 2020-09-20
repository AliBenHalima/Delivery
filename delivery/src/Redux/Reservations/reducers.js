import {  FETCH_RESERVATIONS_FAILED, FETCH_RESERVATIONS_SUCCESS, REFRESH_STORE_RES } from "./types";

const ReservationsState={
    reservations:[],
    status:""
}

export const FetchRes_Red=(state=ReservationsState,Action)=>{
    switch (Action.type) {
            case FETCH_RESERVATIONS_SUCCESS:
            //     let st = {...state};
            //     st.authenticated = true;
            // return {...state,st    }
            return{
                ...state, reservations:Action.payload, status:"Fetch Reservations Succeeded"
            }
            case FETCH_RESERVATIONS_FAILED:
            return {
                ...state, status:"Fetch Reservations FAILED"
            }
             case REFRESH_STORE_RES:
                  return {
             ...state, reservations:Action.payload, status:"STORE REFRESHED !"
               }
              
          
                
            
        default:
           return state;
    }
}