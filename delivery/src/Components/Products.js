import React,{useContext,useEffect,useState,Component} from 'react';
import Opt from './Opt'
import { BrowserRouter as Router, Route,Switch,Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch,shallowEqual, connect } from "react-redux";
import { FetchProducts, PostProducts } from '../Redux/Products/actions';
import { ADD_TOCART } from '../Redux/Cart/types';
import { AddtoCard } from '../Redux/Cart/actions';


function Products({dispatch_PostProducts,dispatch_Cart,...props}) {

  const [state, setstate] = useState({Email:"",PhoneNumber:null,Address:"",ResevedFor:"",Product:""});
  let productsList =useSelector(state=>state.FetchProd.products);
  let isAuthenticated = useSelector(state => state.postRed.authenticated);
  let history = useHistory();
  const token =localStorage.getItem('token');
  
  let Data = {
    Email: state.Email,
    PhoneNumber: state.PhoneNumber,
    Address: state.Address,
	Description: state.Description,
	Product: state.Product
  };
  
  
    console.log("authentiifcatipn prodicts",isAuthenticated);
    console.log("props areee ",props.index);
    const affectProducts=()=>{
      console.log("event is ",props.data);
      

    }
    const Sumbithandle = (e) => {
      dispatch_PostProducts(Data);
      history.push('/Home') 
    
      e.preventDefault();
    };

    const ChangeHandleEmail =(e)=>{
      setstate({...state,Email:e.target.value});
    }
    const ChangeHandleNumber =(e)=>{
      setstate({...state,PhoneNumber:e.target.value});
    }
    const ChangeHandleAddress =(e)=>{
      setstate({...state,Address:e.target.value});
    }
    const ChangeHandleDescription =(e)=>{
      setstate({...state,Description:e.target.value});
    }
    
    const ChangeHandleProduct =(e)=>{
    e.persist()
      console.log("e value is ",e.target.value);
      setstate({...state,Product:e.target.value});
    }
    const Test=()=>{
      dispatch_Cart(props.data);
    }
    
    return (
        <React.Fragment>
                 <div className="col-lg-4 col-md-6 special-grid drinks">
                      <div className="gallery-single fix imageClass">
                        <img
                          src={props.data.file}
                          className="img-fluid imageClass"
                          alt="Image"
                        />
                        <div className="why-text">
                          <h4>{props.data.name}</h4>
                          <p>{props.data.category}</p>
                          <h5> ${props.data.price}</h5>
                          <p><button class="btn btn-lg btn-circle btn-outline-new-white" onClick={Test} href="">Add</button></p>
                          <p><button onClick={()=>affectProducts()} data-toggle="modal" data-target={"#exampleModal"+props.index} className="btn btn-lg btn-circle btn-outline-new-white"  disabled={!isAuthenticated}>Order Now!</button></p>   
                        
                                               </div>
                  
                      </div>
                    </div>
                    {/* model here */}
                    <div class="modal fade" id={"exampleModal"+props.index} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title " id="exampleModalLabel">Order {props.data.name} Now ! </h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={(e)=>Sumbithandle(e)} >
      <div class="modal-body">

      <div className="form-group">
											<input id="input_email" value={state.Email} onChange={(e)=>ChangeHandleEmail(e)} placeholder="Email" type="email" className="datepicker picker__input form-control" name="Email" type="text"  equired data-error="Please enter Email" />
											<div className="help-block with-errors"></div>
			</div>  
<div className="form-group">
											<input type="text" id="input_Number" value={state.PhoneNumber} onChange={(e)=>ChangeHandleNumber(e)} placeholder="PhoneNumber" className="time form-control picker__input" required data-error="Please enter PhoneNumber" />
											<div className="help-block with-errors"></div>
</div>        
										

      <div className="form-group">
      <select onChange={(e)=>ChangeHandleProduct(e)} className="custom-select d-block form-control" id="person" required data-error="Please select a Meal">
	{/* <option disabled selected>Select Meal*</option> */}

	{/* {productsList.map((value, index) => {
	return <Opt key={index} data={value} index={index} />
	})} */}
  <Opt  data={props.data}
				/>										
		</select>
        <div className="help-block with-errors"></div>
		</div> 
								

    <div className="form-group">
											<input type="text" className="form-control" value={state.Address} onChange={(e)=>ChangeHandleAddress(e)} id="name" name="Address" placeholder="Address" required data-error="Please enter your address"/>
											<div className="help-block with-errors"></div>
										</div>          

                    <div className="form-group">
											<textarea type="text" placeholder="Description" id="Description" value={state.Description} onChange={(e)=>ChangeHandleDescription(e)} className="form-control" name="Description" required data-error="Please enter your Description" />
											<div className="help-block with-errors"></div>
										</div> 

                    <div className="submit-button text-center">
									<button  id="submit" type="submit" className="btn btn-common disabled" >Order </button>										<div id="msgSubmit" class="h3 text-center hidden"></div> 
										<div className="clearfix"></div> 
									</div>
		<div className="clearfix"></div> 





    
      </div>
      </form>
    </div>
  </div>

</div>
                    </React.Fragment>
    )
}
const mapDispatchToProps =(dispatch)=>{
  return{
    dispatch_PostProducts: (Data,token)=> dispatch(PostProducts(Data,token)),
    dispatch_Cart: (product)=> dispatch(AddtoCard(product))
}}

export default connect(null,mapDispatchToProps)(Products); 
