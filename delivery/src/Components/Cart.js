import React, { useState, Fragment, useEffect } from 'react'
import { useSelector, useDispatch,shallowEqual, connect } from "react-redux";
import Products from './Products'
import { Increment, Decrement,ChangeState, Switch_Data, AttenteDelete_All } from '../Redux/Cart/actions'
import { DECREMENT } from '../Redux/Cart/types'
import Header from './Header';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'
import axios from "axios";



function Cart(props) {
  const token = localStorage.getItem("token");

    const { addToast } = useToasts();
    const state = useSelector(state => state.ADDReducer)
    const [numberProd, setnumberProd] = useState({state:state})
    // const [CategoryName, setCategoryName] = useState("")

    
    const Increment=(state,number)=>{
        props.dispatch_Increment(state,number);
        addToast("Product number increased", {
          appearance: 'success',
          autoDismiss: true,
        })
        setnumberProd(number++)
    }
    const Decrement=(state,number)=>{
     
        props.dispatch_decrement(state,number);
        // props.dispatch_Increment(state,number);
        addToast("Product number decreased", {
          appearance: 'success',
          autoDismiss: true,
        })
        setnumberProd(number--)
    }
    const deleteEventAll=(e,product)=>{
      addToast("Products moved to Attente cart", {
        appearance: 'success',
        autoDismiss: true,
      })
      props.dispatch_to_Attente(product);
      props.dispatch_Delete_All();
  }

const TableRow =(props)=>{
  const deleteEvent=(prod)=>{
    const check=window.confirm("Do you want to remove this product from cart ?")
if(check) {
    let copy =state.products;
    const index_ = copy.indexOf(prod);
    console.log("index_ is ",index_)
    copy.splice(index_,1)
    console.log("newarr is ",copy)
    console.log("prod is ",prod)
    props.disp(copy,prod.number,prod.price);
    addToast("Product removed", {
      appearance: 'error',
      autoDismiss: true,
    })
      // const newArr= state.products.splice(index,1);
      // props.dispatch_New_Product(newArr);
      // e.preventDefault(); 
  }
  }
  useEffect(() => {
    state.products.forEach((element)=>{
      if(element.number ==0){
            let copy =state.products;
            const index_ = copy.indexOf(element);
            copy.splice(index_,1)
            props.disp(copy,element.number,element.price);
            addToast("Product removed", {
              appearance: 'error',
              autoDismiss: true,
            })
      }
    })
    
  })

    return(
        <Fragment >
    <tr>
    <td><img src={props.data.file} className="rounded-top imageClassCart imageClassCart" /></td>
    <td><strong> {props.data.name}</strong></td>
    {/* <p>{CategoryName}</p> */}
    <td className="widthClass">
    {/* <form className="form-inline"> */}
      <div className="container">
      <div className="row">
      <div className="col-2">
      {/* <i class="fas fa-minus text-warning" onClick={() => props.Decrement(props.data, props.data.number)} ></i> */}
      <a className="h4" type="button" onClick={() => props.Decrement(props.data, props.data.number)}  aria-label="Left Align">-</a>
</div>
<div className="col-4">
      <p className="text-center h4"> {props.data.number} </p>
      </div>
      <div className="col-2">
      {/* <i class="fas fa-plus text-warning" onClick={() => props.Increment(props.data, props.data.number)} ></i> */}
      <a className="h4" type="button" onClick={() => props.Increment(props.data, props.data.number)}  aria-label="Left Align">+</a>
</div>

      {/* <input className="form-control" type="text" /> */}
        {/* <button rel="tooltip" className="btn btn-default"><i className="fa fa-pencil"></i></button> */}
        {/* <button onClick={(e)=>{deleteEvent(e,props.data)}} href="#" className="text-white btn btn-lg btn-circle btn-outline-new-white"><i className="fa fa-trash-o"></i></button> */}
       <button className="btn btn-lg btn-circle btn-outline-new-white" onClick={()=>{deleteEvent(props.data)}}><i className="fa fa-trash-o"></i></button>
        {/* onMouseEnter={(e)=>{deleteEvent(e,props.data)}} */}
        </div>
</div>
    {/* </form> */}
    </td>
    <td>{props.data.price}$</td>
    <td>{props.data.price*props.data.number}$</td>
</tr>
</Fragment>
    )}
    

    return (
      <div>
        <Header />
        
        <div className=" LoginClass container bootstrap snippets bootdey">




          <div className="col-md-12 content">
            <div className="row"></div>
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-info panel-shadow">
                  <div className="panel-heading">
                    <h3>
                      {/* <img
                        className="img-circle img-thumbnail"
                        src="https://bootdey.com/img/Content/user_3.jpg"
                      /> */}
                      Your Cart...
                    </h3>
                  </div>
                  <div className="panel-body">
                    <div className="table-responsive ">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th className="text-center">Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.products.map((value, index) => {
                            return (
                              <TableRow
                                key={index}
                                data={value}
                                index={index}
                                disp={props.dispatch_New_Product}
                                Increment={Increment}
                                Decrement={Decrement}
                                // delete={deleteEvent}
                              />
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Sum</th>
                            <th>{state.CartCost}$</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <Link to="/Menu">
                  {" "}
                  <a className="text-white btn btn-lg btn-circle btn-outline-new-white">
                    <span className="glyphicon glyphicon-arrow-left"></span>
                    &nbsp;Continue Shopping
                  </a>
                </Link>
                <a
                  href="#"
                  className="btn btn-lg btn-circle btn-outline-new-white pull-right"
                >
                  Pay
                  <span className="glyphicon glyphicon-chevron-right"></span>
                </a>
              
                <a
                  href="#" 
                  onClick={(e)=>deleteEventAll(e,state.products)}
                  className="btn btn-lg btn-circle btn-outline-new-white pull-right"
                >
                En Attente
                  <span className="glyphicon glyphicon-chevron-right"></span>
                </a>
          
              </div>
            </div>
          </div>
        </div>

        {/* {state.products.map((value, index) => {
          return (
            <div>
              <h1>{value.name}</h1> <h1>{value.name}</h1>
              <button onClick={() => Increment(value, value.number)}>+</button>
              <h1>{value.number}</h1>
              <button onClick={() => Decrement(value, value.number)}>-</button>
            </div>
          );
        })} */}
      </div>
    );
}
const mapDispatchToProps =(dispatch)=>{
	return{ dispatch_Increment: (state,number)=> dispatch(Increment(state,number)),
    dispatch_decrement: (state,number)=> dispatch(Decrement(state,number)),
    dispatch_New_Product:(newProduct,number,cost)=>dispatch(ChangeState(newProduct,number,cost)),
    dispatch_to_Attente:(Products)=>dispatch(Switch_Data(Products)),
    dispatch_Delete_All:()=>dispatch(AttenteDelete_All()),
    }
  }
export default connect(null,mapDispatchToProps)(Cart);
