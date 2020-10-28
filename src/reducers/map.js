import {
    CREATE_MAP,
    REQUEST_COUNTY_DATA,
    REMOVE_COUNTY_DATA
} from "../actions/";

export default (
    state = { map: null, countyData: null},
    action
) => { //fgfgasdsdasdsadasd
    switch (action.type) {
        case CREATE_MAP:
            return {
                ...state
            };
        case REQUEST_COUNTY_DATA:
            return {
                ...state,
                countyData: action.payload
            };
        case REMOVE_COUNTY_DATA:
            return {
                ...state
            };
        default:
            return state;
    }
};
