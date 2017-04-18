import * as modRedux from "modules/redux";
import { isType, immutable } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./constants";

interface ILoginState {
    loginError?: boolean
}

const initial: ILoginState = {
    loginError: false
};

const reducer = (state: ILoginState = initial, action: modRedux.IAction<any>): ILoginState => {

    if (isType(action, ApiActions.users.LoginRequest) &&
        action.payload.request_id == Constants.login) {
        return {
            ...state,
            loginError:false
        }
    }

    if (isType(action, ApiActions.users.LoginSuccess) &&
        action.payload.request.request_id == Constants.login) {
        return {
            ...state,
            loginError: false
        }
    }

    if (isType(action, ApiActions.users.LoginFailed) &&
        action.payload.request.request_id == Constants.login) {
        return {
            ...state,
            loginError: true
        }
    }


    return state;
}



import { injectAsyncReducer } from "modules/redux";
export interface ILogin_Reducer {
    route_Login: ILoginState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "route_Login", reducer);
}