import React, { useContext, useEffect, useState, Component } from "react";
import { useHistory } from "react-router-dom";
import Header from './Header'
import axios from "axios";
import { useToasts } from 'react-toast-notifications'


    
function Contact() {
    const [state, setstate] = useState({ Username: "", Email: "",Message:"" });
    let history = useHistory();
    const { addToast } = useToasts();

let Data={
    Username:state.Username,
    Email:state.Email,
    Message:state.Message,

}
    const ChangeHandleUsername = (e) => {
        setstate({ ...state, Username: e.target.value });
      };

    const ChangeHandleEmail = (e) => {
        setstate({ ...state, Email: e.target.value });
      };

      const ChangeHandleMessage = (e) => {
        setstate({ ...state, Message: e.target.value });
      };

      const Sumbithandle = (e) => {
       
        axios.post("http://localhost:3000/Mail/sendmail",Data).then((response) => {
          const info = response.data
          console.log("Mail data is ",info);
          if (response.data.success){
          addToast(response.data.status, {
            appearance: 'success',
            autoDismiss: true,
          })
          history.push('/Home')
        }
           else{
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
        
    });
    e.preventDefault();
    }





  
        return (
            <div>
 <Header />

<div className="all-page-title page-breadcrumb">
<div className="container text-center">
    <div className="row">
        <div className="col-lg-12">
            <h1>Contact</h1>
        </div>
    </div>
</div>
</div>

{/* <div className="map-full"></div> */}
<div className="contact-box">
<div className="container">
    <div className="row">
        <div className="col-lg-12">
            <div className="heading-title text-center">
                <h2>Contact</h2>
                <p>If you need help Contact us </p>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-lg-12">
        <form onSubmit={(e) => Sumbithandle(e)}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                        <input
              type="text"
              onChange={(e) => ChangeHandleUsername(e)}
              value={state.Username}
              className="datepicker picker__input form-control "
              id="exampleInputUsername"
              aria-describedby="emailHelp"
              placeholder="Enter Username"
              required
            />           
            <div className="help-block with-errors"></div>
                        </div>                                 
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                        <input
              type="email"
              onChange={(e) => ChangeHandleEmail(e)}
              value={state.Email}
              className="datepicker picker__input form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />                            <div className="help-block with-errors"></div>
                        </div> 
                    </div>
                   
                    <div className="col-md-12">
                        <div className="form-group"> 
                        <textarea
              rows="6"
               cols="10"
              type="text"
              onChange={(e) => ChangeHandleMessage(e)}
              value={state.Message}
              className="datepicker picker__input form-control "
              id="exampleInputMessage"
              aria-describedby="emailHelp"
              placeholder="Enter Message"
              required
            />                                       <div className="help-block with-errors"></div>
                        </div>
                        <div class="submit-button text-center">
            <button
              type="submit"
              className="btn btn-common disabled"
            >
              Submit
            </button>
                            <div id="msgSubmit" className="h3 text-center hidden"></div> 
                            <div className="clearfix"></div> 
                        </div>
                    </div>
                </div>            
            </form>
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

export default Contact

