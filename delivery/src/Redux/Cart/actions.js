import { ADD_TOCART,GET_FROM_CART, INCREMENT, DECREMENT,UPDATE_ON_DELETE,RESET_STORE } from "./types";
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

export const Reset_store = () => {
  return {
    type: RESET_STORE,
      }};

// export const GetFromCart = () => {
//   return {
//     type: GET_FROM_CART,
//     payload: ""
//   };
// };


