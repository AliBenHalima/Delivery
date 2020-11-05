import React,{useContext,useEffect,useState,Component} from 'react';
import Opt from './Opt'
import { BrowserRouter as Router, Route,Switch,Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch,shallowEqual, connect } from "react-redux";
import { FetchProducts, PostProducts, Like_Dislike_Product } from '../Redux/Products/actions';
import { ADD_TOCART } from '../Redux/Cart/types';
import { AddtoCard } from '../Redux/Cart/actions';
import { PostLogin } from '../Redux/Authentification/actions';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import $ from 'jquery';
// import Modal from 'react-modal';
import { Button, Modal,Image,Card,Form } from 'react-bootstrap';
import CommentCard from './Cards/CommentCard';
import axios from "axios";
import { useToasts } from 'react-toast-notifications'


    

function Products({dispatch_PostProducts,dispatch_Cart,...props}) {
const [categoryName, setcategoryName] = useState("")
  const { addToast } = useToasts()
  const [state, setstate] = useState({Email:"",PhoneNumber:null,Address:"",ResevedFor:"",Product:"",LOGIN_Email:"",LOGIN_Password:"",Comment:""});
  let productsList =useSelector(state=>state.FetchProd.products);
  let ReservationStatus =useSelector(state=>state.FetchProd.status);
  const Comments = useSelector(state => state.CommentsRed.Comments.data)
  const AuthState= useSelector(state => state.postRed)
  

  let history = useHistory();
  const token =localStorage.getItem('token');
  
  const [show, setShow] = useState(false);
  const [showReservation, setshowReservation] = useState(false);
  const [Description, setDescription] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleCloseReservation = () => setshowReservation(false);
  const handleShowReservation = () => setshowReservation(true);

  const handleCloseDescription = () => setDescription(false);
  const handleShowDescription = () => setDescription(true);
  
  let Data = {
    Email: state.Email,
    PhoneNumber: state.PhoneNumber,
    Address: state.Address,
	Description: state.Description,
	Product: props.data._id
  };
  let LOGINData = {
    Email: state.LOGIN_Email,
    Password: state.LOGIN_Password,
  };

    const Sumbithandle = (e) => {
      if(state.Email && state.PhoneNumber &&  state.Address){
      dispatch_PostProducts(Data,token);
    
      history.push('/Menu') 
      addToast("Resvation has been made", {
            appearance: 'success',
            autoDismiss: true,
          });
        }
        else{
          addToast("Reservation Error", {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      e.preventDefault();
    };

    
    const SumbitLOGIN_handle=(e)=>{
      props.dispatch_Users(LOGINData);
  
    if(AuthState.authenticated){
      addToast(`Welcome ${ AuthState.status.username}`, {
        appearance: 'success',
        autoDismiss: true,
      })
    }
    if(!AuthState.authenticated && AuthState.error ){
      addToast(`${AuthState.error}`, {
            appearance: 'error',
            autoDismiss: true,
          })        
    }

 
   
      history.push('/Menu') 
    
      e.preventDefault();
    };

    let CommentData={
      body: state.Comment,
      PostedFor: props.data._id
    }
    const AddComment=(e)=>{
    
      axios.post("http://localhost:3000/Comment/newComment", CommentData,{
        headers: {
          "authtoken": token //the token is a variable which holds the token
        }
      }).then(data=>{
        console.log("data of post comment",data);
        if(data.data.success){
          addToast(`${data.data.message}`, {
            appearance: 'success',
            autoDismiss: true,
          })
        }else{
          addToast(`${data.data.message}`, {
            appearance: 'error',
            autoDismiss: true,
          })
        }
        props.dispatchComments();


      }) .catch((err) => {
        console.log(err);
      });
  e.preventDefault();
    }
   

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
    const ChangeHandleLOGINEmail =(e)=>{
      setstate({...state,LOGIN_Email:e.target.value});
    }
    const ChangeHandleLOGINNumber =(e)=>{
      setstate({...state,LOGIN_Password:e.target.value});
    }
    const ChangeHandleComment =(e)=>{
      setstate({...state,Comment:e.target.value});
    }
   


    const Test=()=>{
      dispatch_Cart(props.data);
    
 addToast("Product added to cart", {
          appearance: 'success',
          autoDismiss: true,
        })
      
    }
    const ToggleDataTarget =()=>{
      if (AuthState.authenticated){
       return(<React.Fragment>
          <p><button class="btn btn-lg btn-circle btn-outline-new-white" onClick={Test} href="" >Add</button></p>
          <p><button  onClick={handleShowReservation} className="btn btn-lg btn-circle btn-outline-new-white"  >Order Now!</button></p>   
          {/* onClick={()=>affectProducts()} */}
          </React.Fragment>
       )
        }else{
       return( <React.Fragment>
       <p><button class="btn btn-lg btn-circle btn-outline-new-white" variant="primary" onClick={handleShow}  href="" >Add</button></p>
       <p><button  variant="primary" onClick={handleShow} className="btn btn-lg btn-circle btn-outline-new-white"  >Order Now!</button></p>   
       {/* onClick={()=>affectProducts()} */}
       </React.Fragment>
       )
       //  disabled={!isAuthenticated}  
      }
        return (null);
      }
      const ToggleAddComment =()=>{
        if (AuthState.authenticated){
         return(<React.Fragment> 
               <Button  id="submit_log" type="submit" className="btn btn-common disabled"   > Add Comment </Button>		
               </React.Fragment>)
}else{ return(
<React.Fragment>
  <Button  id="submit_log" type="submit"  className="btn btn-common disabled"  onClick={handleShow} > Add Comment </Button>		
  </React.Fragment>)
}
return (null);
}
const ProductId={
  id:props.data._id
}



const ToggleLike_Dislike=()=>{
  
  if(!AuthState.authenticated){
    addToast("you must login first", {
      appearance: 'info',
      autoDismiss: true,
    })
//   productsList.map((element)=>{
   
//     if(element._id==ProductId){
//       if(element.likedBy.includes(AuthState.status.userId)){
//        window.alert("rgzeg")
//         addToast("You Disliked this product", {
//           appearance: 'success',
//           autoDismiss: true,
//         }) 
//       }
//       else{
//         addToast("You Liked this product", {
//           appearance: 'info',
//           autoDismiss: true,
//         })
//     }
//   }
// })

}
props.dispatch_Likes_Dislikes(ProductId)
}
const ToggleHeart=()=>{
  let check=false;
  props.data.likedBy.map((product)=>{

    if(product==AuthState.status.userId ){
      check=true;}
    });
    if(check ){
      return  (
        <React.Fragment> <i>{props.data.likes }</i>
      <i class="fas fa-heart hoverClass iconColor"  disabled={!AuthState.authenticated} onClick={ToggleLike_Dislike}></i>
     
      </React.Fragment> 
     ) 
    }
else{

  return (
    <React.Fragment> <i>{props.data.likes }</i>
    <i class="far fa-heart hoverClass" disabled={!AuthState.authenticated} onClick={ToggleLike_Dislike}></i></React.Fragment> )
}
 
  return (null)
}
useEffect(() => {
  	axios
      .get(" http://localhost:3000/Category/"+props.data.category)
      .then((res) => {
		setcategoryName(res.data.name)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

// useEffect(() => {
//       if(AuthState.authenticated){

//   addToast(`Welcome ${ AuthState.status.username}`, {
//     appearance: 'success',
//     autoDismiss: true,
//   })
// }
// if(!AuthState.authenticated && AuthState.error!="" ){


//   addToast("dd", {
//         appearance: 'error',
//         autoDismiss: true,
//       })
//       // setstate({  ...state,Email: "", Password: "" })
    
// }

// }, [])

  
 

    return (
        <React.Fragment>
                 <div className="col-lg-4 col-md-6 special-grid drinks">
                      <div className="gallery-single fix imageClass Width_Height">
                        <img
                          src={props.data.file}
                          className="img-fluid imageClass rounded "
                          alt="Image"
                        />
                        <div className="why-text">
                        <div className="d-flex justify-content-between">
                          <div>
                        <h4>{props.data.name}</h4>
                        </div>
                        <div >
                        <ToggleHeart />
                        
                        {/* <i>{props.data.likes }</i>
                        <i class="far fa-heart hoverClass" disabled={!isAuthenticated} onClick={ToggleLike_Dislike}></i> */}
                        <i className="fas fa-eye hoverClass pl-2"  onClick={handleShowDescription} ></i>   
                        </div>        
                        </div>
                          <p>{categoryName}</p>
                          <h5> ${props.data.price}</h5>
                          {/* <p><button class="btn btn-lg btn-circle btn-outline-new-white" onClick={Test} href="" disabled={!isAuthenticated}>Add</button></p> */}
                          {/* <p><button onClick={()=>affectProducts()} data-toggle="modal" data-target={"#exampleModal"+props.index} className="btn btn-lg btn-circle btn-outline-new-white"  disabled={!isAuthenticated}>Order Now!</button></p>    */}
                          <ToggleDataTarget />                        
                                               </div>
                  
                      </div>
                    </div>
                    {/* model here */}
                 
  <Modal 
        show={showReservation}
        onHide={handleCloseReservation}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Make a reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(e)=>Sumbithandle(e)} >
      <div class="modal-body">

      <div className="form-group">
			<input id="input_email" value={state.Email} onChange={(e)=>ChangeHandleEmail(e)} placeholder="Email" red type="email" className="datepicker picker__input form-control" name="Email" type="email"  equired data-error="Please enter Email"  />
      {/* <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
    	<div className="help-block with-errors"></div>
			</div>  
<div className="form-group">
				<input type="text" id="input_Number" value={state.PhoneNumber} onChange={(e)=>ChangeHandleNumber(e)} placeholder="PhoneNumber" className="time form-control picker__input"  data-error="Please enter PhoneNumber"  />
				<div className="help-block with-errors"></div>
</div>        
										

      <div className="form-group">
      <select onChange={(e)=>ChangeHandleProduct(e)} value={props.data} className="custom-select d-block form-control" id="person"  data-error="Please select a Meal">
	{/* <option disabled selected>Select Meal*</option> */}

	{/* {productsList.map((value, index) => {
	return <Opt key={index} data={value} index={index} />
	})} */}
  <Opt  data={props.data}  key={props.data}
				/>										
		</select>
        <div className="help-block with-errors"></div>
		</div> 
								

    <div className="form-group">
											<input  type="text" className="form-control" value={state.Address} onChange={(e)=>ChangeHandleAddress(e)} id="name" name="Address" placeholder="Address"  data-error="Please enter your address"/>
											<div className="help-block with-errors"></div>
										</div>          

                    <div className="form-group">
											<textarea type="text" placeholder="Description"  maxlength="50" id="Description" value={state.Description} onChange={(e)=>ChangeHandleDescription(e)} className="form-control" name="Description"  data-error="Please enter your Description" />
											<div className="help-block with-errors"></div>
									 <small id="emailHelp" className="form-text text-muted">
             Max length 50 characters 
            </small>
                  	</div> 

                    <div className="submit-button text-center">
									<button onClick={handleCloseReservation}  id="submit" type="submit" className="btn btn-common disabled" >Order </button>										<div id="msgSubmit" class="h3 text-center hidden"></div> 
										<div className="clearfix"></div> 
									</div>
		<div className="clearfix"></div> 





    
      </div>
      </form>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log in to continue... </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(e)=>SumbitLOGIN_handle(e)} >
      <div class="modal-body">

      <div className="form-group">
											<input id="input_email" value={state.LOGIN_Email} onChange={(e)=>ChangeHandleLOGINEmail(e)} placeholder="Email" type="email" className="datepicker picker__input form-control" name="Email" type="text"  equired data-error="Please enter Email" />
											<div className="help-block with-errors"></div>
			</div>  
<div className="form-group">
											<input type="password" id="input_password" value={state.LOGIN_Password} onChange={(e)=>ChangeHandleLOGINNumber(e)} placeholder="Password" className="time form-control picker__input"  data-error="Please enter password" />
											<div className="help-block with-errors"></div>
</div>        
										
<div className="form-group">
<div className="submit-button text-center">
									<button  id="submit_log" type="submit" onClick={handleClose} className="btn btn-common disabled"  >Log in </button>										<div id="msgSubmit" class="h3 text-center hidden"></div> 
										<div className="clearfix"></div> 
									</div>
                  </div>
      </div>
      </form>
        </Modal.Body>
      </Modal>
 {/* Description Modal  */}

 <Modal {...props}
size="lg"
  aria-labelledby="example-modal-sizes-title-lg"
        show={Description}
        onHide={handleCloseDescription}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Meal Description </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid"  >
        <div className="container">
        <div className="row">
        <div className="col-md-4">
        <img
                          src={props.data.file}
                          className="img-fluid imageClass rounded "
                          alt="Image"
                        />
          </div>
          <div className="col-md-8">
         <h1>{props.data.name}</h1>
     <p>  <span class="badge badge-pill badge-primary">Category : </span> {categoryName}</p>
      <p>   <span class="badge badge-pill badge-primary">Price : </span> {props.data.price} $</p>
        <p>  <span class="badge badge-pill badge-primary">Cooking time : </span> {props.data.CookingTime}</p>
        

          </div>
          </div></div>
           <div className="pl-5 pr-5 pt-5"> <h2> Comments ... </h2> </div>
          <div className="pr-5 pl-5 " style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
         
          {Comments.map((value, index) => {
            if(value.PostedFor==props.data._id)
										 return <CommentCard  key={index} data={value} index={index} dispatchComments={props.dispatchComments}  />
										  })}     

</div>
<Form onSubmit={AddComment}>
<Form.Group controlId="exampleForm.ControlTextarea1" role="form">
    <Form.Label>Write a Comment...</Form.Label>
    <Form.Control placeholder="Write a Comment..." as="textarea" rows="3" value={state.Comment} onChange={(e)=>ChangeHandleComment(e)} />
    <div class="d-flex justify-content-center">
      <ToggleAddComment />
    {/* <Button  id="submit_log" type="submit"  className="btn btn-common disabled" onClick={handleShow}  > Add Comment </Button>		 */}
    {/* <Button  id="submit_log" type="submit" onClick={handleClose} className="btn btn-common disabled"  >Log in </Button>	 */}
    	{/* <div id="msgSubmit" class="h3 text-center hidden"></div>  */}
      </div>
  </Form.Group>
</Form>
        {/* <form onSubmit={(e)=>SumbitLOGIN_handle(e)} >
      <div class="modal-body">

      <div className="form-group">
											<input id="input_email" value={state.LOGIN_Email} onChange={(e)=>ChangeHandleLOGINEmail(e)} placeholder="Email" type="email" className="datepicker picker__input form-control" name="Email" type="text"  equired data-error="Please enter Email" />
											<div className="help-block with-errors"></div>
			</div>  
          <div className="form-group">
        	<input type="password" id="input_password" value={state.LOGIN_Password} onChange={(e)=>ChangeHandleLOGINNumber(e)} placeholder="Password" className="time form-control picker__input"  data-error="Please enter password" />
          <div className="help-block with-errors"></div>
      </div>        
										
<div className="form-group">
<div className="submit-button text-center">
									<button  id="submit_log" type="submit" onClick={handleClose} className="btn btn-common disabled"  >Log in </button>										<div id="msgSubmit" class="h3 text-center hidden"></div> 
										<div className="clearfix"></div> 
									</div>
                  </div>
      </div>
      </form> */}
        </Modal.Body>
      </Modal>











                    </React.Fragment>
    )
}
const mapDispatchToProps =(dispatch)=>{
  return{
    dispatch_PostProducts: (Data,token)=> dispatch(PostProducts(Data,token)),
    dispatch_Cart: (product)=> dispatch(AddtoCard(product)),
    dispatch_Users: (Data)=> dispatch(PostLogin(Data)),
    dispatch_Likes_Dislikes : (Data)=> dispatch(Like_Dislike_Product(Data))

}}

export default connect(null,mapDispatchToProps)(Products); 
