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
import {Redirect} from "react-router";
import {Modal} from "react-bootstrap";

const EntryFormModal = (props) => {
    const [clickedCountyData, setClickedCountyData] = useState(null);
    const [elementID, setElementID] = useState(props.data.elementID);
    const [species, setSpecies] = useState(props.data.species);
    const [category, setCategory] = useState(props.data.category);
    const [scientificName, setScientificName] = useState(props.data.scientificName);
    const [description, setDescription] = useState(props.data.description);
    const [link, setLink] = useState(props.data.link);
    const [image, setImage] = useState(props.data.image);
    const [nativeCounties, setNativeCounties] = useState(props.data.nativeCounties || []);
    const [submitInProgress, setSubmitInProgress] = useState(false);
    const [displayModal, setDisplayModal] = useState(props.display);
    const toggleModal = () => {
        setDisplayModal(!displayModal);
    };

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
            dataurl += '/' + elementID + '.json';
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
    return (
        <Modal size="lg" show={displayModal} onHide={toggleModal}>
            <div className="modal-body card-modal" style={{backgroundColor: "#282c34"}}>
                <div id="container">
                    <div className="left-half">
                        <article style={{height: "400px"}}>
                            <div id="chartdiv" className="entry-map"/>
                        </article>
                        <article className="text-color text-center">
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
                                        <label htmlFor="link"
                                               className="col-sm-3 col-form-label display-1">Link: </label>
                                        <div className="col-sm-9">
                                            <input className="form-control-lg w-100" id="link" type="text"
                                                   placeholder="Link to more info"
                                                   onChange={handleLinkChange}
                                                   value={link}/><br/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="image"
                                               className="col-sm-3 col-form-label display-1">Image: </label>
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
                                    <button onClick={postNewData}
                                            className="Button Success float-lg-right">Submit</button>}


                            </div>
                        </article>

                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EntryFormModal