import React, { useContext, useEffect, useState, Component } from "react";
import "../App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import Home from "./Home";
import Header from "./Header";
import { BehaviorSubject, Subject } from "rxjs";
import { useObservable } from "react-use-observable-state";
import * as rxjs from "rxjs";
import { map, startWith } from "rxjs/operators";
import { of } from "rxjs";
import { useSelector, useDispatch,shallowEqual, connect } from "react-redux";
import { PostLogin, Postlogup } from "../Redux/Authentification/actions";
import { store } from "../Redux/store";


function Admin_() {
    const [state, setstate] = useState({ name: "", price: "" ,category:"",CookingTime:"",file:null});
	const [store, setstore] = useState({ store: "", login: false, user: {} });
	let history = useHistory();

	

	let Data = {
		name: state.name,
		price: state.price,
		category: state.category,
		file: state.file,
	};
	const Data2 = new FormData();
		Data2.append('name', state.name);
		Data2.append('price', state.price);
		Data2.append('category', state.category);
		Data2.append('CookingTime', state.CookingTime);
		Data2.append('file', state.file);

	const Sumbithandle = (e) => {
		
		console.log(Data2,"is data2");
		axios.post("http://localhost:3000/Product/AddProductTest",Data2).then((response) => {
			const info = response
			console.log("infos are ",info);
		if(response.data.id) {
            history.push('/Home')}
            else{
                setstate({});
             history.push('/Admin')
            }    

        
			
			 
		  }).catch(error=>{
			console.log("errors are ",error);
		  });
			e.preventDefault();
	  
	  
	};
  

  
	const ChangeHandleName = (e) => {
	  setstate({ ...state, name: e.target.value });
	};
	const ChangeHandlePrice = (e) => {
	  setstate({ ...state, price: e.target.value });
	};
	const ChangeHandleCategory = (e) => {
		setstate({ ...state, category: e.target.value });
	  };
	  const ChangeHandleCooking = (e) => {
		setstate({ ...state, CookingTime: e.target.value });
	  };

	  const ChangeHandleFile = (e) => {
		setstate({ ...state, file: e.target.files[0] });
		e.persist()
		console.log("event e is ",e)
	  };

  

  
	// useEffect(() => {
	

  return (
    <div>
		<Header />
      <div className=" d-flex justify-content-center LoginClass">
        <form onSubmit={(e) => Sumbithandle(e)}>
          <div className="form-group">
            <label for="exampleInputEmail1">name</label>
            <input
              type="text"
              onChange={(e) => ChangeHandleName(e)}
              value={state.name}
              className="datepicker picker__input form-control widthclass"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter name"
            />
          
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">price</label>
            <input
              type="text"
              value={state.price}
              onChange={(e) => ChangeHandlePrice(e)}
              className="datepicker picker__input form-control widthclass"
              id="exampleInputPassword1"
              placeholder="price"
            />
          </div>
		  <div className="form-group">
            <label for="exampleInputPassword1">category</label>
            <input
              type="text"
              value={state.category}
              onChange={(e) => ChangeHandleCategory(e)}
              className="datepicker picker__input form-control widthclass"
              id="exampleInputPassword1"
              placeholder="category"
            />
			  </div>

			  <div className="form-group">
            <label for="exampleInputPassword1">Cooking Time</label>
            <input
              type="text"
              value={state.CookingTime}
              onChange={(e) => ChangeHandleCooking(e)}
              className="datepicker picker__input form-control widthclass"
              id="exampleInputPassword1"
              placeholder="Cooking time"
            />
			  </div>

        <div class="custom-file">
    <input type="file" className=" widthclass custom-file-input" id="validatedCustomFile"  name="file" onChange={(e)=>ChangeHandleFile(e)}  />
    <label className="custom-file-label" for="validatedCustomFile">Choose file...</label>
    <div className="invalid-feedback">Example invalid custom file feedback</div>
  </div>




       {/* <div class="form-group">
    <label for="exampleFormControlFile1">Example file input</label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1" name="file" onChange={(e)=>ChangeHandleFile(e)} />
  </div> */}
          <div class="submit-button text-center">
            <button
              id="submit"
              type="submit"
              className="btn btn-common disabled"
            >
              Submit
            </button>
            <div id="msgSubmit" class="h3 text-center hidden"></div>
            <div class="clearfix"></div>
          </div>
        </form>

      </div>
    </div>
	
  );
}

export default Admin_
