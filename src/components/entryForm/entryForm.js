import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "../../axios-database"
import './entryForm.css'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";
import {useDispatch, useSelector} from "react-redux";
import allActions from "../../actions";
import InfoCard from "../infoCard/infoCard";
import Wrapper from "../../hoc/Wrapper";
import classes from "../mainPage/mainPage.css";

const EntryForm = () => {
    const [map, setMap] = useState(null);
    const [clickedCountyData, setClickedCountyData] = useState(null);
    const [countyData, setCountyData] = useState(null);
    const [displayedData, setDisplayedData] = useState(null);
    const [elementID, setElementID] = useState(null);
    const [species, setSpecies] = useState(null);
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const renderData = useSelector(state => state.map.countyData);

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
                retrieveCountyData(event.target._dataItem.dataContext.name);
                setClickedCountyData({name: event.target._dataItem.dataContext.name});
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

    const postNewData = () => {
        if (elementID) {
            let dataurl = 'https://reptile-mn.firebaseio.com/counties/';
            dataurl += elementID;
            axios.put(dataurl, {
                countyData: {
                    species: species,
                    description: description,
                    link: link,
                    image: image
                }
            }).then(console.log('Posted that shit fam'))
        } else {
            let newData = {
                countyID: clickedCountyData.name,
                countyData:
                    {
                        species: species,
                        description: description,
                        link: link,
                        image: image
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


    const retrieveCountyData = (id) => {
        dispatch(allActions.mapActions.getCountyData(id));
    };

    useEffect(() => {
            if (renderData) {
                setCountyData(renderData.map(cardItem => {
                    return (
                        <InfoCard data={{elementID: cardItem[0], ...cardItem[1].countyData}} onEdit={editPost}
                                  onDelete={removePost}/>)
                }));
            }
            if (!renderData || renderData.length === 0) {
                setCountyData(<div>
                    <p>No data here yet!</p>
                </div>);
            }

            setDisplayedData(
                <Wrapper className={classes.County} style={{height: "40%"}}>
                    <h2 className="County">{clickedCountyData != null ? clickedCountyData.name :
                        <h2 className="County">Enter data for: Select a county</h2>} County</h2>
                    {countyData}
                </Wrapper>
            );
        }
        ,
        [renderData]
    );

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
                        <h1 className="header">{clickedCountyData != null ? 'Enter data for: ' + clickedCountyData.name + ' County' :
                            'Enter data for: Select a county'}</h1>
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
                        {countyData}
                    </article>
                </div>
            </div>
        </div>
    );
};

export default EntryForm;