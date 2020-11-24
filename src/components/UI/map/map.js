import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";

const MNMap = (props) => {
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
        props.onHit(event.target._dataItem.dataContext.name);
    });

    return(
        <div id="chartdiv" style={{height: "50vh"}}/>
    );
};

export default MNMap;