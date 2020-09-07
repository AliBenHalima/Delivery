import React, { useState ,useEffect} from 'react'
import '../App.css'
import {useSelector,useDispatch} from 'react-redux'
// import {login} from '../Redux/actions'
// import {actionReducer2,FetchUsers} from '../Redux/actions'
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

//     const [number, setnumber] = useState(1)
    
//     // const mapStateToProps=()=>{
//     //     return {
//     //         log:true
//     //     }
//     // }
    
// const truthy = useSelector(state => state.firstRed.num)
// const truthy2 = useSelector(state => state.sencondRed.value)
// const dispatch = useDispatch(login)
// const dispatch2 = useDispatch(actionReducer2)
// console.log("truthy",truthy)


// const userData = useSelector(state => state.fetchred)
// const dispatch_Users = useDispatch()

// useEffect(() => {
//     dispatch_Users(FetchUsers());
//     return () =>(
//         userData.loading ? (<h2>LOADING...</h2>)
//         :userData.error ?(<h2> {userData.error}</h2>)
//         : console.log("userData is ",userData)
//         )
    
        
    
// }, []);

//         <div className="testToDelete text-center">
//             <h1> Test </h1>
//             <h1>State log is {truthy} </h1>
//             <h1>State 2nd is {truthy2} </h1>
//             <button onClick={()=>dispatch(login(number))} > Click To Dispatch Actions </button>
        
//             <button onClick={()=>dispatch2(actionReducer2())} > Click To Dispatch Actions </button>
//             <input value={number} onChange={ e=>{ setnumber(e.target.value)} } />
//       <h1> list of users {userData.users} </h1>         </div>

function TestToDelete(props) {

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com/users/2');
console.log("detailsss",props)


    return (
        <div>
          
        <Admin dataProvider={dataProvider} />

        </div>

    );
}

export default TestToDelete
