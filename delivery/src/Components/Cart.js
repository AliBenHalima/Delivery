import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch,shallowEqual, connect } from "react-redux";
import Products from './Products'
import { Increment, Decrement } from '../Redux/Cart/actions'
import { DECREMENT } from '../Redux/Cart/types'
import Header from './Header';
import { Link } from 'react-router-dom';

function Cart(props) {
    const state = useSelector(state => state.ADDReducer)
    const [numberProd, setnumberProd] = useState({state:state})
    
    const Increment=(state,number)=>{
        props.dispatch_Increment(state,number);
        setnumberProd(number++)
    }
    const Decrement=(state,number)=>{
        props.dispatch_decrement(state,number);
        setnumberProd(number--)
    }

const TableRow =(props)=>{
    return(
        <Fragment >
        <p> {props.index} isss</p>
    <tr>
    <td><img src={props.data.file} className="rounded-top w-25 h-25" /></td>
    <td><strong> {props.data.name}</strong><p>{props.data.category}</p></td>
    <td>
    <form className="form-inline">
      <p className="ml-5 mr-5"> {props.data.number} </p>
      {/* <input className="form-control" type="text" /> */}
        {/* <button rel="tooltip" className="btn btn-default"><i className="fa fa-pencil"></i></button> */}
        <a href="#" className="text-white btn btn-lg btn-circle btn-outline-new-white"><i className="fa fa-trash-o"></i></a>
    </form>
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
                      <img
                        className="img-circle img-thumbnail"
                        src="https://bootdey.com/img/Content/user_3.jpg"
                      />
                      User
                    </h3>
                  </div>
                  <div className="panel-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th className="text-center">Qty</th>
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
                        <th>{state.CartCost} $</th>
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
              </div>
            </div>
          </div>
        </div>

        {state.products.map((value, index) => {
          return (
            <div>
              <h1>{value.name}</h1> <h1>{value.name}</h1>
              <button onClick={() => Increment(value, value.number)}>+</button>
              <h1>{value.number}</h1>
              <button onClick={() => Decrement(value, value.number)}>-</button>
            </div>
          );
        })}
      </div>
    );
}
const mapDispatchToProps =(dispatch)=>{
	return{ dispatch_Increment: (state,number)=> dispatch(Increment(state,number)),
		dispatch_decrement: (state,number)=> dispatch(Decrement(state,number))
    }
  }
export default connect(null,mapDispatchToProps)(Cart);
