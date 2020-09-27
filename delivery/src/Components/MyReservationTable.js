import React, { Fragment, useEffect, useState } from 'react'
import axios from "axios";

function MyReservationTable(props) {
    const [ProductFile, setProductFile] = useState("")
    let token =localStorage.getItem("token");

    useEffect(() => {
       
    axios.get("http://localhost:3000/Product/"+props.data.ForProduct,{
        headers: {
          "authtoken": token
        }}).then((res) => {
        setProductFile(res.data.file);
    }).catch(error=>{
    console.log(error)
    
    });
    }, []);

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
        
          <td>{props.data.Email} </td>
          <td>{props.data.PhoneNumber} </td>
          <td>{props.data.Address} </td>
          <Description />     
          <td>{props.data.createdAt} </td>
          <td>{props.data.State} </td>
  
          {/* <td>{props.data.Promotion} </td> */}
          <td>{props.data.likes} </td>
          {/* <td> <i onClick={handleShowReservation} class="fas fa-edit pr-2 hoverClass"></i> <i onClick={(e)=>DeleteRseservation(e,props.data._id)} class="fas fa-trash hoverClass"></i></td> */}
          
          </tr>
          {/* /************************************ */ }
          {/* Edit Modal  */}
    
          
    
          {/* /*************************************************** */ }
    
    
    
         
        </Fragment>
      )
}

export default MyReservationTable
