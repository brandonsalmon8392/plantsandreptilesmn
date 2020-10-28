import axios from "../axios-database";
import React from "react";

export const CREATE_MAP = "CREATE_MAP";
export const REQUEST_COUNTY_DATA = "REQUEST_COUNTY_DATA";
export const REMOVE_COUNTY_DATA = "REMOVE_COUNTY_DATA";


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

export const getMap = () => dispatch => {
    dispatch(createMap());
};

export const getCountyData = (countyId) => dispatch => {
    axios.get('https://reptile-mn.firebaseio.com/counties.json',  { crossdomain: true }).then(response => {
        let dataArray = Object.entries(response.data);
        let renderData = dataArray.filter(element => element[1].countyID === countyId);

        dispatch(requestCountyData(renderData));
    });
};

export const removeCountyData = (data) => dispatch => {
    if (window.confirm("Are you sure?")) {
        console.log("Post Deleted");
        let dataurl = 'https://reptile-mn.firebaseio.com/counties/' + data.elementID;
        axios.delete(dataurl, { headers: {
                'Access-Control-Allow-Origin': '*',
            } }).then(dispatch(deleteCountyData()));
    }
};

export default {
    createMap,
    getCountyData
}