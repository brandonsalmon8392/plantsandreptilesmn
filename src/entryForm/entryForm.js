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
        currentData: null,
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
                clickedCountyData: event.target._dataItem._dataContext,
                currentData: null,
                species: null,
                description: null,
                link: null,
                image: null

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
        console.log(this.state.description)
    }

    handleLinkChange = (event) => {
        this.setState({link: event.target.value})
    }

    handleImageChange = (event) => {
        this.setState({image: event.target.value})
    }

    postNewData = () => {
        let data = {
            countyID: this.state.clickedCountyData.name,
            countyData:
        {
            species: this.state.species,
            description: this.state.description,
            link: this.state.link,
            image: this.state.image
            }
        };
        axios.post('https://reptile-mn.firebaseio.com/counties.json', data);
    };

    editPost(data) {
        this.setState({
            species: data.species,
            description: data.description,
            link: data.link,
            image: data.image
        })
    }

    removePost() {

    }

    retrieveCountyData() {
        axios.get('https://reptile-mn.firebaseio.com/counties.json').then(response => {
            let dataArray = Object.entries(response.data);
            console.log(dataArray);
            let renderData = null;
            let foundData = false;
            renderData = dataArray.map(element => {
                console.log(element[1].countyID)
                if(element[1].countyID) {
                    if (element[1].countyID === this.state.clickedCountyData.name) {
                        console.log(element[1].countyData.species);
                        foundData = true;
                        let data = {
                            species: element[1].countyData.species,
                            description: element[1].countyData.description,
                            link: element[1].countyData.link,
                            image: element[1].countyData.image
                        };
                        return (
                            <div style={{border: "2px solid #74B266"}}>
                                <p>{element[1].countyData.species}</p>
                                <p style={{fontSize: "18px"}}>{element[1].countyData.description}</p>
                                <a href={element[1].countyData.link}>More Info</a><br/>
                                <img src={element[1].countyData.image} placeholder="Image"/>
                                <button onClick= {() => {this.editPost(data)}}>Edit</button>
                            </div>);
                    }
                }
            });
            if(foundData) {
                this.setState({currentData: renderData});
            }

        })
    }

    render() {
        let county = <h1>Enter data for: Select a county</h1>;
        if(this.state.countyClicked) {
            county = <h1>Enter data for: {this.state.clickedCountyData.name}</h1>
            this.retrieveCountyData();

        }
        let data = <p>No data here yet!</p>

        if(this.state.currentData) {
            data = this.state.currentData
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
                            <div className="left-half">
                            <form>
                                <label>Species:</label>
                                <input type="text" placeholder="Species Name" onChange={this.handleSpeciesChange} value={this.state.species}/><br/>
                                <label>Description:</label>
                                <textarea placeholder="Description" onChange={this.handleDescriptionChange} value={this.state.description}/><br/>
                                <label>Link: </label>
                                <input type="text" placeholder="Link to more info" onChange={this.handleLinkChange} value={this.state.link}/><br/>
                                <label>Image: </label>
                                <input type="text" placeholder="Image URL" onChange={this.handleImageChange} value={this.state.image}/><br/>
                                <img src={this.state.image} style={{width: "300px", height: "200px"}} alt="Preview"/>
                            </form>
                            <button onClick={this.postNewData}>Submit</button>
                            </div>
                        </article>
                        <article className="right-half" style={{height: "600px"}}>
                            <label className="text-color">Current Data:</label>
                            {data}
                        </article>
                    </div>
                </div>

            </div>
        );
    }
}

export default entryForm;