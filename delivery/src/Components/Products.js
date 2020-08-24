import React from 'react'
import Opt from './Opt'
import { useSelector } from 'react-redux'

function Products(props) {
    let productsList =useSelector(state=>state.FetchProd.products);
    let isAuthenticated = useSelector(state => state.postRed.authenticated);
    console.log("authentiifcatipn prodicts",isAuthenticated);
    return (
        <React.Fragment>
                 <div className="col-lg-4 col-md-6 special-grid drinks">
                      <div className="gallery-single fix">
                        <img
                          src={props.data.file}
                          className="img-fluid"
                          alt="Image"
                        />
                        <div className="why-text">
                          <h4>{props.data.name}</h4>
                          <p>{props.data.category}</p>
                          <h5> ${props.data.price}</h5>
                          <p><button data-toggle="modal" data-target="#exampleModal" className="btn btn-lg btn-circle btn-outline-new-white"  disabled={!isAuthenticated}>Order Now!</button></p>                        </div>
                      </div>
                    </div>
                    {/* model here */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title " id="exampleModalLabel">Order {props.data.name} Now ! </h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <div className="form-group">
	<input id="input_email" placeholder="Email" type="email" className="datepicker picker__input form-control" name="Email" type="text"  equired data-error="Please enter Email" />
        <div className="help-block with-errors"></div>
        </div> 

        <div className="form-group">
	<input type="text" id="input_Number" placeholder="PhoneNumber" className="time form-control picker__input" required data-error="Please enter PhoneNumber" />
	<div className="help-block with-errors"></div>
	</div> 

      <div className="form-group">
	<select className="custom-select d-block form-control" id="person" required data-error="Please select a Meal">
	<option disabled selected>Select Meal*</option>

	{productsList.map((value, index) => {
	return <Opt key={index} data={value} index={index} />
	})}
														
		</select>
        <div className="help-block with-errors"></div>
		</div> 
								

      <div className="form-group">
		<input type="text" className="form-control"  id="name" name="Address" placeholder="Address" required data-error="Please enter your address"/>
		<div className="help-block with-errors"></div>
	</div>         

      <div className="form-group">
		<textarea type="text" placeholder="Description" id="Description"  className="form-control" name="Description" required data-error="Please enter your Description" />
		<div className="help-block with-errors"></div>
		</div> 

      <div className="submit-button text-center">
		<button  id="submit" type="submit" className="btn btn-common disabled" disabled={!isAuthenticated} >Order</button> 
        <div id="msgSubmit" class="h3 text-center hidden"></div> 
		<div className="clearfix"></div> 
    </div>




    
      </div>
      
    </div>
  </div>
</div>
                    </React.Fragment>
    )
}

export default Products
