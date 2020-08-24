import { FETCH_PRODUCTS_SUCCESS,FETCH_PRODUCTS_FAIL, POST_PRODUCTS_FAIL, POST_PRODUCTS_SUCCESS } from "./types";

const ProductsState={
    products:[],
    status:""
}

export const FetchProd_Red=(state=ProductsState,Action)=>{
    switch (Action.type) {
            case FETCH_PRODUCTS_SUCCESS:
            //     let st = {...state};
            //     st.authenticated = true;
            // return {...state,st    }
            return{
                ...state, products:Action.payload, status:"Fetch Products Succeeded"
            }
            case FETCH_PRODUCTS_FAIL:
            return {
                ...state, status:"Fetch Products FAILED"
            }
            case POST_PRODUCTS_SUCCESS:
                return {
                    ...state, status:"POST Products SUCCEEDED"
                }
            case POST_PRODUCTS_FAIL:
                return {
                    ...state, status:"POST Products FAILED"
                }
          
                
            
        default:
           return state;
    }
}