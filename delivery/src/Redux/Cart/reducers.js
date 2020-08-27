import { ADD_TOCART, GET_FROM_CART, DECREMENT, INCREMENT } from "./types";

const CartState={
 BasketNumber:0,
 CartCost:0,
 products:[]
}

export const ADDReducer=(state=CartState,Action)=>{
    switch (Action.type) {
            case ADD_TOCART:
                // state.products.push(Action.payload)
                    if( state.products.length>0){
                    state.products.forEach((e)=>{
                        if(e._id==Action.payload._id ){
                                e.number++;
                                e.incart=true;                        
                        }
                        else{ 
                           let found = state.products.some(el => el._id == Action.payload._id);
                            if(!found)
                            // debugger;
                            state.products.push(Action.payload) 
                        }
                        });
                    }else{
                        state.products.push(Action.payload)
                    }
                    console.log("new products",state.products)
                    return{
                        ...state,BasketNumber:state.BasketNumber+1,CartCost: state.CartCost + Action.payload.price
                    }   
                    case INCREMENT:
                        state.products.forEach((e)=>{
                            if(e._id==Action.payload.product._id ){
                                e.number++;}
                            });
                        return{
                            ...state,BasketNumber:state.BasketNumber+1,CartCost: state.CartCost + Action.payload.product.price
                        }   
                        case DECREMENT:
                            state.products.forEach((e)=>{
                                if(e._id==Action.payload.product._id ){
                                    e.number--;}
                                });
                            return{
                                ...state,BasketNumber:state.BasketNumber-1,CartCost: state.CartCost - Action.payload.product.price
                            }   

        default:
           return state;
    }
}