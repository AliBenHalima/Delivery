import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Signout } from '../../Redux/Authentification/actions';
import { Reset_store, Reset_store_attente } from '../../Redux/Cart/actions';
import { useToasts } from 'react-toast-notifications'
import { connect } from 'react-redux';


function SignOut(props) {
    let history = useHistory();
    const { addToast } = useToasts();
    const Signout=(cb)=>{
        setTimeout(cb, 100);
    };
    return (
        <div>
        <li className="nav-item text-nowrap ">
        <Link to="/Logout">  <a className="nav-link"  onClick={()=>Signout(()=>{
						 
                        props.dispatch_Delete();
                        props.dispatch_Delete_attente();
                        localStorage.removeItem("token");
                        localStorage.removeItem("state");
                        props.dispatch_SignOut();
                         addToast("Logout Succeeded", {
                            appearance: 'info',
                            autoDismiss: true,
                          })
                        //  props.names.next("false");
                         history.push("/Home")
                 
                     })}>Sign out </a> </Link>
        </li>

        </div>
    )
}
const mapDispatchToProps =(dispatch)=>{
	return{ dispatch_SignOut: ()=> dispatch(Signout()),
	dispatch_Delete:()=> dispatch(Reset_store()),
	dispatch_Delete_attente:()=> dispatch(Reset_store_attente()),

    }
  }
  export default connect(null,mapDispatchToProps)(SignOut);


