import React, {Component} from 'react';
import './App.css';
import classes from './App.css'
import {Route, Switch} from 'react-router-dom'
import axios from './axios-database'
import Wrapper from "./hoc/Wrapper";
import mainPage from './mainPage/mainPage';
import entryForm from './entryForm/entryForm'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh"

class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={mainPage}/>
                    <Route path="/add" component={entryForm}/>
                </Switch>
            </div>
        );
    }
}

export default App;
