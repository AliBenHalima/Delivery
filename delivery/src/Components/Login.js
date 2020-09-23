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
import { PostLogin, Postlogup,postsuccess,postfailed } from "../Redux/Authentification/actions";
import { store } from "../Redux/store";
import { useToasts } from 'react-toast-notifications'


    
function Login({dispatch_Users,isAuthenticated,...props}) {
  const { addToast } = useToasts();
  const Authstate = useSelector(state => state.postRed)
  const username = useSelector(state => state.postRed.status.username)
  const [state, setstate] = useState({ Email: "", Password: "" });
  const [store, setstore] = useState({ store: "", login: false, user: {} });
  let history = useHistory();

  let Data = {
    Email: state.Email,
    Password: state.Password,
  };
  // console.log(props, "props are");
  // console.log("Login props are ",props)
  //let dsf = useSelector(state => state.postRed);
  // const dispatch_Users = useDispatch();
  // let isAuthenticated = useSelector(state => state.postRed.authenticated);

  const Sumbithandle = (e) => {
    console.log("isauthen 1st", isAuthenticated);

    // dispatch_Users(Data);
    axios.post("http://localhost:3000/Sign/SignIn",Data).then((response) => {
      const info = response.data
      console.log("infos are ",info);
      if (response.data.status=="POST SUCCEEDED")
      { localStorage.setItem("token",response.data.token); 
       props.PostSuccess(info,response.userId,response.role) 
      }
       else{
        props.PostFailed(response.data.error)
        addToast(response.data.status, {
          appearance: 'error',
          autoDismiss: true,
        })
       }
         
         
    }).catch(error=>{
        const errorMsg = error.message;
        addToast(error.message, {
          appearance: 'error',
          autoDismiss: true,
        })
        props.PostFailed(errorMsg);
    });

    
    console.log("isauthen 2nd", isAuthenticated);
    // setTimeout(() => {
    //   console.log("isauthen ", isAuthenticated);
    // },2000)

    //console.log("storeValue is", props);
    // store.login=true;
    // console.log("store is",store.getState())
    // history.push('/Home')
    e.preventDefault();
  
    //  props.names.next("true");
    // console.log("Login props are ",props)
  };

  // .catch((err)=>{console.log(err)});
  //   e.preventDefault();

  const ChangeHandleEmail = (e) => {
    setstate({ ...state, Email: e.target.value });
  };
  const ChangeHandlePassword = (e) => {
    setstate({ ...state, Password: e.target.value });
  };
  // let GetAllTrigger = () => {
  //   axios
  //     .get("http://localhost:3000/User/All", {
  //       headers: {
  //         "auth-token": store.store, //the token is a variable which holds the token
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
   console.log("useeffect auth",isAuthenticated);
  if(isAuthenticated && Authstate.status.role=="Admin"){
    history.push('/Dashboard')
  } else if( isAuthenticated && Authstate.status.role=="User")
    history.push('/Home')
  else{
    history.push('/Login')
  }
   if(isAuthenticated){
    addToast(`Welcome ${username}`, {
          appearance: 'success',
          autoDismiss: true,
        })
      }
      // if(!isAuthenticated && Authstate.error){

      
      //   addToast(`${Authstate.error}`, {
      //         appearance: 'error',
      //         autoDismiss: true,
      //       })
      //       setstate({  ...state,Email: "", Password: "" })
          
      // }
        //  if(Authstate.error !=""){
        //   addToast(`${Authstate.error}`, {
        //     appearance: 'error',
        //     autoDismiss: true,
        //   })
        

        // }
  //  if(!username){
  //   addToast(`Welcome ${username}`, {
  //         appearance: 'success',
  //         autoDismiss: true,
  //       })
      
  //       }

  },[Authstate]);

  // useEffect(() => {
  
 
  //  },[])

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
        <form onSubmit={(e) => Sumbithandle(e)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              onChange={(e) => ChangeHandleEmail(e)}
              value={state.Email}
              className="datepicker picker__input form-control widthclass"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              value={state.Password}
              onChange={(e) => ChangeHandlePassword(e)}
              className="datepicker picker__input form-control widthclass"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
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
        <div>
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
 const mapStateToProps=(state)=>{
    return{ isAuthenticated: state.postRed.authenticated
    }
  }
  
  const mapDispatchToProps =(dispatch)=>{
    return{ dispatch_Users: (Data)=> dispatch(PostLogin(Data)),
      PostSuccess: (info,id)=> dispatch(postsuccess(info,id)),
      PostFailed: (error)=> dispatch(postfailed(error))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Login);
