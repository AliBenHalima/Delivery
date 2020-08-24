import React,{useContext,useEffect,useState,Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import { BrowserRouter as Router, Route,Switch,Link,Redirect, withRouter } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import SignUp from './Components/SignUp';
import Reservation from './Components/Reservation';
import Menu from './Components/Menu';
import Contact from './Components/Contact';
import { BehaviorSubject,Subject } from "rxjs";
import {useObservable} from "react-use-observable-state";
import * as rxjs from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { of } from 'rxjs';
import { Provider, connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
// import createStore from './createReduxStore'
import {store} from './Redux/store'
import TestToDelete from './Components/TestToDelete';
import { PostLogin } from './Redux/Authentification/actions';
import Admin from './Components/Admin';

// import { connect } from 'react-redux';


export const UserContext = React.createContext();

function App({isAuthenticated}) {

  // RXJS shit 
  let tokenExists="nodata";
  console.log("test",store.getState().postRed.authenticated)
const names$ = new Subject()
// const [names, setNames] = useState();

console.log("Store authentificated value is ",store.getState().postRed.authenticated);
  useEffect(() => {
	const subscription = names$.subscribe((v)=>{console.log("subscription accomplished",v); tokenExists=v});
  
  // names$.next(1);
    // return () => subscription.unsubscribe();
  });
  const [state, setstate] = useState({login:"true",user:{}});




const data=(PassedData)=>{
 return PassedData;
}
const token = localStorage.getItem('token');
  return ( 

    
  <Provider store={store} >
{/* <TestToDelete /> */}

    <Router>
    <div>
    {/* <Navbar /> */}
    <Switch>


          <Route path="/Login" component={()=>(
            isAuthenticated ? <Redirect to='/Home' />:  <Login store={store.getState().postRed.authenticated} /> 
          )}>
          </Route>
            {/* <UserContext.Provider value={"Hello Ali"} >
           
            <Login  />
            </UserContext.Provider> */}
    
          {/* <Route path="/Login" component={Login} /> */}
          <Route path="/Home">
            <Home names={names$} />
            </Route>
          <Route path="/Logout" component={()=>{
            // names$.next(false); return <Home />
            return <Home />
          }} />

          <Route path="/SignUp" component={()=>(
            isAuthenticated ? <Redirect to='/Home' /> : <SignUp /> )}>   
          </Route>

          <Route path="/test" >
            <About />
            </Route>

          <Route path="/Reservation" component={()=>(
            isAuthenticated ? <Reservation />:  <Login /> 
          )}>
              </Route>
          <Route path="/Menu" component={Menu} />
          {/* <Route path="/Admin" component={Admin} /> */}
          <Route path="/Admin" component={()=>(
            isAuthenticated ? <Admin />:  <Login /> 
          )}>
          </Route>
          <Route path="/Contact" component={Contact} />

        
          {/* <Route path="/About" component={About} /> */}
          <Route path="/" component={Home} />
          
    
        
       </Switch>
       </div>
       </Router>
       </Provider>
  );
}

const mapStateToProps=(state)=>{
  return{ isAuthenticated: state.postRed.authenticated
  }
}

const mapDispatchToProps =(dispatch)=>{
  return{ dispatch_Users: ()=> dispatch(PostLogin())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
