import React from 'react'

function Opt(props) {
    console.log("OPT DATA",props.data);
    return (
        //  React fragment to  take away the wrapping div around this elemnt in the DOM 
        <React.Fragment>
        <option  value={props.data._id} >{props.data.name} </option>
        </React.Fragment>
    )
}

export default Opt
