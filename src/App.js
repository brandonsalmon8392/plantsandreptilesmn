import React, {useContext} from 'react';
import './App.css';
import {Route, Switch, __RouterContext} from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRouter";
import {connect} from "react-redux";
import {useTransition, animated} from "react-spring";
import NavBar from "./NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import Wrapper from "./hoc/Wrapper";
import MainPage from './components/mainPage/mainPage';
import EntryForm from './components/entryForm/entryForm'
import aboutPage from './components/aboutPage/aboutPage'
import Login from "./components/login"

const App = (props) => {

    const {location} = useContext(__RouterContext);
    const {isAuthenticated, isVerifying} = props;

    const transitions = useTransition(location, location => location.pathname, {
        from: {opacity: 0, transform: "translate(100%,0)"},
        enter: {opacity: 1, transform: "translate(0%,0)"},
        leave: {opacity: 0, transform: "translate(-50%,0)"}
    });

//sdfsdfasdasd
    return (
        <Wrapper>
            <div style={{backgroundColor: "#282c34"}}>
                <NavBar/>
                {transitions.map(({item, props, key}) => (
                    <animated.div key={key} style={props}>
                        <Switch location={item}>
                            <Route exact path="/" component={MainPage}/>
                            <Route exact path="/about" component={aboutPage}/>
                            <ProtectedRoute
                                exact
                                path="/add"
                                component={EntryForm}
                                isAuthenticated={isAuthenticated}
                                isVerifying={isVerifying}
                            />
                            <Route path="/login" component={Login}/>
                            {/*<Route exact path="/login" component={Auth}/>*/}
                        </Switch>
                    </animated.div>
                ))}
                <Footer className="footer"/>
            </div>
        </Wrapper>
    );

};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying
    };
}

export default connect(mapStateToProps)(App);
