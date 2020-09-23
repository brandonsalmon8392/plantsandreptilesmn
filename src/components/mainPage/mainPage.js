import React, {Component, useEffect, useLayoutEffect, useState} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";
import Wrapper from "../../hoc/Wrapper";
import classes from "./mainPage.css";
import Button from "react-bootstrap/Button";
import {} from 'react-router';
import axios from "../../axios-database";


const MainPage = () => {
    const [map, setMap] = useState(null);
    const [clickedCounty, setClickedCounty] = useState(null);
    const [clickedCountyData, setClickedCountyData] = useState(null);
    const [dataRendered, setDataRendered] = useState(false);
    const [countyData, setCountyData] = useState(null);

    useLayoutEffect(() => {
            let chart = am4core.create("chartdiv", am4maps.MapChart);
            chart.homeZoomLevel = 4;
            chart.homeGeoPoint = {
                latitude: -100,
                longitude: 30
            };
            chart.geodata = am4geodata_region_usaCountiesHigh;
            chart.projection = new am4maps.projections.AlbersUsa();
            let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
            polygonSeries.useGeodata = true;
            let polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{NAME}";
            polygonTemplate.fill = am4core.color("#74B266");
            let hs = polygonTemplate.states.create("hover");
            hs.properties.fill = am4core.color("#367B25");
            let as = polygonTemplate.states.create("active");
            as.properties.fill = am4core.color("#367B25");
            let ns = polygonTemplate.states.create("normal");
            ns.properties.fill = am4core.color("#74B266");
            polygonTemplate.tooltipText = "{name} County";

            polygonTemplate.events.on("hit", (event) => {
                let target = polygonSeries.getPolygonById(event.target._dataItem.dataContext.id)
                let prevTarget = null;
                if (clickedCounty) {
                    prevTarget = polygonSeries.getPolygonById(clickedCounty);
                }
                if (clickedCounty === event.target._dataItem.dataContext.id || !clickedCounty) {
                    target.setState("active");
                } else {
                    target.setState("active");
                    prevTarget.setState("normal");
                }

                setClickedCounty(event.target._dataItem.dataContext.id);
                setClickedCountyData(event.target._dataItem._dataContext);
                console.log(clickedCountyData)
            });

            setMap(chart);

            return () => {
                chart.dispose();
                chart = null;
            }
        },
        []
    );

    const retrieveCountyData = () => {
        axios.get('https://reptile-mn.firebaseio.com/counties.json').then(response => {
            let dataArray = Object.entries(response.data);
            let renderData = null;
            let foundData = false;
            renderData = dataArray.map(element => {
                if (element[1].countyID) {
                    if (element[1].countyID === clickedCountyData.name) {
                        foundData = true;
                        return (
                            <div style={{border: "2px solid #74B266", display: "block", overflow: "auto"}}>
                                <p>{element[1].countyData.species}</p><br/>
                                <img style={{float: "right"}} src={element[1].countyData.image} placeholder="Image"/>
                                <p style={{fontSize: "18px"}}>{element[1].countyData.description}</p><br/>
                                <Button variant="success" style={{float: "bottom"}} onClick={() => {
                                    window.location.href = element[1].countyData.link
                                }}>More Info</Button><br/>
                            </div>);
                    }
                }
            });
            if (foundData) {
                setCountyData(renderData);
                setDataRendered(true);
            }
        })
    };

    let county = <h2 className="County">Select a county to see it's native species!</h2>;
    if (clickedCounty) {
        retrieveCountyData();
        let data = countyData;

        if (!data) {
            data = (<div>
                <p>No data here yet!</p>
            </div>);
        }

        county = (
            <Wrapper className={classes.County} style={{height: "40%"}}>
                <h2 className="County">{clickedCountyData.name} County</h2>
                {data}
            </Wrapper>
        );
    }
    return (
        <div className="App-header position-absolute w-100">
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

};

export default MainPage;
