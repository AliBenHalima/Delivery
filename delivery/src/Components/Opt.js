import React from 'react'

function Opt(props) {
    console.log("opt props",props);
    return (
        //  React fragment to  take away the wrapping div around this elemnt in the DOM 
        <React.Fragment>
        <option  value={props.data.name} >{props.data.name} </option>
        </React.Fragment>
    )
}

export default Opt
