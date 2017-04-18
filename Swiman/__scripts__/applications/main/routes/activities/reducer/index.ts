import * as modRedux from "modules/redux";
import { isType, immutable } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../constants";

interface IActivitiesState {
    categories?: ApiModels.Category[]
    activities?: ApiModels.Activity[]
    sections?: ApiModels.Section[]

    selected_category?: ApiModels.Category
    selected_activity?: ApiModels.Activity
}

const initial: IActivitiesState = {
    categories: []
};

const reducer = (state: IActivitiesState = initial, action: modRedux.IAction<any>): IActivitiesState => {


    //listing de catégories
    if (isType(action, ApiActions.activities.GetCategoriesSuccess) &&
        action.payload.request.request_id == Constants.get_categories) {
        return {
            ...state,
            categories: action.payload.response,
            activities: [],
            sections: [],
            selected_category: undefined,
            selected_activity: undefined
        };
    }

    //selection de catégorie
    if (isType(action, ApiActions.activities.GetActivitiesRequest) &&
        action.payload.request_id == Constants.select_category) {
        return {
            ...state,
            selected_category: action.payload.Request.category,
            activities: [],
            sections: [],
            selected_activity: undefined
        };
    }
    if (isType(action, ApiActions.activities.GetActivitiesSuccess) &&
        action.payload.request.request_id == Constants.select_category) {
        return {
            ...state,
            activities: action.payload.response
        };
    }

    //selection d'activité
    if (isType(action, ApiActions.activities.GetSectionsRequest) &&
        action.payload.request_id == Constants.select_activity) {
        return {
            ...state,
            selected_activity: action.payload.Request.activity,
            sections: []
        };
    }
    if (isType(action, ApiActions.activities.GetSectionsSuccess) &&
        action.payload.request.request_id == Constants.select_activity) {
        return {
            ...state,
            sections: action.payload.response
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