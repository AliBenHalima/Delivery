import React from 'react'

function Opt(props) {
    
    return (
        //  React fragment to  take away the wrapping div around this elemnt in the DOM 
        <React.Fragment>
        <option  value={props.data._id} >{props.data.name} </option>
        </React.Fragment>
    )
}

export default Opt
