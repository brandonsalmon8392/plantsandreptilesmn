import axios from "../axios-database";
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usaCountiesHigh from "@amcharts/amcharts4-geodata/region/usa/mnHigh";

export const CREATE_MAP = "CREATE_MAP";
export const REQUEST_COUNTY_DATA = "REQUEST_COUNTY_DATA";
export const REMOVE_COUNTY_DATA = "REMOVE_COUNTY_DATA";
export const GET_ALL_SPECIES = "GET_ALL_SPECIES";


const createMap = () => {
    return {
        type: CREATE_MAP
    };
};

const requestCountyData = countyData => {
    return {
        type: REQUEST_COUNTY_DATA,
        payload: countyData
    };
};

const deleteCountyData = () => {
  return {
      type: REMOVE_COUNTY_DATA
  }
};

const requestAllSpecies = data => {
    return {
        type: GET_ALL_SPECIES,
        payload: data
    };
};

export const getMap = () => dispatch => {
    dispatch(createMap());
};

export const getAllSpecies = () => dispatch => {
    axios.get('https://reptile-mn.firebaseio.com/counties.json').then(response => {
        dispatch(requestAllSpecies({
            data: Object.entries(response.data)
        }));
    });
};

export const getCountyData = (countyId) => dispatch => {
    axios.get('https://reptile-mn.firebaseio.com/counties.json').then(response => {
        let dataArray = Object.entries(response.data);
        let renderData = dataArray.filter(element =>
            (element[1].nativeCounties && element[1].nativeCounties.includes(countyId)) || element[1].countyID === countyId);

        let result = { countyId: countyId,
            data: renderData
        };

        dispatch(requestCountyData(result));
    });
};

export const removeCountyData = (data) => dispatch => {
    if (window.confirm("Are you sure?")) {
        console.log("Post Deleted");

        //Have to add .json to the end for firebase or it sends CORS block response
        //Weeks of my life lost figuring this bullshit out
        //Fuck firebase, all my homies hate firebase
        let dataurl = 'https://reptile-mn.firebaseio.com/counties/' + data.elementID + '.json';

        axios.delete(dataurl, { headers: {
                'Access-Control-Allow-Origin': '*',
            } }).then(dispatch(deleteCountyData()));
    }
};

export default {
    createMap,
    getCountyData,
    getAllSpecies,
    removeCountyData
}