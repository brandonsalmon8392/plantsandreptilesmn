import React, {Component} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";
import Wrapper from "../hoc/Wrapper";
import classes from "./mainPage.css";
import {} from 'react-router';


class mainPage extends Component {
    state = {
        map: null,
        countyClicked: false,
        clickedCounty: null,
        clickedCountyData: null
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
                clickedCountyData: event.target._dataItem._dataContext
            });
            this.state.clickedCounty.color = am4core.color("#367B25");
            console.log(event.target)
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.map.validate();
    }


    render() {
        let county = <h2 className="County">Select a county to see it's native species!</h2>;
        if (this.state.countyClicked) {
            county = (
                <Wrapper className={classes.County}>
                    <h2 className="County">{this.state.clickedCountyData.name} County</h2>
                    <p>Plants:</p>
                    <p>Trees:</p>
                    <p>Turtles:</p>
                    <p>Lizards:</p>
                    <p>Salamanders:</p>
                    <p>Snakes:</p>
                </Wrapper>
            );
        }

        return (
            <div className="App-header">
                <h2 style={{margin: "0 auto", color: "#74B266", marginBottom:"34px"}}>Native Plants and Reptiles MN</h2>

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
