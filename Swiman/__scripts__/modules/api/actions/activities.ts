import { actionCreator } from "modules/redux";
import { IFetchResponse, IFetchRequest, fetchActionAsyncCreator } from "./../utils";
import * as Models from "./../models";

let _apiGlobalName = "api/activities/";


interface IGetCategories {
    season: Models.Season

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

interface IGetTree {
    season: Models.Season
}
let _apiGetTree = _apiGlobalName + "GetTree/";
export const GetTreeRequest = actionCreator<IFetchRequest<IGetTree>>(_apiGetTree);
export const GetTreeSuccess = actionCreator<IFetchResponse<IGetTree, Models.CategoryTree[]>>(_apiGetTree + "success");
export const GetTreeFailed = actionCreator<IFetchResponse<IGetTree, any>>(_apiGetTree + "error");
export const GetTree = fetchActionAsyncCreator<IGetTree, Models.CategoryTree[]>({
    name: _apiGetTree,
    uri: window.baseUrl + _apiGetTree,
    request: GetTreeRequest,
    response: GetTreeSuccess,
    error: GetTreeFailed
});

interface IUpdateCategory {
    category: Models.Category
}
let _apiUpdateCategory = _apiGlobalName + "UpdateCategory/";
export const UpdateCategoryRequest = actionCreator<IFetchRequest<IUpdateCategory>>(_apiUpdateCategory);
export const UpdateCategorySuccess = actionCreator<IFetchResponse<IUpdateCategory, Models.Category>>(_apiUpdateCategory + "success");
export const UpdateCategoryFailed = actionCreator<IFetchResponse<IUpdateCategory, any>>(_apiUpdateCategory + "error");
export const UpdateCategory = fetchActionAsyncCreator<IUpdateCategory, Models.Category>({
    name: _apiUpdateCategory,
    uri: window.baseUrl + _apiUpdateCategory,
    request: UpdateCategoryRequest,
    response: UpdateCategorySuccess,
    error: UpdateCategoryFailed
});

interface IUpdateActivity {
    activity: Models.Activity
}
let _apiUpdateActivity = _apiGlobalName + "UpdateActivity/";
export const UpdateActivityRequest = actionCreator<IFetchRequest<IUpdateActivity>>(_apiUpdateActivity);
export const UpdateActivitySuccess = actionCreator<IFetchResponse<IUpdateActivity, Models.Activity>>(_apiUpdateActivity + "success");
export const UpdateActivityFailed = actionCreator<IFetchResponse<IUpdateActivity, any>>(_apiUpdateActivity + "error");
export const UpdateActivity = fetchActionAsyncCreator<IUpdateActivity, Models.Activity>({
    name: _apiUpdateActivity,
    uri: window.baseUrl + _apiUpdateActivity,
    request: UpdateActivityRequest,
    response: UpdateActivitySuccess,
    error: UpdateActivityFailed
});

interface IUpdateSection {
    section: Models.Section
}
let _apiUpdateSection = _apiGlobalName + "UpdateSection/";
export const UpdateSectionRequest = actionCreator<IFetchRequest<IUpdateSection>>(_apiUpdateSection);
export const UpdateSectionSuccess = actionCreator<IFetchResponse<IUpdateSection, Models.Section>>(_apiUpdateSection + "success");
export const UpdateSectionFailed = actionCreator<IFetchResponse<IUpdateSection, any>>(_apiUpdateSection + "error");
export const UpdateSection = fetchActionAsyncCreator<IUpdateSection, Models.Section>({
    name: _apiUpdateSection,
    uri: window.baseUrl + _apiUpdateSection,
    request: UpdateSectionRequest,
    response: UpdateSectionSuccess,
    error: UpdateSectionFailed
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

//#region SESSION
interface IGetSessions {
    props: {
        section?: Models.Section
        place?: Models.Place
        season: Models.Season
    }
}
let _apiGetSessions = _apiGlobalName + "GetSessions/";
export const GetSessionsRequest = actionCreator<IFetchRequest<IGetSessions>>(_apiGetSessions);
export const GetSessionsSuccess = actionCreator<IFetchResponse<IGetSessions, Models.Session[]>>(_apiGetSessions + "success");
export const GetSessionsFailed = actionCreator<IFetchResponse<IGetSessions, any>>(_apiGetSessions + "error");
export const GetSessions = fetchActionAsyncCreator<IGetSessions, Models.Session[]>({
    name: _apiGetSessions,
    uri: window.baseUrl + _apiGetSessions,
    request: GetSessionsRequest,
    response: GetSessionsSuccess,
    error: GetSessionsFailed
});


interface IUpdateSession {
    session: Models.Session
}
let _apiUpdateSession = _apiGlobalName + "UpdateSession/";
export const UpdateSessionRequest = actionCreator<IFetchRequest<IUpdateSession>>(_apiUpdateSession);
export const UpdateSessionSuccess = actionCreator<IFetchResponse<IUpdateSession, Models.Session>>(_apiUpdateSession + "success");
export const UpdateSessionFailed = actionCreator<IFetchResponse<IUpdateSession, any>>(_apiUpdateSession + "error");
export const UpdateSession = fetchActionAsyncCreator<IUpdateSession, Models.Session>({
    name: _apiUpdateSession,
    uri: window.baseUrl + _apiUpdateSession,
    request: UpdateSessionRequest,
    response: UpdateSessionSuccess,
    error: UpdateSessionFailed
});

//#endregion