import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import axios from "axios";
import { FetchProducts, RefreshStore, refreshStore_, refreshStore_Prod } from '../../Redux/Products/actions';
import { Button, Modal,Image,Card,Form } from 'react-bootstrap';

const UsersTable =(props)=>{
 const [Number, setNumber] = useState(0)
 const token = localStorage.getItem("token");

    const [state, setstate] = useState({
      name: props.data.name,
      price: props.data.price,
      category: props.data.category,
      CookingTime: props.data.CookingTime,
      Promotion: "",
      file: null,
    });
  
    const [showReservation, setshowReservation] = useState(false);
    const handleCloseReservation = () => setshowReservation(false);
    const handleShowReservation = () => setshowReservation(true);
    
    const Data = new FormData();
    Data.append('name', state.name);
    Data.append('price', state.price);
    Data.append('category', state.category);
    Data.append('CookingTime', state.CookingTime);
    Data.append('file', state.file);
    // const [Products, setProducts] = useState([]);
  
    // useEffect(() => {
    //   axios.get("http://localhost:3000/Product/All").then((res) => {
    //     setProducts(res.data)  
    // }).catch(error=>{
    //     const errorMsg = error.message;  
    // });}, [Products])
  
  
//    console.log(Products);
   
   const ChangeHandleName = (e) => {
    setstate({ ...state, name: e.target.value });
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
  
    const ChangeHandleProduct =(e)=>{
      e.persist()
        console.log("e value is ",e.target.value);
        setstate({...state,Product:e.target.value});
      }
  
  
  
    const Sumbithandle = (e) => {
          // setcheck(!check)
          console.log(Data,"is data");
          axios.put("http://localhost:3000/Product/UpdateProduct/"+ props.data._id,Data,{
            headers: {
              "authtoken": token
            }}).then((response) => {
              const info = response
        console.log("UPDATED DATA IS  ",info);
        // props.dispatch_Products_();
        props.Refresh();
        setstate({})
            }).catch(error=>{
              console.log("errors UPDATED PRODUCTS are ",error);
            });
              e.preventDefault();
        
        
      };
    
    const DeleteUser=(e,user)=>{
      let r = window.confirm("Do you want to delete this User ?");
      if (r == true) {
      axios.delete("http://localhost:3000/User/Delete/"+user,{
        headers: {
          "authtoken": token
        }}).then(res=>{
        props.Refresh();
        setNumber(1)
      }).catch(err=>{
        window.alert(err)
      })
    
    }}

    return(
      <Fragment >
         
          <tr>
        {/* <td>  <img className="img-fluid DashboardImage" src={props.data.file} /> </td> */}
        <td>{props.data.Username} </td>
        <td>{props.data.Email} $</td>
        <td>{props.data.Address} </td>
        <td>{props.data.Phonenumber} </td>
        <td>{props.data.role} </td>
        {/* <td>{props.data.Promotion} </td> */}
        <td><i onClick={(e)=>DeleteUser(e,props.data._id)} class="fas fa-trash hoverClass"></i></td>
        
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
            <Modal.Title>Log in to continue...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={(e)=>Sumbithandle(e)} >
        <div class="modal-body">
  
        <div className="form-group">
              <input required id="input_email" value={state.name} onChange={(e)=>ChangeHandleName(e)} placeholder="Name" className="datepicker picker__input form-control" name="Email" type="text"  equired data-error="Please enter Email" />
                                              
              </div>  
  <div className="form-group">
                      <input required type="text" id="input_Number" value={state.price} onChange={(e)=>ChangeHandlePrice(e)} placeholder="PhoneNumber" className="time form-control picker__input" required data-error="Please enter PhoneNumber" />
  <div className="help-block with-errors"></div>
  </div>        
                                          
  
        <div className="form-group">
        {/* <select onChange={(e)=>ChangeHandleProduct(e)} className="custom-select d-block form-control" id="person" required data-error="Please select a Meal">
  
    <Opt  data={props.data}
                  />										
          </select> */}
          <div className="help-block with-errors"></div>
          </div> 
                                  
  
      <div className="form-group">
                                              <input required type="text" className="form-control" value={state.category} onChange={(e)=>ChangeHandleCategory(e)} id="name" name="Address" placeholder="category" required data-error="Please enter your address"/>
                                              <div className="help-block with-errors"></div>
                                          </div>          
  
                      <div className="form-group">
                                              <textarea type="text" placeholder="CookingTime" id="Description" value={state.CookingTime} onChange={(e)=>ChangeHandleCookingTime(e)} className="form-control" name="Description" required data-error="Please enter your Description" />
                                              <div className="help-block with-errors"></div>
                                          </div> 
                      <div class="custom-file">
      <input required type="file" className=" widthclass custom-file-input" id="validatedCustomFile"  name="file" onChange={(e)=>ChangeHandleFile(e)}  />
      <label className="custom-file-label" for="validatedCustomFile">Choose file...</label>
      <div className="invalid-feedback">Example invalid custom file feedback</div>
    </div>
  
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
   export default UsersTable;