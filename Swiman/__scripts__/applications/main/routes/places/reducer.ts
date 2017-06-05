import * as modRedux from "modules/redux";
import { isType, immutable } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./constants";

interface IPlacesState {
    places?: ApiModels.Place[],
    selectedPlace?: ApiModels.Place
}

const initial: IPlacesState = {
    places: []
};

const reducer = (state: IPlacesState = initial, action: modRedux.IAction<any>): IPlacesState => {

    if (isType(action, ApiActions.activities.GetPlacesSuccess) &&
        action.payload.request.request_id == Constants.search_places) {
        return {
            ...state,
            places: action.payload.response
        };
    }

    if (isType(action, ApiActions.activities.GetPlaceByIdSuccess) &&
        action.payload.request.request_id == Constants.view_place) {
        return {
            ...state,
            selectedPlace: action.payload.response
        };
    }

    return state;
}



import { injectAsyncReducer } from "modules/redux";
export interface IPlaces_Reducer {
    route_Places: IPlacesState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "route_Places", reducer);
}