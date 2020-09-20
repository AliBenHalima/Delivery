import {
  ADD_TOCART,
  GET_FROM_CART,
  DECREMENT,
  INCREMENT,
  UPDATE_ON_DELETE,
  RESET_STORE,
  ATTENTE_DELETE,
  SWITCH_DATA,
  UPDATE_ON_DELETE_ATTENTE,
  RESET_STORE_ATTENTE,
  INCREMENT_ATTENTE,
DECREMENT_ATTENTE
} from "./types";

const CartState = {
  BasketNumber: 0,
  CartCost: 0,
  products: [],
};

export const ADDReducer = (state = CartState, Action) => {
  switch (Action.type) {
    case ADD_TOCART:
      // state.products.push(Action.payload)
      if (state.products.length > 0) {
        state.products.forEach((e) => {
          if (e._id == Action.payload._id) {
            e.number++;
            e.incart = true;
          } else {
            let found = state.products.some(
              (e) => e._id == Action.payload._id
            );
            if (!found)
              state.products.push(Action.payload);
          }
        });
      } else {
        state.products.push(Action.payload);
      }
      return {
        ...state,
        BasketNumber: state.BasketNumber + 1,
        CartCost: state.CartCost + Action.payload.price,
      };

    case INCREMENT:
      state.products.forEach((e) => {
        if (e._id == Action.payload.product._id) {
          e.number++;
        }
      });
      return {
        ...state,
        BasketNumber: state.BasketNumber + 1,
        CartCost: state.CartCost + Action.payload.product.price,
      };

    case DECREMENT:
      let bool=false;
      state.products.forEach((e) => {
        if (e.number >0 && e._id == Action.payload.product._id) {
          e.number--;
          bool=true;
        }
      });
      if(bool){
      return {
        ...state,
        BasketNumber: state.BasketNumber - 1,
        CartCost: state.CartCost - Action.payload.product.price,
      }; } else{
        return {
          ...state,
          BasketNumber: state.BasketNumber,
          CartCost: state.CartCost 
        };

      }

    case UPDATE_ON_DELETE:
      console.log("prodddd is", state);
      console.log("Action is", Action);
      return {
        ...state,
        products: Action.payload.product,
        BasketNumber: state.BasketNumber - Action.number,
        CartCost: state.CartCost - Action.cost * Action.number,
      };
      case ATTENTE_DELETE:
      return {
        ...state,
        products: [],
        BasketNumber: 0,
        CartCost: 0
      };
     
      case RESET_STORE:
        return {
          ...state,
          products:[],
          BasketNumber: 0,
          CartCost: 0
        };

    default:
      return state;
  }
};

const CartStateAttente = {
  BasketNumber: 0,
  CartCost: 0,
  products: [],
};
export const DispatchIntoAttente = (state = CartStateAttente, Action) => {
  switch (Action.type) {
    case SWITCH_DATA:
      let num =0;
     let cost_ =0;
    // let newObj = Object.assign({},Action.payload)
    Action.payload.forEach((element)=>{
      num = num + element.number;
      cost_=cost_ + element.number * element.price
 state.products.push(element)
    })
   
    //     Action.payload.forEach(val=>{
         
    //       num = num + val.number;
    //       cost_=cost_ + val.number * val.price
    //     });
       ;
      return {
        ...state,
        BasketNumber: num,
        CartCost: cost_
      };
      case UPDATE_ON_DELETE_ATTENTE:

      return {
        ...state,
        products: Action.payload.product,
        BasketNumber: state.BasketNumber - Action.number,
        CartCost: state.CartCost - Action.cost * Action.number,
      };
       case RESET_STORE_ATTENTE:
        return {
          ...state,
          BasketNumber: 0,
          CartCost: 0,
          products: [],
        };

    case INCREMENT_ATTENTE:
      state.products.forEach((e) => {
        if (e._id == Action.payload.product._id) {
          e.number++;
        }
      });
      return {
        ...state,
        BasketNumber: state.BasketNumber + 1,
        CartCost: state.CartCost + Action.payload.product.price,
      };


    case DECREMENT_ATTENTE :
      let bool=false;
      state.products.forEach((e) => {
        if (e.number >0 && e._id == Action.payload.product._id) {
          e.number--;
          bool=true;
        }
      });
      if(bool){
      return {
        ...state,
        BasketNumber: state.BasketNumber - 1,
        CartCost: state.CartCost - Action.payload.product.price,
      }; } else{
        return {
          ...state,
          BasketNumber: state.BasketNumber,
          CartCost: state.CartCost 
        };

      }

      default:
        return state;
    }
    }
  