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

//#region PLACE

interface IAddPlace {
    place: Models.Place
}
let _apiAddPlace = _apiGlobalName + "AddPlace/";
export const AddPlaceRequest = actionCreator<IFetchRequest<IAddPlace>>(_apiAddPlace);
export const AddPlaceSuccess = actionCreator<IFetchResponse<IAddPlace, Models.Place>>(_apiAddPlace + "success");
export const AddPlaceFailed = actionCreator<IFetchResponse<IAddPlace, any>>(_apiAddPlace + "error");
export const AddPlace = fetchActionAsyncCreator<IAddPlace, Models.Place>({
    name: _apiAddPlace,
    uri: window.baseUrl + _apiAddPlace,
    request: AddPlaceRequest,
    response: AddPlaceSuccess,
    error: AddPlaceFailed
});

interface IUpdatePlace {
    place: Models.Place
}
let _apiUpdatePlace = _apiGlobalName + "UpdatePlace/";
export const UpdatePlaceRequest = actionCreator<IFetchRequest<IUpdatePlace>>(_apiUpdatePlace);
export const UpdatePlaceSuccess = actionCreator<IFetchResponse<IUpdatePlace, Models.Place>>(_apiUpdatePlace + "success");
export const UpdatePlaceFailed = actionCreator<IFetchResponse<IUpdatePlace, any>>(_apiUpdatePlace + "error");
export const UpdatePlace = fetchActionAsyncCreator<IUpdatePlace, Models.Place>({
    name: _apiUpdatePlace,
    uri: window.baseUrl + _apiUpdatePlace,
    request: UpdatePlaceRequest,
    response: UpdatePlaceSuccess,
    error: UpdatePlaceFailed
});

interface IDeletePlace {
    place: Models.Place
}
let _apiDeletePlace = _apiGlobalName + "DeletePlace/";
export const DeletePlaceRequest = actionCreator<IFetchRequest<IDeletePlace>>(_apiDeletePlace);
export const DeletePlaceSuccess = actionCreator<IFetchResponse<IDeletePlace, boolean>>(_apiDeletePlace + "success");
export const DeletePlaceFailed = actionCreator<IFetchResponse<IDeletePlace, any>>(_apiDeletePlace + "error");
export const DeletePlace = fetchActionAsyncCreator<IDeletePlace, boolean>({
    name: _apiDeletePlace,
    uri: window.baseUrl + _apiDeletePlace,
    request: DeletePlaceRequest,
    response: DeletePlaceSuccess,
    error: DeletePlaceFailed
});

interface IGetPlaceById {
    id: number
}
let _apiGetPlaceById = _apiGlobalName + "GetPlaceById/";
export const GetPlaceByIdRequest = actionCreator<IFetchRequest<IGetPlaceById>>(_apiGetPlaceById);
export const GetPlaceByIdSuccess = actionCreator<IFetchResponse<IGetPlaceById, Models.Place>>(_apiGetPlaceById + "success");
export const GetPlaceByIdFailed = actionCreator<IFetchResponse<IGetPlaceById, any>>(_apiGetPlaceById + "error");
export const GetPlaceById = fetchActionAsyncCreator<IGetPlaceById, Models.Place>({
    name: _apiGetPlaceById,
    uri: window.baseUrl + _apiGetPlaceById,
    request: GetPlaceByIdRequest,
    response: GetPlaceByIdSuccess,
    error: GetPlaceByIdFailed
});

interface IGetPlaces {
}
let _apiGetPlaces = _apiGlobalName + "GetPlaces/";
export const GetPlacesRequest = actionCreator<IFetchRequest<IGetPlaces>>(_apiGetPlaces);
export const GetPlacesSuccess = actionCreator<IFetchResponse<IGetPlaces, Models.Place[]>>(_apiGetPlaces + "success");
export const GetPlacesFailed = actionCreator<IFetchResponse<IGetPlaces, any>>(_apiGetPlaces + "error");
export const GetPlaces = fetchActionAsyncCreator<IGetPlaces, Models.Place[]>({
    name: _apiGetPlaces,
    uri: window.baseUrl + _apiGetPlaces,
    request: GetPlacesRequest,
    response: GetPlacesSuccess,
    error: GetPlacesFailed
});

//#endregion