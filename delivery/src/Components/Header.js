import React, { Component ,useState,useEffect} from 'react'
import { BrowserRouter as Router, Route,Switch,Link,Redirect, withRouter } from 'react-router-dom';
import About from './About';
import {checkAuth }from './Functions';
import {Signout } from './Functions';
import {PrivateRoute} from './Functions';
import { BehaviorSubject } from "rxjs";
import {useObservable} from "react-use-observable-state";
import * as rxjs from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { of } from 'rxjs';
import { postfailed, refreshStore } from '../Redux/Authentification/actions';
import { connect } from 'react-redux';

function Header({dispatch_SignOut,dispatch_Refresh,isAuthenticated}) {
    
const [state, setstate] = useState({isAuthenticated:false});
const [element, setelement] = useState({elements:[]});

useEffect(() => {
	var loadScript = function (src) {
		var tag = document.createElement('script');
		tag.async = false;
		tag.src = src;
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(tag);
	  }
  
	  loadScript('assets/js/custom.js');
	  loadScript('assets/js/contactMap.js');
	
	let token = localStorage.getItem("token")
	if(token)
	dispatch_Refresh();
}, [])


 const checkAuth = ()=>{
    let token =localStorage.getItem("token");
    if (token){
        state.isAuthenticated = true;
        
        }else{
            state.isAuthenticated = false }

return state.isAuthenticated;
};
// module.exports.checkAuth;
 const Signout=(cb)=>{
    state.isAuthenticated=false ;
    setTimeout(cb, 500);
};
// module.exports.Signout;
 const PrivateRoute = ({component:Component, ...rest})=>(
    <Route {...rest } render={(props)=>(
        checkAuth()
         ? <Component {...props} />
        :
        <Redirect to="/Login" />
    
    )} />
		);
// module.exports.PrivateRoute;
	const LogButton =withRouter(({history})=>{
		checkAuth();
		if (state.isAuthenticated){
			return(
				<div>
					 <Link to="/Logout">	<li className="nav-item"><a onClick={()=>Signout(()=>{
						 localStorage.removeItem("token");
						 dispatch_SignOut();
						//  props.names.next("false");
						 history.push("/Home")

					 }

					 )} className="nav-link" href="#">Logout</a></li></Link>
				</div>
			)
		}
		else{
			return(
				<div>
					 <Link to="/Login">	<li className="nav-item"><a className="nav-link" href="#">Login</a></li></Link>
				</div>
			)
		}
	})

	

// const source = ['Adam', 'Brian', 'Christine'];
// const names$ = new BehaviorSubject(0)
// const [names, setNames] = useState();

//   useEffect(() => {
	// const subscription = names$.subscribe((v)=>{console.log("hello",v)});
	// names$.next(1);
    // return () => subscription.unsubscribe();
//   });
    return (
        <div>
            



            <header className="top-navbar">
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="index.html">
					<img src="assets/images/logo.png" alt="error loading the img" />
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
				  <span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbars-rs-food">
					<ul className="navbar-nav ml-auto">
						<Link to="/Home" ><li className="nav-item active"><a className="nav-link">Home</a></li></Link>
					<Link to="/Menu">	<li className="nav-item"><a className="nav-link" >Menu</a></li> </Link>
						<Link to="/Admin">	<li className="nav-item"><a className="nav-link" >Admin</a></li></Link>
	<PrivateRoute path="/About"  component={About} />
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="dropdown-a" data-toggle="dropdown">Pages</a>
							<div className="dropdown-menu" aria-labelledby="dropdown-a">
								<Link to="/Reservation"><a className="dropdown-item">Reservation</a></Link>
								<a className="dropdown-item" href="stuff.html">Stuff</a>
								<a className="dropdown-item" href="gallery.html">Gallery</a>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="dropdown-a" data-toggle="dropdown">Blog</a>
							<div className="dropdown-menu" aria-labelledby="dropdown-a">
								<a className="dropdown-item" href="blog.html">blog</a>
								<a className="dropdown-item" href="blog-details.html">blog Single</a>
							</div>
						</li>
						<Link to="/Contact"><li className="nav-item"><a className="nav-link" >Contact</a></li></Link>
						{/* <Link to="/Login">	<li className="nav-item"><a className="nav-link" href="#">Login</a></li></Link> */}
					<LogButton />
					<Link to="/SignUp">	<li className="nav-item"><a className="nav-link" >SignUp</a></li></Link>
					</ul>
				</div>
			</div>
		</nav>
	</header>

        </div>
    )
}

const mapStateToProps=(state)=>{
    return{ isAuthenticated: state.postRed.authenticated
    }
  }
  
  const mapDispatchToProps =(dispatch)=>{
	return{ dispatch_SignOut: ()=> dispatch(postfailed("You Logged off successfully")),
	dispatch_Refresh:()=> dispatch(refreshStore("store refreshed")),
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Header);
