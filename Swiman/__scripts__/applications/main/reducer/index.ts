import { isType, IAction, immutable } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as Constants from "./../constants";
import * as ApiActions from "modules/api/actions";
import * as AppActions from "./../actions";

interface IAppState {
    seasons?: ApiModels.Season[]
    seasonSelected?: ApiModels.Season
    user?: ApiModels.User
}

const initial: IAppState = {
    seasons: [],
    seasonSelected: undefined,
    user: undefined
}

const reducer = (state: IAppState = initial, action: IAction<any>): IAppState => {

    if (isType(action, ApiActions.seasons.GetsSuccess) &&
        action.payload.request.request_id == Constants.init) {
        return {
            ...state,
            seasons: action.payload.response,
            seasonSelected: (action.payload.response.length > 0) ? action.payload.response[0] : undefined
        }
    }

    if (isType(action, AppActions.selectSeason)) {
        return {
            ...state,
            seasonSelected: action.payload
        };
    }

    if (isType(action, ApiActions.users.LoginSuccess)) {
        return {
            ...state,
            user: action.payload.response
        }
    }

    return state;
}


//-------------------------------------------------
import { injectAsyncReducer } from "modules/redux";
export interface IApp_Reducer {
    application: IAppState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "application", reducer);
}