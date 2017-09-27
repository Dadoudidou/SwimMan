import { IAction, isType } from "modules/redux-actions"
import { ApiActions } from "app/Services/api"
import { FetchError } from "app/Services/fetch"

export const actions = {

}

interface IState {
    loading?: boolean
    connected?: boolean
    errorMessage?: string
}

const initialState: IState = { }

const reducer = (state: IState = initialState, action: IAction<any>): IState => {


    if(isType(action, ApiActions.Users.Login)){
        return {
            ...state,
            errorMessage: undefined,
            loading: true
        }
    }

    if(isType(action, ApiActions.Users.LoginSuccess)){
        return {
            ...state,
            connected: true,
            errorMessage: undefined,
            loading: false
        }
    }

    if(isType(action, ApiActions.Users.LoginFailed)){
        return {
            ...state,
            connected: false,
            loading: false,
            errorMessage: (FetchError.is(action.payload.response)) ? 
                (action.payload.response as FetchError).message :
                (action.payload.response as Error).message
        }
    }


    return state;
}

import { getStore } from "app/store"
export interface IUsersLogin {
    "route_users_login" : IState
}
getStore().injectAsyncReducer("route_users_login", reducer);