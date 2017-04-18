import * as modRedux from "modules/redux";
import { isType, immutable } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../constants";

interface ISeasonState {
    seasons?: ApiModels.Season[]
    loading_seasons?: boolean
}

const initial: ISeasonState = {
    seasons: [],
    loading_seasons: false
};

const reducer = (state: ISeasonState = initial, action: modRedux.IAction<any>): ISeasonState => {

    if (isType(action, ApiActions.seasons.GetsRequest) &&
        action.payload.request_id == Constants.get_seasons) {
        return {
            ...state,
            loading_seasons: true
        };
    }
    if (isType(action, ApiActions.seasons.GetsSuccess) &&
        action.payload.request.request_id == Constants.get_seasons) {
        return {
            ...state,
            loading_seasons: false,
            seasons: action.payload.response
        };
    }
    if (isType(action, ApiActions.seasons.GetsFailed) &&
        action.payload.request.request_id == Constants.get_seasons) {
        return {
            ...state,
            loading_seasons: false
        };
    }

    if (isType(action, ApiActions.seasons.AddSuccess) &&
        action.payload.request.request_id == Constants.add_season) {
        return {
            ...state,
            seasons: immutable.Array.insert(state.seasons, action.payload.response)
        };
    }

    if (isType(action, ApiActions.seasons.UpdateSuccess) &&
        action.payload.request.request_id == Constants.update_season) {
        return {
            ...state,
            seasons: immutable.Array.update(state.seasons,
                (x) => x.id == action.payload.request.Request.season.id,
                (x) => {
                    return {
                        ...x,
                        ...action.payload.response
                    }
                }
            )
        };
    }
    

    return state;
}



import { injectAsyncReducer } from "modules/redux";
export interface ISeason_Reducer {
    route_seasons: ISeasonState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "route_seasons", reducer);
}