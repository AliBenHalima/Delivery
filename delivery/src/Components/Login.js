import React,{useContext,useEffect,useState,Component} from 'react';
import '../App.css';
import { BrowserRouter as Router, Route,Switch,Link, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import axios from "axios";
import Home from './Home';
import Header from './Header';
import { BehaviorSubject,Subject } from "rxjs";
import {useObservable} from "react-use-observable-state";
import * as rxjs from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { of } from 'rxjs';



function Login (props) {

  const [state, setstate] = useState({Email:"",Password:""});
  const [store, setstore] = useState({store:"",login:false,user:{}});
  let history = useHistory();

let Data = {
  Email:state.Email,
  Password:state.Password
}
console.log("Login props are ",props) 
  const Sumbithandle=(e)=>{
    console.log("state is",state);
    axios.post("http://localhost:3000/Sign/SignIn",Data).then((res)=>{
    console.log("Log in Data is here",res);

    res.data.status ? alert(res.data.status)   : alert(res.data.error);
   if (res.data.status)
   { localStorage.setItem("token",res.data.token);
  //  props.names.next("true");
  console.log("Login props are ",props) 
  setstore({store:localStorage.getItem("token"),login:true})
  history.push('/Home')
 

  }
})
  .catch((err)=>{console.log(err)});
    e.preventDefault();  
  
  }
  const ChangeHandleEmail =(e)=>{
    setstate({...state,Email:e.target.value});
  }
  const ChangeHandlePassword =(e)=>{
    setstate({...state,Password:e.target.value});
  }
  let GetAllTrigger=()=>{
    axios.get("http://localhost:3000/User/All", {
         headers: {
          "auth-token":store.store //the token is a variable which holds the token
  
       }}).then((res)=>{console.log(res)})
       .catch((err)=>{console.log(err)});
  }

  // let context = useContext(UserContext);

  // const name = ["Ali","Name1","Name2"];
  // const nameList = name.map(name=><div> {name} </div>)
  // console.log(nameList);

  return (
    
    <div>
<Header />
<div className="reservation-box LoginClass ">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="heading-title text-center">
						<h2>Sign In</h2>
						<p>Sign In in few steps...</p>
					</div>
				</div>
			</div>
      </div>
      </div>
{/* <button onClick={()=>{GetAllTrigger()}} > Click to trigger Get All users</button> */}
<div className=" d-flex justify-content-center">


<form onSubmit={(e)=>Sumbithandle(e)} >
     
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="text"  onChange={(e)=>ChangeHandleEmail(e)} value={state.Email}   className="datepicker picker__input form-control widthclass" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" value={state.Password} onChange={(e)=>ChangeHandlePassword(e)} className="datepicker picker__input form-control widthclass" id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div className="form-check">
    <input type="checkbox"  class="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <div class="submit-button text-center">
  <button  id="submit" type="submit" className="btn btn-common disabled" >Submit</button>
										<div id="msgSubmit" class="h3 text-center hidden"></div> 
										<div class="clearfix"></div> 
									</div>
</form> 
<div>
  <h1> Token exists is {props.tokenExists?  <h1>Hello</h1>:<h1>not </h1>} </h1>
  {/* {state.Email} <br></br> */}
  {/* {state.Password} */}
  <br></br>
  {/* {store.login ? <h6> {store.store}</h6> : "not logged in yet"} */}
</div>
 {/* <div>
  {nameList}
  {context}
</div>  */}
 

</div> 

</div>

  );
}

export default Login;
