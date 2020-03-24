import React, {useContext} from 'react';
import './App.css';
import {Route, Switch, __RouterContext} from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRouter";
import { connect } from "react-redux";
import {useTransition, animated} from "react-spring";
import NavBar from "./NavBar/Navbar";
import mainPage from './components/mainPage/mainPage';
import entryForm from './components/entryForm/entryForm'
import aboutPage from './components/aboutPage/aboutPage'
import Login from "./components/login"

const App = (props) => {

    const {location} = useContext(__RouterContext);
    const { isAuthenticated, isVerifying } = props;

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
                        <ProtectedRoute
                            exact
                            path="/add"
                            component={entryForm}
                            isAuthenticated={isAuthenticated}
                            isVerifying={isVerifying}
                        />
                        <Route path="/login" component={Login} />
                        {/*<Route exact path="/login" component={Auth}/>*/}
                    </Switch>
                </animated.div>
            ))}

        </div>
    );

};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying
    };
}
export default connect(mapStateToProps)(App);
