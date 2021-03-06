import React, { Fragment,useEffect,useState } from 'react'
import { Button, Modal,Image,Card } from 'react-bootstrap';
import axios from "axios";
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications'



function CommentCard(props) {
  const { addToast } = useToasts()
  const token = localStorage.getItem("token");
  const LoginState = useSelector(state => state.postRed);
  const [name, setname] = useState("");
 let isAuthenticated = LoginState.authenticated;
  const DeleteComponent=()=>{
    if(props.data.createdBy==LoginState.status.userId){
      return <button onClick={DeleteComment} className="btn btn-lg btn-circle btn-outline-new-white"><i className="fa fa-trash-o"></i></button>

    }
    return (null);
  }
  const DeleteComment = (e)=>{
    axios.delete("http://localhost:3000/Comment/deleteComment/"+ props.data._id,{
      headers: {
        "authtoken": token //the token is a variable which holds the token
      }
    }).then(data=>{
      console.log("data of post comment",data);
      props.dispatchComments();

    }) .catch((err) => {
      console.log(err);
    });
e.preventDefault();
  }
  let data={
    id:props.data._id
  }
  const LikeComment=(e)=>{
    if(!isAuthenticated)
    addToast("you must login first", {
      appearance: 'info',
      autoDismiss: true,
    })
    axios.put("http://localhost:3000/Comment/likeComment", data,{
      headers: {
        "authtoken": token //the token is a variable which holds the token
      }
    }).then(data=>{
      console.log("data of Like comment",data);
      props.dispatchComments();

    }) .catch((err) => {
      console.log(err);
    });
e.preventDefault();
  }

 const  DislikeComment=(e)=>{
  if(!isAuthenticated)
  addToast("you must login first", {
    appearance: 'info',
    autoDismiss: true,
  })
    axios.put("http://localhost:3000/Comment/DislikeComment/", data,{
      headers: {
        "authtoken": token //the token is a variable which holds the token
      }
    }).then(data=>{
      console.log("data of dislike comment",data);
      props.dispatchComments();

    }) .catch((err) => {
      console.log(err);
    });
e.preventDefault();
  }
 

  
const ToggleLikeBy=()=>{
  let check=false;
  props.data.likedBy.map((product)=>{

    if(product==LoginState.status.userId){
      check=true;}
    });
    if(check ){
      return  (
        <React.Fragment>     
      <i>{props.data.likes}</i> <i onClick={LikeComment} class="fas fa-thumbs-up pr-4 hoverClass thumbColor" 
        ></i>
     
      </React.Fragment> 
     ) 
    }
else{

  return (
    <React.Fragment>
          <i>{props.data.likes}</i> <i onClick={LikeComment} class="far fa-thumbs-up pr-4 hoverClass" 
></i>

</React.Fragment> )
  return (null)
}}
 
const ToggleDisLikeBy=()=>{
  let check=false;
  props.data.dislikedBy.map((product)=>{

    if(product==LoginState.status.userId){
      check=true;}
    });
    if(check ){
      return  (
        <React.Fragment>     
      <i>{props.data.dislikes}</i> <i onClick={DislikeComment} class="fas fa-thumbs-down hoverClass "   disabled={!isAuthenticated}
></i>
      </React.Fragment> 
     ) 
    }
else{

  return (
    <React.Fragment>
 <i>{props.data.dislikes}</i> <i onClick={DislikeComment} class="far fa-thumbs-down hoverClass "   disabled={!isAuthenticated}
></i>

</React.Fragment> )
  return (null)
}}
let user =[]

  axios.get("http://localhost:3000/User/" + props.data.createdBy).then((res) => {
    
     user = res.data.data.Username;
  //  window.alert(res)
   console.log(user);
   setname(user);
   
  }).catch(error=>{
      console.log(error)
  });


    return (
  
                       
        <React.Fragment>
            <Card>
  <Card.Header className="h5 ">
    <div className="d-flex justify-content-between">
   
        <div><h2>{name}</h2></div>
        <DeleteComponent />
       {/* <button onClick={DeleteComment} className="btn btn-lg btn-circle btn-outline-new-white"><i className="fa fa-trash-o"></i></button> */}
    </div>
   </Card.Header>
  <Card.Body>
    
    <Card.Text>
    {props.data.body}
    </Card.Text>
    {/* <i class="fas fa-thumbs-up"></i> */}
    
    {/* <i>{props.data.likes}</i> <i onClick={LikeComment} class="far fa-thumbs-up pr-4 hoverClass"   disabled={!isAuthenticated} */}
{/* ></i> */}
<ToggleLikeBy />
<ToggleDisLikeBy />
    {/* <i>{props.data.dislikes}</i> <i onClick={DislikeComment} class="far fa-thumbs-down hoverClass"   disabled={!isAuthenticated}
></i> */}
   
  </Card.Body>
</Card> 
</React.Fragment>
    )
}

export default CommentCard
