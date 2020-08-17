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

import { Provider } from 'react-redux'
// import createStore from './createReduxStore'
import {store} from './Redux/store'
import TestToDelete from './Components/TestToDelete';

export const UserContext = React.createContext();
function App() {
  // RXJS shit 
  let tokenExists="nodata";
const names$ = new Subject()
// const [names, setNames] = useState();

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
            tokenExists=="true" ? <Redirect to='/Home' />:  <Login names={names$} /> 
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
            token ? <Redirect to='/Home' /> : <SignUp /> )}>   
          </Route>

          <Route path="/test" component={About} />
          <Route path="/Reservation" component={Reservation} />
          <Route path="/Menu" component={Menu} />
          <Route path="/Contact" component={Contact} />

        
          {/* <Route path="/About" component={About} /> */}
          <Route path="/" component={Home} />
          
    
        
       </Switch>
       </div>
       </Router>
       </Provider>
  );
}

export default App;
