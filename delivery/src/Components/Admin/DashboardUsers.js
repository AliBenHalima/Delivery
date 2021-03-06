 import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import axios from "axios";
import { FetchProducts, RefreshStore, refreshStore_, refreshStore_Prod } from '../../Redux/Products/actions';
import { Button, Modal,Image,Card,Form } from 'react-bootstrap';
import Opt from '../Opt'
import ProductTable from './ProductTable';
import UsersTable from './UsersTable';
import Admin_ from '../Admin_';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';



function DashboardUsers(props) {
        const token = localStorage.getItem("token");

  const Products = useSelector(state => state.FetchProd.products);
  const [Toggle, setToggle] = useState("")

  const ToggleDash =(props)=>{

    }
  
  const [Users, setUsers] = useState([])
  const [Addstate, setAddstate] = useState({ name: "", price: "" ,category:"",CookingTime:"",file:null})
  const [ShowAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const Data2 = new FormData();
  Data2.append('name', Addstate.name);
  Data2.append('price', Addstate.price);
  Data2.append('category', Addstate.category);
  Data2.append('CookingTime', Addstate.CookingTime);
  Data2.append('file', Addstate.file);

  
	const ChangeHandleNameAdd = (e) => {
	  setAddstate({ ...Addstate, name: e.target.value });
	};
	const ChangeHandlePriceAdd = (e) => {
	  setAddstate({ ...Addstate, price: e.target.value });
	};
	const ChangeHandleCategoryAdd = (e) => {
		setAddstate({ ...Addstate, category: e.target.value });
	  };
	  const ChangeHandleCookingAdd = (e) => {
      setAddstate({ ...Addstate, CookingTime: e.target.value });
	  };
	  const ChangeHandleFileAdd = (e) => {
      setAddstate({ ...Addstate, file: e.target.files[0] });
		e.persist()
		console.log("event e is ",e)
    };

    const SumbithandleAdd = (e) => {
      axios.post("http://localhost:3000/Product/AddProductTest",{
        headers: {
          "authtoken": token
        }},Data2).then((response) => {
        console.log("Adding Product",response);
       window.alert(response.data)
       props.dispatch_Products();
       setAddstate({})
    }).catch(err=>{
      console.log("error for adding product",err)
    })
    e.preventDefault();
  }
   

    

useEffect(()=>{
  props.dispatch_Products_();
  axios.get("http://localhost:3000/User/All",{
    headers: {
      "authtoken": token
    }}).then((response) => {
    setUsers(response.data);
    console.log(response);
 
console.log("Users",response.data);
console.log("Users",response);
}).catch(err=>{
  console.log("error for adding product",err)
})


},[])
 


    return (
        <div>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <Link to="/Home"> <a className="navbar-brand col-sm-3 col-md-2 mr-0 text-white" >Live Dinner </a></Link>
      <ul className="navbar-nav px-3">
      <SignOut />
      </ul>
    </nav>

    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
              <Link to="/Dashboard">
                <a className="nav-link active" href="#" onClick={()=>setToggle("Product")}>
                  <span data-feather="home"></span>
                  Dashboard <span className="sr-only">(current)</span>
                </a>
                </Link>
              </li>
              <li className="nav-item">
                  <Link to="/DashboardUsers">
                <a className="nav-link" href="#">
                  <span data-feather="file"></span>
                  Users
                </a>
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/DashboardReservation">
                <a className="nav-link" href="#">
                  <span data-feather="shopping-cart"></span>
                  Reservations
                </a>
                </Link>
              </li>
            
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
                {/* <button onClick={handleShowAdd} className="btn btn-sm btn-outline-secondary">Add Product</button> */}
               
              </div>
             
            </div>
          </div>

          {/* <canvas className="my-4" id="myChart" width="900" height="380"></canvas> */}
          <div className="mainDiv">
          <div className="panel-body">
                    <div className="table-responsive ">
                    <table className="table table-striped table-sm">
                        <thead>
                          <tr>

                      
                            <th>Username</th>
                            <th>Email</th>
                            <th >Address</th>
                            <th>Phonenumber</th>
                            {/* <th>Promotion</th> */}
                            <th>  Edit/Delte </th>
                          </tr>
                        </thead>
                        <tbody>
                        
                      
                     

               {Users.map((value, index) => {
                            return (
                              <UsersTable
                                key={index}
                                data={value}
                                index={index}
                                Refresh={props.dispatch_Products}
                                
                              />
                            );
                          })}
               
                        </tbody>
                        <tfoot>
                          <tr>
                          
                            {/* <th>{state.CartCost}$</th> */}
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
            </div>

        
        </main>
      </div>
    </div>
 {/* /*************************************** */  }
      {/* Add Modal */}

      <Modal 
        show={ShowAdd}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(e)=>SumbithandleAdd(e)} >
      <div class="modal-body">

      <div className="form-group">
			<input required id="Name" value={Addstate.name} onChange={(e)=>ChangeHandleNameAdd(e)} placeholder="Name" className="datepicker picker__input form-control" name="Name" type="text"  equired data-error="Please enter Name" />
											
			</div>  
<div className="form-group">
					<input required type="text" id="Price" value={Addstate.price} onChange={(e)=>ChangeHandlePriceAdd(e)} placeholder="Price" className="time form-control picker__input" required data-error="Please enter Price" />
<div className="help-block with-errors"></div>
</div>        
										

      {/* <div className="form-group">
      
      <select  className="custom-select d-block form-control" id="person" required data-error="Please select a Meal"> */}
{/* onChange={(e)=>ChangeHandleProduct(e)} */}
  {/* <Opt  data={props.data}
				/>										
		</select>
        <div className="help-block with-errors"></div>
		</div> 
								 */}

    <div className="form-group">
											<input required type="text" className="form-control" value={Addstate.category} onChange={(e)=>ChangeHandleCategoryAdd(e)} id="name" name="category" placeholder="category" required data-error="Please enter your category"/>
											<div className="help-block with-errors"></div>
										</div>          

                    <div className="form-group">
											<textarea type="text" placeholder="CookingTime" id="Description" value={Addstate.CookingTime} onChange={(e)=>ChangeHandleCookingAdd(e)} className="form-control" name="CookingTime" required data-error="Please enter your CookingTime" />
											<div className="help-block with-errors"></div>
										</div> 
                    <div class="custom-file">
    <input required type="file" className=" widthclass custom-file-input" id="validatedCustomFile"  name="file" onChange={(e)=>ChangeHandleFileAdd(e)}  />
    <label className="custom-file-label" for="validatedCustomFile">Choose file...</label>
    <div className="invalid-feedback">Example invalid custom file feedback</div>
  </div>

                    <div className="submit-button text-center">
									<button onClick={handleCloseAdd}  id="submit" type="submit" className="btn btn-common disabled" >Update </button>			
                  		<div id="msgSubmit" class="h3 text-center hidden"></div> 
										<div className="clearfix"></div> 
									</div>
		<div className="clearfix"></div> 
      </div>
      </form>
        </Modal.Body>
      </Modal>

    
        </div>

    )
}
const mapDispatchToProps =(dispatch)=>{
  return{ dispatch_Products: ()=> dispatch(RefreshStore()),
    dispatch_Products_: ()=> dispatch(FetchProducts()),
   
	
    }
  }
export default connect(null,mapDispatchToProps)(DashboardUsers);