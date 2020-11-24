import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "../../axios-database"
import './EntryForm.css'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";
import {useDispatch, useSelector} from "react-redux";
import allActions from "../../actions";
import InfoCard from "../UI/InfoCard/InfoCard";
import ClipLoader from "react-spinners/ClipLoader";
import {css} from "@emotion/react";

const EntryForm = () => {
    const [clickedCountyData, setClickedCountyData] = useState(null);
    const [countyData, setCountyData] = useState(null);
    const [elementID, setElementID] = useState(null);
    const [species, setSpecies] = useState(null);
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);
    const [image, setImage] = useState(null);
    const [submitInProgress, setSubmitInProgress] = useState(false);

    const dispatch = useDispatch();

    const renderData = useSelector(state => state.map.countyData);

    const override = css`
                      display: block;
                      margin: auto;
                    `;

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
                setCountyData(
                    <ClipLoader color={"#74B266"} size={75} css={override}/>
                );
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
                countyData: {
                    species: species,
                    description: description,
                    link: link,
                    image: image
                }
            };
        } else {
            dataurl += '.json';
            data = {
                countyID: clickedCountyData.name,
                countyData:
                    {
                        species: species,
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
                        <br/>
                        <div className="top-half">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="species" className="col-sm-3 col-form-label">Species:</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" id="species" type="text"
                                               placeholder="Species Name"
                                               onChange={handleSpeciesChange}
                                               value={species}/><br/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="description"
                                           className="col-sm-3 col-form-label">Description:</label>
                                    <div className="col-sm-9">
                                    <textarea className="form-control" id="description" placeholder="Description"
                                              style={{fontSize: "18px"}}
                                              onChange={handleDescriptionChange}
                                              value={description}/><br/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="link" className="col-sm-3 col-form-label">Link: </label>
                                    <div className="col-sm-9">
                                        <input className="form-control" id="link" type="text"
                                               placeholder="Link to more info"
                                               onChange={handleLinkChange}
                                               value={link}/><br/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="image" className="col-sm-3 col-form-label">Image: </label>
                                    <div className="col-sm-9">
                                        <input className="form-control" id="image" type="text" placeholder="Image URL"
                                               onChange={handleImageChange}
                                               value={image}/><br/>
                                    </div>
                                </div>
                                <img src={image} style={{height: "200px", width: "250px"}}
                                     alt="Preview"/><br/>
                            </form>
                            {submitInProgress ? <button className="buttonload btn-success float-lg-right">
                                    <i className="fa fa-circle-o-notch fa-spin"></i>Loading
                                </button> :
                                <button onClick={postNewData} className="Button Success float-lg-right">Submit</button>}


                        </div>
                    </article>
                    <article className="bottom-half" style={{height: "600px"}}>
                        <label className="text-color">Current Data:</label>
                        {countyData}
                    </article>
                </div>
            </div>
        </div>
    );
};

export default EntryForm;