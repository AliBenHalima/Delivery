import React from 'react'
import { useSelector } from 'react-redux'
import Products from './Products'

function Cart() {
    const state = useSelector(state => state.ADDReducer.products)
    return (
        <div>
           {state.map((value, index) => {
			return <h1>{value.name}</h1>
										  })}
												
        </div>
    )
}

export default Cart
