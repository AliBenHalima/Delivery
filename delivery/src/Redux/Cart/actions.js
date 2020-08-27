import { ADD_TOCART,GET_FROM_CART, INCREMENT, DECREMENT } from "./types";
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

// export const GetFromCart = () => {
//   return {
//     type: GET_FROM_CART,
//     payload: ""
//   };
// };


