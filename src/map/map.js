import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";

const map = () => {

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
};

export default map;