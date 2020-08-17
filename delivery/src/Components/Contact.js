import React, { Component } from 'react'
import Header from './Header'

export class Contact extends Component {
    render() {
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
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-lg-12">
            <form id="contactForm">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required data-error="Please enter your name" />
                            <div className="help-block with-errors"></div>
                        </div>                                 
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <input type="text" placeholder="Your Email" id="email" className="form-control" name="name" required data-error="Please enter your email" />
                            <div className="help-block with-errors"></div>
                        </div> 
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <select className="custom-select d-block form-control" id="guest" required data-error="Please Select Person">
                              <option disabled selected>Please Select Person*</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            <div className="help-block with-errors"></div>
                        </div> 
                    </div>
                    <div className="col-md-12">
                        <div className="form-group"> 
                            <textarea className="form-control" id="message" placeholder="Your Message" rows="4" data-error="Write your message" required></textarea>
                            <div className="help-block with-errors"></div>
                        </div>
                        <div className="submit-button text-center">
                            <button className="btn btn-common" id="submit" type="submit">Send Message</button>
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
}

export default Contact

