import { actionCreator } from "modules/redux";
import { IFetchResponse, IFetchRequest, fetchActionAsyncCreator } from "./../utils";
import * as Models from "./../models";

let _apiGlobalName = "api/seasons/";


interface IGets {
    start?: Date
    end?: Date
}
let _apiGets = _apiGlobalName + "Gets/";
export const GetsRequest = actionCreator<IFetchRequest<IGets>>(_apiGets);
export const GetsSuccess = actionCreator<IFetchResponse<IGets, Models.Season[]>>(_apiGets + "success");
export const GetsFailed = actionCreator<IFetchResponse<IGets, any>>(_apiGets + "error");
export const Gets = fetchActionAsyncCreator<IGets, Models.Season[]>({
    name: _apiGets,
    uri: window.baseUrl + _apiGets,
    request: GetsRequest,
    response: GetsSuccess,
    error: GetsFailed
});

interface IAdd {
    season: Models.Season
}
let _apiAdd = _apiGlobalName + "Add/";
export const AddRequest = actionCreator<IFetchRequest<IAdd>>(_apiAdd);
export const AddSuccess = actionCreator<IFetchResponse<IAdd, Models.Season>>(_apiAdd + "success");
export const AddFailed = actionCreator<IFetchResponse<IAdd, any>>(_apiAdd + "error");
export const Add = fetchActionAsyncCreator<IAdd, Models.Season>({
    name: _apiAdd,
    uri: window.baseUrl + _apiAdd,
    request: AddRequest,
    response: AddSuccess,
    error: AddFailed
});

interface IUpdate {
    season: Models.Season
}
let _apiUpdate = _apiGlobalName + "Update/";
export const UpdateRequest = actionCreator<IFetchRequest<IUpdate>>(_apiUpdate);
export const UpdateSuccess = actionCreator<IFetchResponse<IUpdate, Models.Season>>(_apiUpdate + "success");
export const UpdateFailed = actionCreator<IFetchResponse<IUpdate, any>>(_apiUpdate + "error");
export const Update = fetchActionAsyncCreator<IUpdate, Models.Season>({
    name: _apiUpdate,
    uri: window.baseUrl + _apiUpdate,
    request: UpdateRequest,
    response: UpdateSuccess,
    error: UpdateFailed
});




