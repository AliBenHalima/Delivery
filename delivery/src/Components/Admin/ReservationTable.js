import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import axios from "axios";
import { FetchProducts, RefreshStore, refreshStore_, refreshStore_Prod } from '../../Redux/Products/actions';
import { Button, Modal,Image,Card,Form } from 'react-bootstrap';
import Opt from '../Opt';
import { useToasts } from 'react-toast-notifications'



 
const ReservationTable =(props)=>{
  const token = localStorage.getItem("token");

  const { addToast } = useToasts()
 const [CategoryList, setCategoryList] = useState([])
 const [ProductFile, setProductFile] = useState("")

    const [state, setstate] = useState({
      Email: props.data.Email,
      price: props.data.price,
      PhoneNumber: props.data.PhoneNumber,
      Address: props.data.Address,
      Description: props.data.Description,
      Address: props.data.Address,
      State: props.data.State,
      Product:props.data.category,
      file: null,
    });
  
    const [showReservation, setshowReservation] = useState(false);
    const handleCloseReservation = () => setshowReservation(false);
    const handleShowReservation = () => setshowReservation(true);
    
    const Data = {
      State : state.State}

    
    // const [Products, setProducts] = useState([]);
  
    // useEffect(() => {
    //   axios.get("http://localhost:3000/Product/All").then((res) => {
    //     setProducts(res.data)  
    // }).catch(error=>{
    //     const errorMsg = error.message;  
    // });}, [Products])
  
  
//    console.log(Products);
   
   const ChangeHandleState = (e) => {
    setstate({ ...state, State: e.target.value });
  };
  const ChangeHandlePrice = (e) => {
    setstate({ ...state, price: e.target.value });
  };
  const ChangeHandleCategory = (e) => {
    setstate({ ...state, category: e.target.value });
    };
    const ChangeHandleCookingTime = (e) => {
    setstate({ ...state, CookingTime: e.target.value });
    };
  
    const ChangeHandleFile = (e) => {
    setstate({ ...state, file: e.target.files[0] });
    e.persist()
    console.log("event e is ",e)
    };
  
    const ChangeHandleReservation =(e)=>{
      e.persist()
        console.log("e value is ",e.target.value);
        setstate({...state,State:e.target.value});
      }
  
  
  
    const SumbitReservation = (e) => {
      console.log("Stateeeeeeeeeee",state.State);
          axios.put("http://localhost:3000/Reservation/UpdateReservation/"+ props.data._id,Data,{
            headers: {
              "authtoken": token
            }}).then((response) => {
              const info = response
        console.log("receved ",info);
        // props.dispatch_Products_();
        props.Refresh();
        setstate({})
            }).catch(error=>{
              console.log("errors UPDATED PRODUCTS are ",error);
            });
              e.preventDefault();
           
        
      };
    
    const DeleteRseservation=(e,reservationId)=>{
      let r = window.confirm("Do you want to delete this Reservation ?");
      if (r == true) {
      axios.delete("http://localhost:3000/Reservation/Delete/"+reservationId,{
        headers: {
          "authtoken": token
        }}).then(res=>{
        addToast(res.data.message, {
          appearance: 'success',
          autoDismiss: true,
          })
      props.Refresh();
      }).catch(err=>{
        window.alert(err)
      })
    }}
     
    useEffect(() => {


    axios.get("http://localhost:3000/Product/"+props.data.ForProduct,{
      headers: {
        "authtoken": token
      }}).then((res) => {
      setProductFile(res.data.file);
  }).catch(error=>{
  console.log(error)
  
  });
 

    })
    const Description= ()=>{
      if(props.data.Description){
        return (<td>{props.data.Description} </td> )
      }else {
        return (<td><span> No description available</span> </td> )
      }
      return (null)
    }
    return(
      <Fragment >
         
          <tr>
        <td>  <img className="img-fluid DashboardImage" src={ProductFile} /> </td>
        <td>{props.data.ResevedFor} </td>
        <td>{props.data.Email} </td>
        <td>{props.data.PhoneNumber} </td>
        <td>{props.data.Address} </td>
        {/* <td>{props.data.Description} </td> */}
          <Description />

        <td>{props.data.createdAt} </td>
        <td>{props.data.State} </td>

        {/* <td>{props.data.Promotion} </td> */}
        <td>{props.data.likes} </td>
        <td> <i onClick={handleShowReservation} class="fas fa-edit pr-2 hoverClass"></i> <i onClick={(e)=>DeleteRseservation(e,props.data._id)} class="fas fa-trash hoverClass"></i></td>
        
        </tr>
        {/* /************************************ */ }
        {/* Edit Modal  */}
  
        <Modal 
          show={showReservation}
          onHide={handleCloseReservation}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Reservation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={(e)=>SumbitReservation(e)} >

        <div class="modal-body">
        <Form.Group  controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select" defaultValue="Pending"  onChange={(e)=>ChangeHandleReservation(e)}>
        <option>Choose...</option>
        <option value="Pending">Pending</option>
        <option value="In Process">In Process</option>
        <option value="Received">Received</option>
      </Form.Control>
    </Form.Group>
        {/* <div className="form-group">
              <input required id="State" value={state.State} onChange={(e)=>ChangeHandleState(e)} placeholder="State" className="datepicker picker__input form-control" name="State" type="text"  equired data-error="Please enter Email" />
                                              
              </div>   */}
  
                      <div className="submit-button text-center">
                                      <button onClick={handleCloseReservation}  id="submit" type="submit" className="btn btn-common disabled" >Update </button>			
                            <div id="msgSubmit" class="h3 text-center hidden"></div> 
                                          <div className="clearfix"></div> 
                                      </div>
          <div className="clearfix"></div> 
        </div>
        </form>
          </Modal.Body>
        </Modal>
  
        {/* /*************************************************** */ }
  
  
  
       
      </Fragment>
    )
   }
   export default ReservationTable;