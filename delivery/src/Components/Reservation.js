import React,{useContext,useEffect,useState,Component} from 'react';
import { BrowserRouter as Router, Route,Switch,Link, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import axios from "axios";
import Opt from './Opt';
import Header from './Header';
import { FetchProducts, PostProducts } from '../Redux/Products/actions';
import { useSelector, useDispatch,shallowEqual, connect } from "react-redux";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
  } from 'react-places-autocomplete';

function Reservation({productsList,dispatch_Products,isPosted,dispatch_PostProducts}) {
/////////////////////////////////////////////////////////////////

const API_KEY = '152ba6ac3ac5cc41523ada381a15d0ab';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const fetchFunction=(url) =>{
  fetch(url)
    .then((response) => {
      let data;
      if (response.ok) {
        console.log("response",response);
        data = response.json();
        console.log(data);
        return data;
      }
    })
    .then((data) => {
      console.log(data);

      const  coordinates = {
        lattitude : data.coord.lat,
        longitude : data.coord.lon,
        place: data.name,
	  };
	  console.log(" coordinates is ", coordinates);
     
    });
}
const showPosition = position => {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
	fetchFunction(url);
		
		
};

const getCurrenWeatherPosition=()=> {
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log('no Geolocation detected');
	}
};




































///////////////////////////////////////////////////////////////





	
	const [state, setstate] = useState({Email:"",PhoneNumber:null,Address:"",ResevedFor:"",Product:""});
	// const [products, setproducts] = useState({name:"",price:"",category:"",CookingTime:"",rating:"",Promotion:""});
	// const [products, setproducts] = useState({product:[]});
const [address, setaddress] = useState("");


const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setaddress(value);
	setCoordinates(latLng);
	console.log(latLng);
  };

	let history = useHistory();
	const token =localStorage.getItem('token');

