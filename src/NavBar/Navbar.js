import React from "react";
import Wrapper from "../hoc/Wrapper";
import {NavLink} from "react-router-dom";
import "bootstrap/js/src/collapse.js";
import {useDispatch, useSelector} from "react-redux";
import allActions from "../actions";
import {Button} from "react-bootstrap";
const NavBar = () => {
    let isAuth = useSelector(state => state.auth.isAuthenticated);
     let user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const logOutUser = () => {
      dispatch(allActions.authActions.logoutUser())
    };

    return (
        <Wrapper>
        <nav className="navbar navbar-expand-lg navbar-dark shadow-lg fixed-top" style={{backgroundColor: "#74B266"}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand mb-0 h1" href="/">Plants and Reptiles MN</a>
            <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                <NavLink exact to="/" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Map</NavLink>
                <NavLink exact to="/about" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Learn how to help</NavLink>
                <NavLink exact to="/masterlist" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec"}}>Browse Species</NavLink>

                {isAuth ?
                    <NavLink exact to="/add" className="nav-item nav-link" activeClassName="nav-item nav-link active"
                             style={{color: "#f4f5ec"}}>Enter Data</NavLink>
                        : null
                }
            </div>
                {isAuth ?
                    <Wrapper className="nav-item nav-link">
                    <div>
                    <p className="border-0 p-0 m-0" style={{color: "#f4f5ec"}}>Logged in as {user.email}</p>
                    </div>
                        <Button className="border-0 p-1 m-0 ml-4" variant="danger" onClick={logOutUser}
                        >Log Out</Button>
                    </Wrapper>
                    : <NavLink exact to="/login" className="nav-item nav-link" activeClassName="nav-item nav-link active" style={{color: "#f4f5ec", marginLeft:"auto", marginBottom:"0"}}>Login</NavLink>
                }
            </div>
        </nav>
        </Wrapper>

)
}

export default NavBar;