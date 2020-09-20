import { ADD_TOCART,GET_FROM_CART,INCREMENT_ATTENTE,DECREMENT_ATTENTE, INCREMENT,RESET_STORE_ATTENTE, DECREMENT,UPDATE_ON_DELETE,RESET_STORE, ATTENTE_DELETE, SWITCH_DATA, UPDATE_ON_DELETE_ATTENTE } from "./types";
import axios from 'axios';

export const AddtoCard = (product) => {
  return {
    type: ADD_TOCART,

    payload: {...product,number:1,incart:false}
  };
};

export const Increment = (product,number) => {
  return {
    type: INCREMENT,
    payload: {product:product,number:number}
  };
};

export const Decrement = (product,number) => {
  return {
    type: DECREMENT,
    payload: {product:product,number:number}  }
};

export const ChangeState = (newProduct,number,cost) => {
  return {
    type: UPDATE_ON_DELETE,
    payload: {product:newProduct} ,
    number:number,
    cost:cost
 }
};
export const ChangeStateAttente = (newProduct,number,cost) => {
  return {
    type: UPDATE_ON_DELETE_ATTENTE ,
    payload: {product:newProduct} ,
    number:number,
    cost:cost
 }
};

export const Reset_store = () => {
  return {
    type: RESET_STORE,
      }};

export const Reset_store_attente = () => {
  return {
    type: RESET_STORE_ATTENTE,
      }};


 export const AttenteDelete_All = () => {
     return {
        type: ATTENTE_DELETE,
        payload: ""
         
     }
   };
      

export const Switch_Data = (Products) => {
   return {
      type: SWITCH_DATA,
      payload: Products
         
    }
  };
  export const IncrementAttente = (product,number) => {
  return {
    type: INCREMENT_ATTENTE,
    payload: {product:product,number:number}
  };
};

export const DecrementAttente = (product,number) => {
  return {
    type: DECREMENT_ATTENTE,
    payload: {product:product,number:number}  }
};

// export const GetFromCart = () => {
//   return {
//     type: GET_FROM_CART,
//     payload: ""
//   };
// };


