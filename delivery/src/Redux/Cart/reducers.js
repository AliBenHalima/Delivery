import { ADD_TOCART, GET_FROM_CART } from "./types";

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
                
                // state.products.forEach((e)=>{
                //      if(e._id==Action.payload._id){
                //         e.number++;}});
                // if(state.products.hasOwnProperty("number")){
                    // state.products.push({...Action.payload,number:0,incart:false})
                // // }else{
                // //     state.products.push({...Action.payload,number:0,incart:false})
                // }
                 
                //  state.products.forEach((e)=>{
                //  if(e._id==Action.payload._id){
                //      console.log("element is with id",e._id)
                //      console.log("you have click on element ",e);
                //   let   NewNumber=e.number++;
                //    let   NewIncart=e.incart=true;
                //    console.log("type of cartcost",state.CartCost);
                //      state.CartCost = eval(state.CartCost) + e.price;
                //  }})
           
            
        default:
           return state;
    }
}