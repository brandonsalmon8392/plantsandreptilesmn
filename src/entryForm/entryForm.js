import React, {Component} from "react";
import axios from "../axios-database"
import './entryForm.css'
import classes from './entryForm.css'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";
class entryForm extends Component {
    state = {
        map: null,
        countyClicked: false,
        clickedCounty: null,
        clickedCountyData: null,
        species: null,
        description: null,
        link: null,
        image: null
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
    handleSpeciesChange = (event) => {
        this.setState({species: event.target.value})
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }

    handleLinkChange = (event) => {
        this.setState({link: event.target.value})
    }

    handleImageChange = (event) => {
        this.setState({image: event.target.value})
    }

    postNewData = () => {
        let data = {
            species: this.state.species,
            description: this.state.description,
            link: this.state.link,
            image: this.state.image
        };
        axios.post('https://reptile-mn.firebaseio.com/counties.json', data);
    };

    render() {
        let county = <h1>Enter data for: Select a county</h1>;
        if(this.state.countyClicked) {
            county = <h1>Enter data for: {this.state.clickedCountyData.name}</h1>
        }
        return (
            <div className="App-header text-color">
                <div id="container">
                    <div className="left-half">
                        <article>
                            <div id="chartdiv" style={{height: "600px"}}/>
                        </article>
                    </div>
                    <div className="right-half">
                        <article>
                            {county}
                            <form>
                                <label>Species:</label>
                                <input type="text" placeholder="Species Name" onChange={this.handleSpeciesChange}/><br/>
                                <label>Description:</label>
                                <textarea placeholder="Description" onChange={this.handleDescriptionChange}/><br/>
                                <label>Link: </label>
                                <input type="text" placeholder="Link to more info" onChange={this.handleLinkChange}/><br/>
                                <label>Image: </label>
                                <input type="text" placeholder="Image URL" onChange={this.handleImageChange}/><br/>
                            </form>
                            <button onClick={this.postNewData}>Submit</button>
                        </article>
                    </div>
                </div>

            </div>
        );
    }
}

export default entryForm;