import { ADD_TOCART,GET_FROM_CART } from "./types";
import axios from 'axios';

export const AddtoCard = (product) => {
  return {
    type: ADD_TOCART,

    payload: {...product,number:1,incart:false}
  };
};

// export const GetFromCart = () => {
//   return {
//     type: GET_FROM_CART,
//     payload: ""
//   };
// };


