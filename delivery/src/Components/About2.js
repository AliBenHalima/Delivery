import React from 'react'
// import useScript from 'hooks/useScript';
import ScriptTag from 'react-script-tag';
// import { StripeProvider } from 'react-stripe-elements';
import useScript from 'react-script-hook';

function About2(props) {    // <ScriptTag type="text/javascript" src="assets/js/jquery-3.2.1.min.js" />
    // useScript('assets/js/jquery-3.2.1.min.js');
    // useScript('assets/js/popper.min.js');
    // useScript('assets/js/bootstrap.min.js');
    // useScript('assets/js/jquery-3.2.1.min.js');

	// <script src="js/jquery.superslides.min.js"></script>
	// <script src="js/images-loded.min.js"></script>
	// <script src="js/isotope.min.js"></script>
	// <script src="js/baguetteBox.min.js"></script>
	// <script src="js/form-validator.min.js"></script>
    // <script src="js/contact-form-script.js"></script>
    // <script src="js/custom.js"></script>
	console.log("props",props);
	console.log("store get state is ",props.state)
    alert("Hello")
    
    return (
        <div>
	<header className="top-navbar">
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="index.html">
					<img src="images/logo.png" alt="" />
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
				  <span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbars-rs-food">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>
						<li className="nav-item"><a className="nav-link" href="menu.html">Menu</a></li>
						<li className="nav-item active"><a className="nav-link" href="about.html">About</a></li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="dropdown-a" data-toggle="dropdown">Pages</a>
							<div className="dropdown-menu" aria-labelledby="dropdown-a">
								<a className="dropdown-item" href="reservation.html">Reservation</a>
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
						<li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
					</ul>
				</div>
			</div>
		</nav>
	</header>

	<div className="all-page-title page-breadcrumb">
		<div className="container text-center">
			<div className="row">
				<div className="col-lg-12">
					<h1>About Us</h1>
				</div>
			</div>
		</div>
	</div>

	<div className="about-section-box">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 col-md-6 text-center">
					<div className="inner-column">
						<h1>Welcome To <span>Live Dinner Restaurant</span></h1>
						<h4>Little Story</h4>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor suscipit feugiat. Ut at pellentesque ante, sed convallis arcu. Nullam facilisis, eros in eleifend luctus, odio ante sodales augue, eget lacinia lectus erat et sem. </p>
						<p>Sed semper orci sit amet porta placerat. Etiam quis finibus eros. Sed aliquam metus lorem, a pellentesque tellus pretium a. Nulla placerat elit in justo vestibulum, et maximus sem pulvinar.</p>
						<a className="btn btn-lg btn-circle btn-outline-new-white" href="#">Reservation</a>
					</div>
				</div>
				<div className="col-lg-6 col-md-6">
					<img src="images/about-img.jpg" alt="" className="img-fluid" />
				</div>
				<div className="col-md-12">
					<div className="inner-pt">
						<p>Sed tincidunt, neque at egestas imperdiet, nulla sapien blandit nunc, sit amet pulvinar orci nibh ut massa. Proin nec lectus sed nunc placerat semper. Duis hendrerit elit nec sapien porttitor, ut pretium ipsum feugiat. Aenean volutpat porta nisi in gravida. Curabitur pulvinar ligula sed facilisis bibendum. Nullam vitae nulla elit. </p>
						<p>Integer purus velit, eleifend eu magna volutpat, porttitor blandit lectus. Aenean risus odio, efficitur quis erat eget, mattis tristique arcu. Fusce in ante enim. Integer consectetur elit nec laoreet rutrum. Mauris porta turpis nec tellus accumsan pellentesque. Morbi non quam tempus, convallis urna in, cursus mauris. </p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className="menu-box">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="heading-title text-center">
						<h2>Special Menu</h2>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
					</div>
				</div>
			</div>
				
			<div className="row inner-menu-box">
				<div className="col-3">
					<div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
						<a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">All</a>
						<a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Drinks</a>
						<a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Lunch</a>
						<a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Dinner</a>
					</div>
				</div>
				
				<div className="col-9">
					<div className="tab-content" id="v-pills-tabContent">
						<div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
							<div className="row">
								<div className="col-lg-4 col-md-6 special-grid drinks">
									<div className="gallery-single fix">
										<img src="images/img-01.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Drinks 1</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $7.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid drinks">
									<div className="gallery-single fix">
										<img src="images/img-02.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Drinks 2</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $9.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid drinks">
									<div className="gallery-single fix">
										<img src="images/img-03.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Drinks 3</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $10.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid lunch">
									<div className="gallery-single fix">
										<img src="images/img-04.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Lunch 1</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $15.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid lunch">
									<div className="gallery-single fix">
										<img src="images/img-05.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Lunch 2</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $18.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid lunch">
									<div className="gallery-single fix">
										<img src="images/img-06.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Lunch 3</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $20.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid dinner">
									<div className="gallery-single fix">
										<img src="images/img-07.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Dinner 1</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $25.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid dinner">
									<div className="gallery-single fix">
										<img src="images/img-08.jpg" className="img-fluid" alt="Image"/>
										<div className="why-text">
											<h4>Special Dinner 2</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $22.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid dinner">
									<div className="gallery-single fix">
										<img src="images/img-09.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Dinner 3</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $24.79</h5>
										</div>
									</div>
								</div>
							</div>
							
						</div>
						<div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
							<div className="row">
								<div className="col-lg-4 col-md-6 special-grid drinks">
									<div className="gallery-single fix">
										<img src="images/img-01.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Drinks 1</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $7.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid drinks">
									<div className="gallery-single fix">
										<img src="images/img-02.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Drinks 2</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $9.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid drinks">
									<div className="gallery-single fix">
										<img src="images/img-03.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Drinks 3</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $10.79</h5>
										</div>
									</div>
								</div>
							</div>
							
						</div>
						<div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
							<div className="row">
								<div className="col-lg-4 col-md-6 special-grid lunch">
									<div className="gallery-single fix">
										<img src="images/img-04.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Lunch 1</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $15.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid lunch">
									<div className="gallery-single fix">
										<img src="images/img-05.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Lunch 2</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $18.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid lunch">
									<div className="gallery-single fix">
										<img src="images/img-06.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Lunch 3</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $20.79</h5>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
							<div className="row">
								<div className="col-lg-4 col-md-6 special-grid dinner">
									<div className="gallery-single fix">
										<img src="images/img-07.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Dinner 1</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $25.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid dinner">
									<div className="gallery-single fix">
										<img src="images/img-08.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Dinner 2</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $22.79</h5>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6 special-grid dinner">
									<div className="gallery-single fix">
										<img src="images/img-09.jpg" className="img-fluid" alt="Image" />
										<div className="why-text">
											<h4>Special Dinner 3</h4>
											<p>Sed id magna vitae eros sagittis euismod.</p>
											<h5> $24.79</h5>
										</div>
									</div>
								</div>
							</div>
						</div>
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
					<div className="col-lg-12">
						<p className="company-name">All Rights Reserved. &copy; 2018 <a href="#">Live Dinner Restaurant</a> Design By : 
					<a href="https://html.design/">html design</a></p>
					</div>
				</div>
			</div>
		</div>
		
	</footer>

    <a href="#" id="back-to-top" title="Back to top" ><i class="fa fa-paper-plane-o" aria-hidden="true"></i></a>


      </div>
    )
}

export default About2
