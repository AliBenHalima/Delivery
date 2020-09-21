import {
  ADD_TOCART,
  GET_FROM_CART,
  DECREMENT,
  INCREMENT,
  UPDATE_ON_DELETE,
  RESET_STORE,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILED,
} from "./types";

const CartState = {
  BasketNumber: 0,
  CartCost: 0,
  products: [],
};
const CommmentsState = {
  Comments: [],
  status : ""
};



export const FetchComments_Red=(state=CommmentsState,Action)=>{
  switch (Action.type) {
      case FETCH_COMMENT_SUCCESS:
        // console.log("Action.pay", Action.payload)
          return {
              ...state,Comments : Action.payload, status:"success"
          }
          case FETCH_COMMENT_FAILED:
          //     let st = {...state};
          //     st.authenticated = true;
          // return {...state,st    }
          return{
              ...state,status:"Failed"
          }
         
      default:
         return state;
  }
}