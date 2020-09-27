import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import axios from "axios";
import MyReservationTable from './MyReservationTable';
import { FetchReservation, RefreshStoreRes } from '../Redux/Reservations/actions';
import Header from './Header';

function MyReservations(props) {
    const UserId = useSelector(state => state.postRed.status.userId)
    const [Reservations, setReservations] = useState([]);

   useEffect(() => {
    axios.get("http://localhost:3000/Reservation/MyReservations/"+UserId).then((response) => {
       console.log(response,"ddddddddddddddddd")
        setReservations(response.data)
    
      }).catch(error=>{
          const errorMsg = error.message;
        
          
      });
   }, [])
  

    return (
     
        <div>
               <Header />
               <main role="main" className="col-md-12 pl-5 pr-5 LoginClass " >
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
           
            <div className="btn-toolbar mb-2 mb-md-0">
             
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
                              <MyReservationTable
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
    )
}
const mapDispatchToProps =(dispatch)=>{
    return{ dispatch_Reservations: ()=> dispatch(RefreshStoreRes()),
      dispatch_Reservations_: ()=> dispatch(FetchReservation ()),
     
      
      }
    }
  export default connect(null,mapDispatchToProps)(MyReservations);
 
