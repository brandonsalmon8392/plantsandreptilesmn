import React, {Component} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";
import Wrapper from "../hoc/Wrapper";
import classes from "./mainPage.css";
import Button from "react-bootstrap/Button";
import {} from 'react-router';
import axios from "../axios-database";


class mainPage extends Component {
    state = {
        map: null,
        countyClicked: false,
        clickedCounty: null,
        clickedCountyData: null,
        countyData: null,
        dataRendered: false
    }

    componentDidMount() {
        let map = am4core.create("chartdiv", am4maps.MapChart);
        map.homeZoomLevel = 4;
        map.homeGeoPoint = {
            latitude: -100,
            longitude: 30
        };
        map.geodata = am4geodata_region_usaCountiesHigh;
        map.projection = new am4maps.projections.AlbersUsa();
        let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{NAME}";
        polygonTemplate.fill = am4core.color("#74B266");
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");
        polygonTemplate.tooltipText = "{name} County";
        this.setState({map: map});

        polygonSeries.mapPolygons.template.events.on("hit", (event) => {
            if (this.state.clickedCounty != null) {
                this.state.clickedCounty.color = am4core.color("#74B266")
            }

            this.setState({
                countyClicked: true,
                clickedCounty: event.target,
                clickedCountyData: event.target._dataItem._dataContext,
                countyData: null,
                dataRendered: false
            });
            this.state.clickedCounty.color = am4core.color("#367B25");
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.map.validate();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.dataRendered) {
            return false;
        }
        else {
            return true;
        }
    }

    retrieveCountyData = () => {
        axios.get('https://reptile-mn.firebaseio.com/counties.json').then(response => {
            let dataArray = Object.entries(response.data);
            console.log(dataArray);
            let renderData = null;
            let foundData = false;
             renderData = dataArray.map(element => {
                console.log(element[1].countyID)
                if(element[1].countyID) {
                    if (element[1].countyID === this.state.clickedCountyData.name) {
                            foundData = true;
                        return (
                            <div style={{border: "2px solid #74B266"}}>
                                <p>{element[1].countyData.species}</p>
                                <p style={{fontSize: "18px"}}>{element[1].countyData.description}</p>
                                <Button variant= "success" onClick={element[1].countyData.link}>More Info</Button><br/>
                                <img src={element[1].countyData.image} placeholder="Image"/>
                            </div>);
                    }
                }
            });
             if(foundData) {
                 this.setState({countyData: renderData, dataRendered: true});
             }

        })
    }



    render() {
        let county = <h2 className="County">Select a county to see it's native species!</h2>;
        if (this.state.countyClicked) {
            this.retrieveCountyData();
            let data = this.state.countyData;
            console.log(this.state.countyData)
            if(!data) {
                data = (<div>
                    <p>No data here yet!</p>
                </div>);
            }

            county = (
                <Wrapper className={classes.County}>
                    <h2 className="County">{this.state.clickedCountyData.name} County</h2>
                    {data}
                </Wrapper>
            );
        }

        return (
            <div className="App-header">
                <h1 style={{margin: "0 auto", color: "#74B266", marginBottom: "34px"}}>Native Plants and Reptiles
                    MN</h1>

                <div id="container">
                    <div className="left-half">
                        <article>
                            <div id="chartdiv" style={{height: "600px"}}/>
                        </article>
                    </div>
                    <div className="right-half">
                        <article>
                            {county}
                        </article>
                    </div>
                </div>
            </div>
        );
    }
}

export default mainPage;
