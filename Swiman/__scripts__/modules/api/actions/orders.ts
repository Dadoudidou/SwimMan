import { actionCreator } from "modules/redux";
import { IFetchResponse, IFetchRequest, fetchActionAsyncCreator } from "./../utils";
import * as Models from "./../models";

let _apiGlobalName = "api/orders/";

interface ISearch {
    criteria: {
        season_id: number
    }
    limit?: number
    page?: number
}
interface ISearchResult {
    orders: Models.Order[]
    count: number
    page: number
}
let _apiSearch = _apiGlobalName + "Search/";
export const SearchRequest = actionCreator<IFetchRequest<ISearch>>(_apiSearch);
export const SearchSuccess = actionCreator<IFetchResponse<ISearch, ISearchResult>>(_apiSearch + "success");
export const SearchFailed = actionCreator<IFetchResponse<ISearch, any>>(_apiSearch + "error");
export const Search = fetchActionAsyncCreator<ISearch, ISearchResult>({
    name: _apiSearch,
    uri: window.baseUrl + _apiSearch,
    request: SearchRequest,
    response: SearchSuccess,
    error: SearchFailed
});


interface IUpdateOrder {
    order: Models.Order
}
let _apiUpdateOrder = _apiGlobalName + "UpdateOrder/";
export const UpdateOrderRequest = actionCreator<IFetchRequest<IUpdateOrder>>(_apiUpdateOrder);
export const UpdateOrderSuccess = actionCreator<IFetchResponse<IUpdateOrder, Models.Order>>(_apiUpdateOrder + "success");
export const UpdateOrderFailed = actionCreator<IFetchResponse<IUpdateOrder, any>>(_apiUpdateOrder + "error");
export const UpdateOrder = fetchActionAsyncCreator<IUpdateOrder, Models.Order>({
    name: _apiUpdateOrder,
    uri: window.baseUrl + _apiUpdateOrder,
    request: UpdateOrderRequest,
    response: UpdateOrderSuccess,
    error: UpdateOrderFailed
});