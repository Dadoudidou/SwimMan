import { IAction, isType } from "modules/redux-actions"
import { ApiActions } from "app/Services/api"

const global = "route_users_groups"
export const constants = {
    onMount: global + "onMount"
}

export const actions = {

}

interface IState {
    loading?: boolean
    connected?: boolean
    errorMessage?: string
}

const initialState: IState = { }

const reducer = (state: IState = initialState, action: IAction<any>): IState => {

    if(isType(action, ApiActions.Users.GroupsSuccess)){
        
    }

    return state;
}

import { getStore } from "app/store"
export interface IUsersGroups {
    "route_users_groups" : IState
}
getStore().injectAsyncReducer("route_users_groups", reducer);