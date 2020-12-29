import {
    CREATE_MAP,
    REQUEST_COUNTY_DATA,
    REMOVE_COUNTY_DATA,
    GET_ALL_SPECIES
} from "../actions/";

export default (
    state = { map: null, countyData: null, masterList: null},
    action
) => { //fgfgasdsdasdsadasd
    switch (action.type) {
        case CREATE_MAP:
            return {
                ...state,
                map: action.payload
            };
        case REQUEST_COUNTY_DATA:
            return {
                ...state,
                countyData: action.payload
            };
        case GET_ALL_SPECIES:
            return {
                ...state,
                masterList: action.payload
            };
        case REMOVE_COUNTY_DATA:
            return {
                ...state
            };
        default:
            return state;
    }
};
