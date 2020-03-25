import React from "react";
import Wrapper from "../hoc/Wrapper";
import {NavLink} from "react-router-dom";
import "bootstrap/js/src/collapse.js";
const NavBar = () => {
    return (
        <Wrapper>
        <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" style={{backgroundColor: "#74B266"}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand mb-0 h1" href="/">Plants and Reptiles MN</a>
            <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                <NavLink exact to="/" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Map</NavLink>
                <NavLink exact to="/about" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Learn how to help</NavLink>
                <NavLink exact to="/add" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Enter Data</NavLink>
                {/*<NavLink exact to="/auth" className="nav-item nav-link" activeClassName="nav-item nav-link active">Login</NavLink>*/}
            </div>
            </div>
        </nav>
        <div style={{width: "100%", height:"18px", backgroundColor: "#283334c7"}}></div>
        </Wrapper>

)
}

export default NavBar;