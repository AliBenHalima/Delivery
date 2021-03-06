import React from 'react'

function Prod(props) {
    console.log("props",props)

    return (
      <div>
         <div className="col-lg-4 col-md-6 special-grid drinks">
          <div className="gallery-single fix">
            <img
              src="assets/images/img-01.jpg"
              className="img-fluid"
              alt="Image"
            />
            <div className="why-text">
              <div className="d-flex justify-content-between">
              <h4>{props.data.name}</h4>
              <h4>test</h4>
              </div>
              <p>{props.data.category}</p>
              <h5> ${props.data.price}</h5>
            </div>
          </div>
        </div>
  </div>
    );
}

export default Prod
