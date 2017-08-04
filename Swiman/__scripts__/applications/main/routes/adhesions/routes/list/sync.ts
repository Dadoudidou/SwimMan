// *** Constants
export const Constants = {
    search_adhesions: "routes/members/list/search_adhesions"
}

// *** Actions
import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";

export const Actions = {
    init: actionCreator("AdhesionsList/init"),
}

// *** Reducer
import { isType, IAction } from "modules/redux";

interface IState {
    adhesions?: ApiModels.Adhesion[]
    searchCount?: number
    searchPage?: number
    searchLimit?: number

}
const InitialState: IState = {
    adhesions: [],
    searchLimit: 10
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {

    if (isType(action, Actions.init)) return InitialState;

    //search
    if (isType(action, ApiActions.members.SearchAdhesionsSuccess) &&
        action.payload.request.request_id == Constants.search_adhesions) {
        return {
            ...state,
            adhesions: action.payload.response.adhesions,
            searchCount: action.payload.response.count,
            searchPage: action.payload.response.page
        };
    }

    return state;
}

// ** Load Reducer
import { injectAsyncReducer } from "modules/redux";
export interface IAdhesionsListReducer {
    AdhesionsList: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "AdhesionsList", Reducer);
}
