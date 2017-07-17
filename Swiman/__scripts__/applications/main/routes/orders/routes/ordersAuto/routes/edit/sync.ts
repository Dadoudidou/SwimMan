// *** Constants
export const Constants = {
    getElement: "routes/orders/ordersAuto/Edit/getElement",
    getCategories: "routes/orders/ordersAuto/Edit/getCategories",
    getActivites: "routes/orders/ordersAuto/Edit/getActivites",
    getSections: "routes/orders/ordersAuto/Edit/getSections",
    saveElement: "routes/orders/ordersAuto/Edit/saveElement"
}

// *** Actions
import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";

export const Actions = {
    init: actionCreator("OrdersAutoEdit/init")
}

// *** Reducer
import { isType, IAction } from "modules/redux";

interface IState {
    order?: ApiModels.OrderAuto
    categories?: ApiModels.CategoryTree[]
}
const InitialState: IState = {
    categories: []
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {

    if (isType(action, Actions.init)) return InitialState;

    if (isType(action, ApiActions.orders.SearchOrdersAutoSuccess) &&
        action.payload.request.request_id == Constants.getElement &&
        action.payload.response.ordersAuto.length > 0) {
        return {
            ...state,
            order: action.payload.response.ordersAuto[0]
        };
    }

    if (isType(action, ApiActions.activities.GetTreeSuccess) &&
        action.payload.request.request_id == Constants.getCategories) {
        return {
            ...state,
            categories: action.payload.response
        };
    }


    return state;
}

// ** Load Reducer
import { injectAsyncReducer } from "modules/redux";
export interface IOrdersAutoEditReducer {
    OrdersAutoEdit: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "OrdersAutoEdit", Reducer);
}
