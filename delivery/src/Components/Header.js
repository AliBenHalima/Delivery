import React, { Component,Fragment, useState,useEffect} from 'react'
import { BrowserRouter as Router, Route,Switch,Link,Redirect, withRouter } from 'react-router-dom';
import About from './About';
import {checkAuth }from './Functions';
import {PrivateRoute} from './Functions';
import { BehaviorSubject } from "rxjs";
import {useObservable} from "react-use-observable-state";
import * as rxjs from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { of } from 'rxjs';
import { postfailed, refreshStore,Signout } from '../Redux/Authentification/actions';
import { Reset_store,Reset_store_attente } from '../Redux/Cart/actions';
import { FetchProducts } from '../Redux/Products/actions';
import { useSelector, useDispatch,shallowEqual, connect } from "react-redux";
import { useToasts } from 'react-toast-notifications'


function Header({dispatch_SignOut,dispatch_Refresh,CartNumber,isAuthenticated,dispatch_Delete,dispatch_Products,dispatch_Delete_attente}) {
	const { addToast } = useToasts()
const [state, setstate] = useState({isAuthenticated:false});
const role = useSelector(state => state.postRed.status.role)

const [element, setelement] = useState({elements:[]});
const AttenteNumber = useSelector(state => state.Attente.BasketNumber)
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
	//   dispatch_Products()
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
const LogupCheck =()=>{
if(!isAuthenticated){
	return <Link to="/SignUp">	<li className="nav-item"><a className="nav-link" >SignUp</a></li></Link>
}return (null); }
const AdminCheck =()=>{
	if(isAuthenticated && role=="Admin"){
		return 	<Link to="/Dashboard">	<li className="nav-item"><a className="nav-link" >Dashboard</a></li></Link>
	}return (null); }

	const CartIcon =()=>{
		if(isAuthenticated){
return (<Fragment> <Link to="/Cart">	<li className="nav-item">	<span className="fa-stack fa-2x has-badge" data-count={CartNumber}>
  		{/* <i className="fa fa-circle fa-stack-2x fa-inverse"></i> */}
  	<i  className="fa fa-shopping-cart fa-stack-2x red-cart"></i>
</span></li></Link>	
<Link to="/Cartattente" className="m-auto pl-4">
	<li className="nav-item m-auto"><span className="fa-stack fa-1x has-badge" data-count={AttenteNumber}>

  		{/* <i className="fa fa-circle fa-stack-2x fa-inverse"></i> */}
  <i class="fas fa-history fa-2x red-cart"></i>
</span></li>	
</Link></Fragment>)
	}return (null); }

	const MyreservationsCheck =()=>{
		if(isAuthenticated){
			return (
			<Link to="/MyReservations"><li className="nav-item"><a className="nav-link">My Resv</a></li></Link>)

		}return (null); }

// module.exports.PrivateRoute;
	const LogButton =withRouter(({history})=>{
		checkAuth();
		if (state.isAuthenticated){
			return(
				<div>
					 <Link to="/Logout">	<li className="nav-item"><a onClick={()=>Signout(()=>{
						 
						 dispatch_Delete();
						 dispatch_Delete_attente();
						 localStorage.removeItem("token");
						 localStorage.removeItem("state");
						 dispatch_SignOut();
						 addToast("Logout Succeeded", {
							appearance: 'info',
							autoDismiss: true,
						  })
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
							<AdminCheck/>	
						<PrivateRoute path="/About"  component={About} />
						
							{/* <a className="nav-link dropdown-toggle" href="#" id="dropdown-a" data-toggle="dropdown">Pages</a> */}
							<Link to="/Reservation"><li className="nav-item"><a className="nav-link">Reservation</a></li></Link>
							<MyreservationsCheck />
						<li className="nav-item dropdown">
							{/* <a className="nav-link dropdown-toggle" href="#" id="dropdown-a" data-toggle="dropdown">Blog</a> */}
							<div className="dropdown-menu" aria-labelledby="dropdown-a">
								<a className="dropdown-item" href="blog.html">blog</a>
								<a className="dropdown-item" href="blog-details.html">blog Single</a>
							</div>
						</li>
						<Link to="/Contact"><li className="nav-item"><a className="nav-link" >Contact</a></li></Link>
						
					
						{/* <Link to="/Login">	<li className="nav-item"><a className="nav-link" href="#">Login</a></li></Link> */}
					<LogButton />
					<LogupCheck />
					
					{/* <li class="d-none d-xl-block">
                                        <div class="form-box f-right ">
                                         
                                            <div class="search-icon">
                                                <i class="fas fa-search special-tag"></i>
                                            </div>
                                        </div>
                                     </li> */}
					{/* <Link to="/Cart">	<li className="nav-item"><a className="nav-link" >Cart</a></li> </Link> */}
					<CartIcon />	
							{/* <li className="nav-item "><a className="nav-link">cart is {CartNumber}</a></li> */}
							
					</ul>
				</div>
			</div>
		</nav>
	</header>

        </div>
    )
}

const mapStateToProps=(state)=>{
	return{ isAuthenticated: state.postRed.authenticated,
			CartNumber : state.ADDReducer.BasketNumber
    }
  }
  
  const mapDispatchToProps =(dispatch)=>{
	return{ dispatch_SignOut: ()=> dispatch(Signout()),
	dispatch_Refresh:()=> dispatch(refreshStore("store refreshed")),
	dispatch_Delete:()=> dispatch(Reset_store()),
	dispatch_Products: ()=> dispatch(FetchProducts()),
	dispatch_Delete_attente:()=> dispatch(Reset_store_attente()),

    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Header);
