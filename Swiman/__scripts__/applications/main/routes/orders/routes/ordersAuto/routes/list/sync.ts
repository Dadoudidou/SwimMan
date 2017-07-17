// *** Constants
export const Constants = {
    search: "routes/orders/ordersAuto/list/search"
}

// *** Actions
import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";

export const Actions = {
    init: actionCreator("OrdersAutoList/init")
}

// *** Reducer
import { isType, IAction } from "modules/redux";

interface IState {
    orders?: ApiModels.OrderAuto[]
    searchCount?: number
    searchPage?: number
    searchLimit?: number
}
const InitialState: IState = {
    orders: [],
    searchLimit: 10,
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {

    if (isType(action, Actions.init)) return InitialState;

    if (isType(action, ApiActions.orders.SearchOrdersAutoSuccess) &&
        action.payload.request.request_id == Constants.search) {
        return {
            ...state,
            orders: action.payload.response.ordersAuto,
            searchCount: action.payload.response.count,
            searchPage: action.payload.response.page
        };
    }

    return state;
}

// ** Load Reducer
import { injectAsyncReducer } from "modules/redux";
export interface IOrdersAutoListReducer {
    OrdersAutoList: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "OrdersAutoList", Reducer);
}
