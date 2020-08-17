import React,{useContext,useEffect,useState,Component} from 'react';
import '../App.css';
import { BrowserRouter as Router, Route,Switch,Link, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import axios from "axios";
import Home from './Home';
import Header from './Header';

function SignUp() {

    const [state, setstate] = useState({Username:"",Email:"",Password:"",Address:"",Phonenumber:0});
    const [store, setstore] = useState({store:"",login:false,user:{}});
    let history = useHistory();
  
  let Data = {
    Username:state.Username,
    Email:state.Email,
    Password:state.Password,
    Address:state.Address,
    Phonenumber:state.Phonenumber
  }

    const Sumbithandle=(e)=>{
        console.log("state is",state);
        axios.post("http://localhost:3000/Sign/SignUp",Data).then((res)=>{
        console.log("Sign Up Data is here",res);
    
        if(res.data.success){
          alert(res.data.success)  ;
          history.push('/Home');

        }  else{
          alert(res.data.error);
        } 
   
    
      
    })
      .catch((err)=>{console.log(err)});
        e.preventDefault();  
      
      }

      const ChangeHandleUsername =(e)=>{
        setstate({...state,Username:e.target.value});
      }
      const ChangeHandleEmail =(e)=>{
        setstate({...state,Email:e.target.value});
      }
      const ChangeHandlePassword =(e)=>{
        setstate({...state,Password:e.target.value});
      }
      const ChangeHandlePhone =(e)=>{
        setstate({...state,Phonenumber:e.target.value});
      }
      const ChangeHandleAddress =(e)=>{
        setstate({...state,Address:e.target.value});
      }
 

    return (
        <div>
          <Header />
{/* 
          <div className="LoginClass d-flex justify-content-center">
<form onSubmit={(e)=>Sumbithandle(e)} >
<div className="form-group">
    <label for="ExampleUsername">Username</label>
    <input className="datepicker picker__input form-control widthclass" type="text"  onChange={(e)=>ChangeHandleUsername(e)} className="form-control" id="ExampleUsername" placeholder="Username" />
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input className="datepicker picker__input form-control widthclass" type="text"  onChange={(e)=>ChangeHandleEmail(e)} value={state.Email}   className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input className="datepicker picker__input form-control widthclass" type="password"  onChange={(e)=>ChangeHandlePassword(e)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
  
  <div className="form-group">
    <label for="exampleInputAddress">Address</label>
    <input className="datepicker picker__input form-control widthclass" type="text"  onChange={(e)=>ChangeHandleAddress(e)} className="form-control" id="exampleInputAddress" placeholder="Address" />
  </div>
  <div className="form-group">
    <label for="exampleInputPhone">Phone Number</label>
    <input className="datepicker picker__input form-control widthclass" type="Number"  onChange={(e)=>ChangeHandlePhone(e)} className="form-control" id="exampleInputPhone" placeholder="Phone Number" />
  </div>

  <div className="form-check">
    <input className="datepicker picker__input form-control widthclass" type="checkbox"  class="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  
  <div class="submit-button text-center">
  <button  id="submit" type="submit" className="btn btn-common disabled" >Submit</button>
										<div id="msgSubmit" class="h3 text-center hidden"></div> 
										<div class="clearfix"></div> 
									</div>
</form> 
<div>
  {state.Email} <br></br>
  {state.Password}
  <br></br>
  {store.login ? <h6> {store.store}</h6> : "not logged in yet"}
</div>
 {/* <div>
  {nameList}
  {context}
</div>  */}
 

{/* </div>   */}

<div className="reservation-box LoginClass ">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="heading-title text-center">
						<h2>Sign Up</h2>
						<p>Sign up in few steps...</p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-12 col-sm-12 col-xs-12">
					<div className="contact-block">
          <form onSubmit={(e)=>Sumbithandle(e)} >
            	<div className="row">
								<div className="col-md-6">
			{/* <h3>Book a table</h3> */}
									<div className="col-md-12">
<div className="form-group">
    <label for="ExampleUsername">Username</label>
    <input className="datepicker picker__input form-control widthclass" type="text"  onChange={(e)=>ChangeHandleUsername(e)} className="form-control" id="ExampleUsername" placeholder="Username" />
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input className="datepicker picker__input form-control widthclass" type="text"  onChange={(e)=>ChangeHandleEmail(e)} value={state.Email}   className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input className="datepicker picker__input form-control widthclass" type="password"  onChange={(e)=>ChangeHandlePassword(e)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
  
  {/* <div className="form-group">
    <label for="exampleInputAddress">Address</label>
    <input className="datepicker picker__input form-control widthclass" type="text"  onChange={(e)=>ChangeHandleAddress(e)} className="form-control" id="exampleInputAddress" placeholder="Address" />
  </div>
  <div className="form-group">
    <label for="exampleInputPhone">Phone Number</label>
    <input className="datepicker picker__input form-control widthclass" type="Number"  onChange={(e)=>ChangeHandlePhone(e)} className="form-control" id="exampleInputPhone" placeholder="Phone Number" />
  </div>

  <div className="form-check">
    <input className="datepicker picker__input form-control widthclass" type="checkbox"  class="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
  
  
                  </div> 
</div>

<div className="col-md-6">
			{/* <h3>Book a table</h3> */}
    
      <div className="col-md-12">
      <div className="form-group">
    <label for="exampleInputAddress">Address</label>
    <input className="datepicker picker__input form-control widthclass" type="text"  onChange={(e)=>ChangeHandleAddress(e)} className="form-control" id="exampleInputAddress" placeholder="Address" />
  </div>

  <div className="form-group">
    <label for="exampleInputPhone">Phone Number</label>
    <input className="datepicker picker__input form-control widthclass" type="text"  onChange={(e)=>ChangeHandlePhone(e)} className="form-control" id="exampleInputPhone" placeholder="Phone Number" />
  </div>
 
</div>
</div>
</div> 
<div class="col-md-12">
									<div class="submit-button text-center">
  <button  id="submit" type="submit" className="btn btn-common disabled" >Submit</button>
										<div id="msgSubmit" class="h3 text-center hidden"></div> 
										<div class="clearfix"></div> 
									</div>
                  </div>
                  
</form> 
</div> 

</div> 
</div> 

</div> 
</div> 


</div> 
    )
}

export default SignUp
