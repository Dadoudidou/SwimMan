import { actionAsyncCreator, actionCreator } from "modules/redux-actions"
import { IRequest, IResponse } from "modules/redux-actions-fetch"
import { fetchRequestCreator } from "./../makeRequest"

let _apiGlobalName = "api/users/";

interface ILoginInput {
    user: string
    password: string
}
let _apiLogin = _apiGlobalName + "Login";
export const LoginSuccess = actionCreator<IResponse<ILoginInput, any>>(_apiLogin + "success");
export const LoginFailed = actionCreator<IResponse<ILoginInput, any>>(_apiLogin + "error");
export const Login = fetchRequestCreator({
    response: LoginSuccess,
    error: LoginFailed,
    name: _apiLogin,
    uri: "/auth"
});