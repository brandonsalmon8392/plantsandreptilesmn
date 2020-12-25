import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "../../axios-database";
import './EntryForm.css';
import * as Constants from "../../resources/constants/Constants";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";
import {useDispatch, useSelector} from "react-redux";
import allActions from "../../actions";
import InfoCard from "../UI/InfoCard/InfoCard";
import ClipLoader from "react-spinners/ClipLoader";
import {css} from "@emotion/react";
import CardList from "../UI/CardList/CardList";

const EntryForm = () => {
    const [clickedCountyData, setClickedCountyData] = useState(null);
    const [countyData, setCountyData] = useState(null);
    const [elementID, setElementID] = useState(null);
    const [species, setSpecies] = useState(null);
    const [category, setCategory] = useState(null);
    const [scientificName, setScientificName] = useState(null);
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);
    const [image, setImage] = useState(null);
    const [nativeCounties, setNativeCounties] = useState([]);
    const [submitInProgress, setSubmitInProgress] = useState(false);

    const dispatch = useDispatch();

    const renderData = useSelector(state => state.map.countyData);

    const override = css`
                      display: block;
                      margin: auto;
                    `;

    useLayoutEffect(() => {
            am4core.disposeAllCharts();

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
            polygonTemplate.togglable = true;
            let hs = polygonTemplate.states.create("hover");
            hs.properties.fill = am4core.color("#367B25");

            let as = polygonTemplate.states.create("active");
            as.properties.fill = am4core.color("#367B25");

            polygonSeries.mapPolygons.template.events.on("hit", (event) => {
                setClickedCountyData({name: event.target._dataItem.dataContext.name});
            });

            polygonTemplate.tooltipText = "{name} County";

            return () => {
                chart.dispose();
            };
        }
        , []);

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleScientificNameChange = (event) => {
        setScientificName(event.target.value);
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
        setSubmitInProgress(true);
        let dataurl = 'https://reptile-mn.firebaseio.com/counties';
        let data = {};
        if (elementID) {
            dataurl += '/' + elementID;
            data = {
                nativeCounties: nativeCounties,
                countyData: {
                    species: species,
                    category: category,
                    scientificName: scientificName,
                    description: description,
                    link: link,
                    image: image
                }
            };
        } else {
            dataurl += '.json';
            data = {
                nativeCounties: nativeCounties,
                countyData:
                    {
                        species: species,
                        category: category,
                        scientificName: scientificName,
                        description: description,
                        link: link,
                        image: image
                    }
            };
        }
        axios.post(dataurl, data).then(setSubmitInProgress(false));

    };

    const editPost = (data) => {
        setElementID(data.elementID);
        setSpecies(data.species);
        setCategory(data.category);
        setScientificName(data.scientificName);
        setDescription(data.description);
        setLink(data.link);
        setImage(data.image);
    };

    const removePost = (data) => {
        if (window.confirm("Are you sure?")) {
            let dataurl = 'https://reptile-mn.firebaseio.com/counties/' + data.elementID;
            axios.delete(dataurl).then(console.log("Post Deleted"));
        } else {
            return;
        }
    };

    useEffect(() => {
        if(clickedCountyData) {
            const county = clickedCountyData.name;
            if (nativeCounties.includes(county)) {
                setNativeCounties(nativeCounties.filter(nativeCounty => nativeCounty !== county));
            } else {
                setNativeCounties(nativeCounties => [...nativeCounties, county]);
            }
        }
        }
        ,[clickedCountyData]
    )

    useEffect(() => {
            if (renderData) {
                setCountyData(
                    <CardList data={[...renderData]}/>
                );
            }
            if (!renderData || renderData.length === 0) {
                setCountyData(<div>
                    <p>No data here yet!</p>
                </div>);
            }

        },
        [renderData]
    );

    return (
        <div className="App-header text-color w-100">
            <h1 className="header ml-auto mr-auto">Enter Data</h1>

            <div id="container">
                <div className="left-half">
                    <article className="top-half">
                        <div id="chartdiv" className="entry-map"/>
                    </article>
                    <article className="bottom-half text-color text-center">
                        <h2>Selected Counties</h2>
                        {nativeCounties.map(county => {
                            return (
                                    <h6>{county}<br/></h6>
                            )
                        })}
                    </article>
                </div>
                <div className="right-half">
                    <article>
                        <br/>
                        <div className="top-half overflow-hidden">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="species"
                                           className="col-sm-3 col-form-label display-1">Species:</label>
                                    <div className="col-sm-9">
                                        <input className="form-control-lg w-100" id="species" type="text"
                                               placeholder="Species Name"
                                               onChange={handleSpeciesChange}
                                               value={species}/><br/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="category"
                                           className="col-sm-3 col-form-label display-1">Category:</label>
                                    <div className="col-sm-9">
                                        <select id="category" className="col-sm-6 form-control-lg" value={category}
                                                onChange={handleCategoryChange}>
                                            <option value={undefined}>Select</option>
                                            {Constants.ReptileCategories.map(category => {
                                                return (
                                                    <option value={category}>{category}</option>
                                                );
                                            })}
                                            {Constants.PlantCategories.map(category => {
                                                return (
                                                    <option value={category}>{category}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="species" className="col-sm-3 col-form-label display-1">Scientific
                                        Name:</label>
                                    <div className="col-sm-9">
                                        <input className="form-control-lg w-100" id="species" type="text"
                                               placeholder="Scientific Name"
                                               onChange={handleScientificNameChange}
                                               value={scientificName}/><br/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="description"
                                           className="col-sm-3 col-form-label display-1">Description:</label>
                                    <div className="col-sm-9">
                                    <textarea className="form-control-lg w-100" id="description"
                                              placeholder="Description"
                                              style={{fontSize: "18px"}}
                                              onChange={handleDescriptionChange}
                                              value={description}/><br/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="link" className="col-sm-3 col-form-label display-1">Link: </label>
                                    <div className="col-sm-9">
                                        <input className="form-control-lg w-100" id="link" type="text"
                                               placeholder="Link to more info"
                                               onChange={handleLinkChange}
                                               value={link}/><br/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="image" className="col-sm-3 col-form-label display-1">Image: </label>
                                    <div className="col-sm-9">
                                        <input className="form-control-lg w-100" id="image" type="text"
                                               placeholder="Image URL"
                                               onChange={handleImageChange}
                                               value={image}/><br/>
                                    </div>
                                </div>
                                <img src={image} style={{height: "200px", width: "250px"}}
                                     alt="Preview"/><br/>
                            </form>
                            {submitInProgress ?
                                <i className="fa fa-circle-o-notch fa-spin"></i>
                                :
                                <button onClick={postNewData} className="Button Success float-lg-right">Submit</button>}


                        </div>
                    </article>

                </div>
            </div>
        </div>
    );
};

export default EntryForm;
