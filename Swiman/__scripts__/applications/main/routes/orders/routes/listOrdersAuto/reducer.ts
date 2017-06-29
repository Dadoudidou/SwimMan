import * as modRedux from "modules/redux";
import { isType, immutable } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./constants";

interface IState {
    orders?: ApiModels.OrderAuto[]
    searchCount?: number
    searchPage?: number
    searchLimit?: number

    categoryTrees?: ApiModels.CategoryTree[]
}

const initial: IState = {
    orders: [],
    searchLimit: 10,
    categoryTrees: []
};

const reducer = (state: IState = initial, action: modRedux.IAction<any>): IState => {

    if (isType(action, ApiActions.orders.SearchOrdersAutoSuccess) &&
        action.payload.request.request_id == Constants.search) {
        return {
            ...state,
            orders: action.payload.response.ordersAuto,
            searchCount: action.payload.response.count,
            searchPage: action.payload.response.page
        };
    }

    if (isType(action, ApiActions.activities.GetTreeSuccess) &&
        action.payload.request.request_id == Constants.search) {
        return {
            ...state,
            categoryTrees: action.payload.response
        }
    }

    return state;
}

import { injectAsyncReducer } from "modules/redux";
export interface IOrdersList_Reducer {
    route_Orders_Auto_List: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "route_Orders_Auto_List", reducer);
}