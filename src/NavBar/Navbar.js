import React from "react";
import Wrapper from "../hoc/Wrapper";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <Wrapper>
        <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" style={{backgroundColor: "#74B266"}}>
            <span className="navbar-brand mb-0 h1">Plants and Reptiles MN</span>
            <div className="collapse navbar-collapse">
                <NavLink exact to="/" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Map</NavLink>
                <NavLink exact to="/about" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Learn how to help</NavLink>
                <NavLink exact to="/add" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Enter Data</NavLink>
                {/*<NavLink exact to="/auth" className="nav-item nav-link" activeClassName="nav-item nav-link active">Login</NavLink>*/}
            </div>
        </nav>
        <div style={{width: "100%", height:"18px", backgroundColor: "#283334c7"}}></div>
        </Wrapper>

)
}

export default NavBar;