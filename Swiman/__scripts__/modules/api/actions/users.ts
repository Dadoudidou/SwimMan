import { actionCreator } from "modules/redux";
import { IFetchResponse, IFetchRequest, fetchActionAsyncCreator } from "./../utils";
import * as Models from "./../models";

let _apiGlobalName = "api/users/";


interface ILogin {
    username: string
    password: string
}
let _apiLogin = _apiGlobalName + "Login/";
export const LoginRequest = actionCreator<IFetchRequest<ILogin>>(_apiLogin);
export const LoginSuccess = actionCreator<IFetchResponse<ILogin, Models.User>>(_apiLogin + "success");
export const LoginFailed = actionCreator<IFetchResponse<ILogin, any>>(_apiLogin + "error");
export const Login = fetchActionAsyncCreator<ILogin, Models.User>({
    name: _apiLogin,
    uri: window.baseUrl + _apiLogin,
    request: LoginRequest,
    response: LoginSuccess,
    error: LoginFailed
});