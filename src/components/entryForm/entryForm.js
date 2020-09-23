import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "../../axios-database"
import './entryForm.css'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import Button from "react-bootstrap/Button";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";

const EntryForm = () => {
    const [map, setMap] = useState(null);
    const [countyClicked, setCountyClicked] = useState(false);
    const [clickedCounty, setClickedCounty] = useState(null);
    const [clickedCountyData, setClickedCountyData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [dataRendered, setDataRendered] = useState(false);
    const [elementID, setElementID] = useState(null);
    const [species, setSpecies] = useState(null);
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);
    const [image, setImage] = useState(null);

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

            polygonSeries.mapPolygons.template.events.on("hit", (event) => {
                event.target.properties.fill = am4core.color("#367B25");
                setClickedCounty(clickedCounty);
                setClickedCountyData(clickedCountyData);
            });

            polygonTemplate.tooltipText = "{name} County";
            setMap(chart);


            return () => {
                chart.dispose()
            };
        }
        , []);

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const postNewData = (data) => {
        if (data.elementID) {
            let dataurl = 'https://reptile-mn.firebaseio.com/counties/';
            dataurl += data.elementID;
            axios.put(dataurl, {
                countyData: {
                    species: data.species,
                    description: data.description,
                    link: data.link,
                    image: data.image
                }
            })
        } else {
            let newData = {
                countyID: this.state.clickedCountyData.name,
                countyData:
                    {
                        species: this.state.species,
                        description: this.state.description,
                        link: this.state.link,
                        image: this.state.image
                    }
            };
            axios.post('https://reptile-mn.firebaseio.com/counties.json', newData);
        }
    };

    const editPost = (data) => {
        setElementID(data.elementID);
        setSpecies(data.species);
        setDescription(data.description);
        setLink(data.link);
        setImage(data.image);
    };

    const removePost = (data) => {
        if (window.confirm("Are you sure?")) {
            console.log("Post Deleted");
            let dataurl = 'https://reptile-mn.firebaseio.com/counties/' + data.elementID;
            axios.delete(dataurl);
        } else {
            return;
        }
    };

    const retrieveCountyData = () => {
        axios.get('https://reptile-mn.firebaseio.com/counties.json').then(response => {
            let dataArray = Object.entries(response.data);
            let renderData = null;
            let foundData = false;
            renderData = dataArray.map(element => {
                if (element[1].countyID) {
                    if (element[1].countyID === clickedCountyData.name) {
                        foundData = true;
                        let data = {
                            elementID: element[0],
                            species: element[1].countyData.species,
                            description: element[1].countyData.description,
                            link: element[1].countyData.link,
                            image: element[1].countyData.image
                        };
                        return (//asdasd
                            <div style={{border: "2px solid #74B266", display: "block", overflow: "auto"}}>
                                <p>{element[1].countyData.species}</p><br/>
                                <p style={{fontSize: "18px"}}>{element[1].countyData.description}</p><br/>
                                <Button variant="success" style={{float: "bottom"}} onClick={() => {
                                    window.location.href = element[1].countyData.link
                                }}>More Info</Button><br/>
                                <img className="dataImage" src={element[1].countyData.image} placeholder="Image"/>
                                <div className="controlButton">
                                    <Button variant="success" style={{marginRight: "5px"}} onClick={() => {
                                        editPost(data)
                                    }}>Edit</Button>
                                    <Button variant="danger" onClick={() => {
                                        removePost(data)
                                    }}>Delete</Button>
                                </div>
                            </div>);
                    }
                }
            });
            if (foundData) {
                setCurrentData(renderData);
                setDataRendered(true);
            }
        })
    };

    let county = "Enter data for: Select a county";
    if (countyClicked) {
        county = "Enter data for: " + clickedCountyData.name;
        retrieveCountyData();
    }
    let data = <p>No data here yet!</p>

    if (currentData) {
        data = currentData;
    }

    return (
        <div className="App-header text-color position-absolute w-100">
            <div id="container">
                <div className="left-half">
                    <article>
                        <div id="chartdiv" style={{height: "600px"}}/>
                    </article>
                </div>
                <div className="right-half">
                    <article>
                        <h1 className="header">{county}</h1>
                        <div className="left-half">
                            <form>
                                <label>Species:</label><br/>
                                <input type="text" placeholder="Species Name" onChange={handleSpeciesChange}
                                       value={species}/><br/>
                                <label>Description:</label><br/>
                                <textarea placeholder="Description" style={{fontSize: "18px"}}
                                          onChange={handleDescriptionChange}
                                          value={description}/><br/>
                                <label>Link: </label><br/>
                                <input type="text" placeholder="Link to more info" onChange={handleLinkChange}
                                       value={link}/><br/>
                                <label>Image: </label><br/>
                                <input type="text" placeholder="Image URL" onChange={handleImageChange}
                                       value={image}/><br/>
                                <img src={image} style={{height: "200px", width: "250px"}}
                                     alt="Preview"/><br/>
                            </form>
                            <button onClick={postNewData} className="Button Success">Submit</button>

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
};

export default EntryForm;