//  let Allproducts;
	let Data = {
    Email: state.Email,
    PhoneNumber: state.PhoneNumber,
    Address: state.Address,
	Description: state.Description,
	Product: state.Product
  };

	const Sumbithandle = (e) => {
		dispatch_PostProducts(Data,token);
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


//Fetching all Products 
useEffect(() => {
	console.log("isposted",isPosted)

	if(productsList.length < 1)
	dispatch_Products();
	console.log("State products are",productsList);
	if(isPosted=="POST Products SUCCEEDED"){
		history.push('/Home') 
	}
	else{history.push('/Reservation') }


	
	
	// axios
    //   .get("http://localhost:3000/Product/All")
    //   .then((res) => {
    //     console.log("Log in Data is here", res);
	// 	Allproducts=res.data;
	// 	setproducts({product:res.data})

    //     console.log("Log in Data is Allproducts", Allproducts);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
	// }
}, [productsList])



	
    return (
        <div>
            
            	<Header />
	<div className="all-page-title page-breadcrumb">
		<div className="container text-center">
			<div className="row">
				<div className="col-lg-12">
					<h1>Reservation</h1>
				</div>
			</div>
		</div>
	</div>

	<div className="reservation-box">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="heading-title text-center">
						<h2>Reservation</h2>
						<p>Make your own Reservation now...</p>
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
											<input id="input_email" value={state.Email} onChange={(e)=>ChangeHandleEmail(e)} placeholder="Email" type="email" className="datepicker picker__input form-control" name="Email" type="text"  equired data-error="Please enter Email" />
											<div className="help-block with-errors"></div>
										</div>                                 
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<input type="text" id="input_Number" value={state.PhoneNumber} onChange={(e)=>ChangeHandleNumber(e)} placeholder="PhoneNumber" className="time form-control picker__input" required data-error="Please enter PhoneNumber" />
											<div className="help-block with-errors"></div>
										</div>                                 
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<select onChange={(e)=>ChangeHandleProduct(e)} className="custom-select d-block form-control" id="person" required data-error="Please select a Meal">
											<option disabled selected>Select Meal*</option>

									 		{productsList.map((value, index) => {
										 return <Opt key={index} data={value} index={index} />
										  })}
														
											</select>
											<div className="help-block with-errors"></div>
										</div> 
									</div>
								</div>
								<div className="col-md-6">
									{/* <h3>Contact Details</h3> */}
			{/* <PlacesAutocomplete
        value={address}
        onChange={setaddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>

            <input {...getInputProps({ placeholder: "Type address!" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
			
									<div className="col-md-12">
										<div className="form-group">
											<input type="text" className="form-control" value={state.Address} onChange={(e)=>ChangeHandleAddress(e)} id="name" name="Address" placeholder="Address" required data-error="Please enter your address"/>
											<div className="help-block with-errors"></div>
										</div>                                 
									</div>
									<div className="col-md-12">
									<div class="form-check">
  	  									<input type="checkbox"  onClick={getCurrenWeatherPosition} className="form-check-input pl-5" id="exampleCheck1" />
   											 <label class="form-check-label" for="exampleCheck1">Get my current address...</label>
 									 </div>
									  </div>
									<div className="col-md-12">
										<div className="form-group">
											<textarea type="text" placeholder="Description" id="Description" value={state.Description} onChange={(e)=>ChangeHandleDescription(e)} className="form-control" name="Description" required data-error="Please enter your Description" />
											<div className="help-block with-errors"></div>
										</div> 
									</div>
									{/* <div className="col-md-12">
										<div className="form-group">
											<input type="text" placeholder="Your Numbar" id="phone" className="form-control" name="phone" required data-error="Please enter your Numbar" />
											<div className="help-block with-errors"></div>
										</div> 
									</div>
								</div>
								<div className="col-md-12">
									<div className="submit-button text-center">
										<button className="btn btn-common" id="submit" type="submit">Book Table</button>
										<div id="msgSubmit" className="h3 text-center hidden"></div> 
										<div className="clearfix"></div> 
									</div> */}
									
								</div>
								<div className="col-md-12">
									<div className="submit-button text-center">
									<button  id="submit" type="submit" className="btn btn-common disabled" >Order </button>										<div id="msgSubmit" class="h3 text-center hidden"></div> 
										<div className="clearfix"></div> 
									</div>
								</div>
							</div>            
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className="customer-reviews-box">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="heading-title text-center">
						<h2>Customer Reviews</h2>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-8 mr-auto ml-auto text-center">
					<div id="reviews" className="carousel slide" data-ride="carousel">
						<div className="carousel-inner mt-4">
							<div className="carousel-item text-center active">
								<div className="img-box p-1 border rounded-circle m-auto">
									<img className="d-block w-100 rounded-circle" src="/assets/images/quotations-button.png" alt="NOOOOOOOOOO img" />
								</div>
								<h5 className="mt-4 mb-0"><strong className="text-warning text-uppercase">Paul Mitchel</strong></h5>
								<h6 className="text-dark m-0">Web Developer</h6>
								<p className="m-0 pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
							</div>
							<div className="carousel-item text-center">
								<div className="img-box p-1 border rounded-circle m-auto">
									<img className="d-block w-100 rounded-circle" src="/assets/images/quotations-button.png" alt="" />
								</div>
								<h5 className="mt-4 mb-0"><strong className="text-warning text-uppercase">Steve Fonsi</strong></h5>
								<h6 className="text-dark m-0">Web Designer</h6>
								<p className="m-0 pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
							</div>
							<div className="carousel-item text-center">
								<div className="img-box p-1 border rounded-circle m-auto">
									<img className="d-block w-100 rounded-circle" src="/assets/images/quotations-button.png" alt="" />
								</div>
								<h5 className="mt-4 mb-0"><strong className="text-warning text-uppercase">Daniel vebar</strong></h5>
								<h6 className="text-dark m-0">Seo Analyst</h6>
								<p className="m-0 pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
							</div>
						</div>
						<a className="carousel-control-prev" href="#reviews" role="button" data-slide="prev">
							<i className="fa fa-angle-left" aria-hidden="true"></i>
							<span className="sr-only">Previous</span>
						</a>
						<a className="carousel-control-next" href="#reviews" role="button" data-slide="next">
							<i className="fa fa-angle-right" aria-hidden="true"></i>
							<span className="sr-only">Next</span>
						</a>
                    </div>
				</div>
			</div>
		</div>
	</div>

	<div className="contact-imfo-box">
		<div className="container">
			<div className="row">
				<div className="col-md-4 arrow-right">
					<i className="fa fa-volume-control-phone"></i>
					<div className="overflow-hidden">
						<h4>Phone</h4>
						<p className="lead">
							+01 123-456-4590
						</p>
					</div>
				</div>
				<div className="col-md-4 arrow-right">
					<i className="fa fa-envelope"></i>
					<div className="overflow-hidden">
						<h4>Email</h4>
						<p className="lead">
							yourmail@gmail.com
						</p>
					</div>
				</div>
				<div className="col-md-4">
					<i className="fa fa-map-marker"></i>
					<div className="overflow-hidden">
						<h4>Location</h4>
						<p className="lead">
							800, Lorem Street, US
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<footer className="footer-area bg-f">
		<div className="container">
			<div className="row">
				<div className="col-lg-3 col-md-6">
					<h3>About Us</h3>
					<p>Integer cursus scelerisque ipsum id efficitur. Donec a dui fringilla, gravida lorem ac, semper magna. Aenean rhoncus ac lectus a interdum. Vivamus semper posuere dui.</p>
				</div>
				<div className="col-lg-3 col-md-6">
					<h3>Subscribe</h3>
					<div className="subscribe_form">
						<form className="subscribe_form">
							<input name="EMAIL" id="subs-email" className="form_input" placeholder="Email Address..." type="email" />
							<button type="submit" className="submit">SUBSCRIBE</button>
							<div className="clearfix"></div>
						</form>
					</div>
					<ul className="list-inline f-social">
						<li className="list-inline-item"><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
						<li className="list-inline-item"><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
						<li className="list-inline-item"><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
						<li className="list-inline-item"><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
						<li className="list-inline-item"><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
					</ul>
				</div>
				<div className="col-lg-3 col-md-6">
					<h3>Contact information</h3>
					<p className="lead">Ipsum Street, Lorem Tower, MO, Columbia, 508000</p>
					<p className="lead"><a href="#">+01 2000 800 9999</a></p>
					<p><a href="#"> info@admin.com</a></p>
				</div>
				<div className="col-lg-3 col-md-6">
					<h3>Opening hours</h3>
					<p><span className="text-color">Monday: </span>Closed</p>
					<p><span className="text-color">Tue-Wed :</span> 9:Am - 10PM</p>
					<p><span className="text-color">Thu-Fri :</span> 9:Am - 10PM</p>
					<p><span className="text-color">Sat-Sun :</span> 5:PM - 10PM</p>
				</div>
			</div>
		</div>
		
		<div className="copyright">
			<div className="container">
				<div className="row">
				<button className="btn btn-danger" onClick={getCurrenWeatherPosition} >CLICK HERE FOR LOCATION</button>
					<div className="col-lg-12">
						<p className="company-name">All Rights Reserved. &copy; 2018 <a href="#">Live Dinner Restaurant</a> Design By : 
					<a href="https://html.design/">html design</a></p>
					</div>
				</div>
			</div>
		</div>
		
	</footer>

        </div>
    )
}

const mapStateToProps=(state)=>{
	return{ productsList: state.FetchProd.products,
			isPosted: state.FetchProd.status,
    }
  }
  
  const mapDispatchToProps =(dispatch)=>{
	return{ dispatch_Products: ()=> dispatch(FetchProducts()),
		dispatch_PostProducts: (Data,token)=> dispatch(PostProducts(Data,token))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Reservation);
