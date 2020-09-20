
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
import ReservationTable from './ReservationTable';
import { FetchReservation, RefreshStoreRes } from '../../Redux/Reservations/actions';



function DashboardReservation(props) {

  const Products = useSelector(state => state.FetchProd.products);
  const [Toggle, setToggle] = useState("")

  const ToggleDash =(props)=>{

    }
  
  // const [Reservations, setReservations] = useState([])
  const Reservations = useSelector(state => state.Reservations.reservations)
  const [CategoryList, setCategoryList] = useState([])

  const [Addstate, setAddstate] = useState({ name: "", price: "" ,category:"",CookingTime:"",Product:"",file:null})
  const [ShowAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const Data2 = new FormData();
  Data2.append('name', Addstate.name);
  Data2.append('price', Addstate.price);
  Data2.append('category', Addstate.Product);
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
    const ChangeHandleProduct =(e)=>{
      e.persist()
        setAddstate({...Addstate,Product:e.target.value});
      }
  

    const SumbithandleAdd = (e) => {
      axios.post("http://localhost:3000/Product/AddProductTest",Data2).then((response) => {
        console.log("Adding Product",response);
       window.alert(response.data)
       props.dispatch_Reservations();
       setAddstate({})
    }).catch(err=>{
      console.log("error for adding product",err)
    })
    e.preventDefault();
  }
   

    

useEffect(()=>{
  props.dispatch_Reservations_()
//   axios.get("http://localhost:3000/Reservation/All").then((response) => {
//     setReservations(response.data);
//     console.log("rservations",response);
//     // props.dispatch_Reservations();
// }).catch(err=>{
//   console.log(err)
// })

},[])
 


    return (
        <div>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input required className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="#">Sign out</a>
        </li>
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
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="users"></span>
                  Customers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="bar-chart-2"></span>
                  Reports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="layers"></span>
                  Integrations
                </a>
              </li>
            </ul>

            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Saved reports</span>
              <a className="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Current month
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Last quarter
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Social engagement
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Year-end sale
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
                <button onClick={handleShowAdd} className="btn btn-sm btn-outline-secondary">Add Reservation</button>
                <button className="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar"></span>
                This week
              </button>
            </div>
          </div>

          {/* <canvas className="my-4" id="myChart" width="900" height="380"></canvas> */}
          <div className="mainDiv">
          <div className="panel-body">
                    <div className="table-responsive ">
                    <table className="table table-striped table-sm">
                        <thead>
                          <tr>

                          <th>Image</th>
                          <th>ResevedFor</th>
                            <th>Email</th>
                            <th>PhoneNumber</th>
                            <th >Address</th>
                            <th>Description</th>
                            {/* <th>Promotion</th> */}
                          
                            <th>ReservationTime</th>
                            <th>State</th>
                          </tr>
                        </thead>
                        <tbody>
          

               {Reservations.map((value, index) => {
                            return (
                              <ReservationTable
                                key={index}
                                data={value}
                                index={index}
                                Refresh={props.dispatch_Reservations}
                                
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

      
    
        </div>

    )
}
const mapDispatchToProps =(dispatch)=>{
  return{ dispatch_Reservations: ()=> dispatch(RefreshStoreRes()),
    dispatch_Reservations_: ()=> dispatch(FetchReservation()),
   
	
    }
  }
export default connect(null,mapDispatchToProps)(DashboardReservation);


