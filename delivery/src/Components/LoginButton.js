import React from 'react'
import { Link } from 'react-router-dom'

function LoginButton() {
    return (
        <div>
            <Link to="/Login">	<li className="nav-item"><a className="nav-link" href="#">Login</a></li></Link>
        </div>
    )
}

export default LoginButton
