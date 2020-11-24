import React, {useEffect, useLayoutEffect, useState} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";
import {useDispatch, useSelector} from "react-redux";
import allActions from "../../actions/index"
import InfoCard from "../UI/InfoCard/InfoCard";
import classes from "./MainPage.css";
import ClipLoader from "react-spinners/ClipLoader";
import {css} from "@emotion/react";

const MainPage = (props) => {
    const [clickedCountyData, setClickedCountyData] = useState(null);
    const [countyData, setCountyData] = useState(null);

    const dispatch = useDispatch();

    let databaseResult = useSelector(state => state.map.countyData);

    const override = css`
                      display: block;
                      margin: auto;
                    `;

    useLayoutEffect(() => {
            am4core.options.autoDispose = true;

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
                console.log(event.target._dataItem.dataContext.name);
                setClickedCountyData({name: event.target._dataItem.dataContext.name});
                setCountyData(
                    <ClipLoader color={"#74B266"} size={75} css={override}/>
                );
                retrieveCountyData(event.target._dataItem.dataContext.name);
            });

            return () => {
                chart.dispose();
            }
        },
        []
    );

    const retrieveCountyData = (id) => {
        setClickedCountyData({name: id});
        dispatch(allActions.mapActions.getCountyData(id));
    };

    useEffect(() => {
        if (databaseResult) {
            if (databaseResult.length === 0) {
                setCountyData(<div>
                    <p>No data here yet!</p>
                </div>);
            }
            else {
                setCountyData(
                    databaseResult.map(cardItem => {
                        return (
                            <InfoCard data={{elementID: cardItem[0], ...cardItem[1].countyData}}/>)
                    })
                );
            }
        }
    }, [databaseResult]);

    return (
        <div className="App-header position-absolute w-100">
            <h1 className="title">Interactive Map</h1>
            <div id="container">
                <div className="left-half">
                    <article>
                        <div id="chartdiv" style={{height: "50vh"}}/>
                    </article>
                </div>
                <div className="right-half" style={{height: "80vh"}}>
                    <article>
                        <h2 className="County">{clickedCountyData != null ? clickedCountyData.name + ' County' :
                            <h2 className="County">Select a county to see it's native species!</h2>}</h2>
                        {countyData}
                    </article>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
