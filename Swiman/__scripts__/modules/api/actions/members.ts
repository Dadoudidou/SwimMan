import { actionCreator } from "modules/redux";
import { IFetchResponse, IFetchRequest, fetchActionAsyncCreator } from "./../utils";
import * as Models from "./../models";

let _apiGlobalName = "api/members/";


interface IAddMember {
    member: Models.Member
}
let _apiAddMember = _apiGlobalName + "AddMember/";
export const AddMemberRequest = actionCreator<IFetchRequest<IAddMember>>(_apiAddMember);
export const AddMemberSuccess = actionCreator<IFetchResponse<IAddMember, Models.Member>>(_apiAddMember + "success");
export const AddMemberFailed = actionCreator<IFetchResponse<IAddMember, any>>(_apiAddMember + "error");
export const AddMember = fetchActionAsyncCreator<IAddMember, Models.Member>({
    name: _apiAddMember,
    uri: window.baseUrl + _apiAddMember,
    request: AddMemberRequest,
    response: AddMemberSuccess,
    error: AddMemberFailed
});


interface IUpdateMember {
    member: Models.Member
}
let _apiUpdateMember = _apiGlobalName + "UpdateMember/";
export const UpdateMemberRequest = actionCreator<IFetchRequest<IUpdateMember>>(_apiUpdateMember);
export const UpdateMemberSuccess = actionCreator<IFetchResponse<IUpdateMember, Models.Member>>(_apiUpdateMember + "success");
export const UpdateMemberFailed = actionCreator<IFetchResponse<IUpdateMember, any>>(_apiUpdateMember + "error");
export const UpdateMember = fetchActionAsyncCreator<IUpdateMember, Models.Member>({
    name: _apiUpdateMember,
    uri: window.baseUrl + _apiUpdateMember,
    request: UpdateMemberRequest,
    response: UpdateMemberSuccess,
    error: UpdateMemberFailed
});


interface ISearch {
    criteria: {
        last_name?: string
        first_name?: string
        city?: string
        licence?: string
    }
    limit?: number
    page?: number
}
interface ISearchResult {
    members: Models.Member[]
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

interface IGetMemberById {
    id: number
}
let _apiGetMemberById = _apiGlobalName + "GetMemberById/";
export const GetMemberByIdRequest = actionCreator<IFetchRequest<IGetMemberById>>(_apiGetMemberById);
export const GetMemberByIdSuccess = actionCreator<IFetchResponse<IGetMemberById, Models.Member>>(_apiGetMemberById + "success");
export const GetMemberByIdFailed = actionCreator<IFetchResponse<IGetMemberById, any>>(_apiGetMemberById + "error");
export const GetMemberById = fetchActionAsyncCreator<IGetMemberById, Models.Member>({
    name: _apiGetMemberById,
    uri: window.baseUrl + _apiGetMemberById,
    request: GetMemberByIdRequest,
    response: GetMemberByIdSuccess,
    error: GetMemberByIdFailed
});