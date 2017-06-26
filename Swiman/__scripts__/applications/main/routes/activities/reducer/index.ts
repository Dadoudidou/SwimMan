import * as modRedux from "modules/redux";
import { isType, immutable } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../constants";

interface IActivitiesState {
    categories?: ApiModels.CategoryTree[]
}

const initial: IActivitiesState = {
    categories: []
};

const reducer = (state: IActivitiesState = initial, action: modRedux.IAction<any>): IActivitiesState => {


    //listing de catégories
    if (isType(action, ApiActions.activities.GetTreeSuccess) &&
        action.payload.request.request_id == Constants.get_categories) {
        return {
            ...state,
            categories: action.payload.response
        };
    }

    
    

    return state;
}



import { injectAsyncReducer } from "modules/redux";
export interface IActivities_Reducer {
    route_Activities: IActivitiesState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "route_Activities", reducer);
}