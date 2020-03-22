import React, {Component, useContext} from 'react';
import './App.css';
import classes from './App.css'
import {Route, Switch, __RouterContext} from 'react-router-dom'
import {useTransition, animated} from "react-spring";
import NavBar from "./NavBar/Navbar";
import mainPage from './mainPage/mainPage';
import entryForm from './entryForm/entryForm'
import aboutPage from './aboutPage/aboutPage'
import Auth from "./Auth/Auth";

const App = () => {

    const {location} = useContext(__RouterContext);

    console.log(location)
    const transitions = useTransition(location, location => location.pathname, {
        from: {opacity: 0, transform: "translate(100%,0)"},
        enter: {opacity: 1, transform: "translate(0%,0)"},
        leave: {opacity: 0, transform: "translate(-50%,0)"}
    });

//sdfsdf
    return (
        <div style={{backgroundColor: "#282c34"}}>
            <NavBar/>
            {transitions.map(({item, props, key}) => (
                <animated.div key={key} style={props}>
                    <Switch location={item}>
                        <Route exact path="/" component={mainPage}/>
                        <Route exact path="/about" component={aboutPage}/>
                        <Route exact path="/add" component={entryForm}/>
                        <Route exact path="/login" component={Auth}/>
                    </Switch>
                </animated.div>
            ))}

        </div>
    );

};

export default App;
