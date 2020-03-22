import React from "react";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" style={{backgroundColor: "#74B266", marginBottom: "18px"}}>
            <span className="navbar-brand mb-0 h1">Plants and Reptiles MN</span>
            <div className="collapse navbar-collapse">
                <NavLink exact to="/" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Map</NavLink>
                <NavLink exact to="/about" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Learn how to help</NavLink>
                <NavLink exact to="/add" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Enter Data</NavLink>
                {/*<NavLink exact to="/auth" className="nav-item nav-link" activeClassName="nav-item nav-link active">Login</NavLink>*/}
            </div>
        </nav>

    )
}

export default NavBar;