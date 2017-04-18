import { actionCreator } from "modules/redux";
import { IFetchResponse, IFetchRequest, fetchActionAsyncCreator } from "./../utils";
import * as Models from "./../models";

let _apiGlobalName = "api/activities/";


interface IGetCategories {

}
let _apiGetCategories = _apiGlobalName + "GetCategories/";
export const GetCategoriesRequest = actionCreator<IFetchRequest<IGetCategories>>(_apiGetCategories);
export const GetCategoriesSuccess = actionCreator<IFetchResponse<IGetCategories, Models.Category[]>>(_apiGetCategories + "success");
export const GetCategoriesFailed = actionCreator<IFetchResponse<IGetCategories, any>>(_apiGetCategories + "error");
export const GetCategories = fetchActionAsyncCreator<IGetCategories, Models.Category[]>({
    name: _apiGetCategories,
    uri: window.baseUrl + _apiGetCategories,
    request: GetCategoriesRequest,
    response: GetCategoriesSuccess,
    error: GetCategoriesFailed
});

interface IGetActivities {
    category: Models.Category
}
let _apiGetActivities = _apiGlobalName + "GetActivities/";
export const GetActivitiesRequest = actionCreator<IFetchRequest<IGetActivities>>(_apiGetActivities);
export const GetActivitiesSuccess = actionCreator<IFetchResponse<IGetActivities, Models.Activity[]>>(_apiGetActivities + "success");
export const GetActivitiesFailed = actionCreator<IFetchResponse<IGetActivities, any>>(_apiGetActivities + "error");
export const GetActivities = fetchActionAsyncCreator<IGetActivities, Models.Activity[]>({
    name: _apiGetActivities,
    uri: window.baseUrl + _apiGetActivities,
    request: GetActivitiesRequest,
    response: GetActivitiesSuccess,
    error: GetActivitiesFailed
});

interface IGetSections {
    activity: Models.Activity
}
let _apiGetSections = _apiGlobalName + "GetSections/";
export const GetSectionsRequest = actionCreator<IFetchRequest<IGetSections>>(_apiGetSections);
export const GetSectionsSuccess = actionCreator<IFetchResponse<IGetSections, Models.Section[]>>(_apiGetSections + "success");
export const GetSectionsFailed = actionCreator<IFetchResponse<IGetSections, any>>(_apiGetSections + "error");
export const GetSections = fetchActionAsyncCreator<IGetSections, Models.Section[]>({
    name: _apiGetSections,
    uri: window.baseUrl + _apiGetSections,
    request: GetSectionsRequest,
    response: GetSectionsSuccess,
    error: GetSectionsFailed
});