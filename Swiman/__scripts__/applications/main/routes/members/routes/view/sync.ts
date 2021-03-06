﻿// *** Constants
export const Constants = {
    view_member: "routes/members/view/view_member",
    search_adhesions: "routes/members/view/search_adhesions"
}

// *** Actions
import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";

export const Actions = {
    init: actionCreator("MembersView/init"),
    initAdhesions: actionCreator("MembersView/initAdhesions")
}

// *** Reducer
import { isType, IAction } from "modules/redux";

interface IState {
    member?: ApiModels.Member

    adhesions?: ApiModels.Adhesion[]
}
const InitialState: IState = {
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {

    if (isType(action, Actions.init)) return InitialState;
    if (isType(action, Actions.initAdhesions)) return { ...state, adhesions: [] }

    if (isType(action, ApiActions.members.GetMemberByIdSuccess) &&
        action.payload.request.request_id == Constants.view_member) {
        return {
            ...state,
            member: action.payload.response
        }
    }

    if (isType(action, ApiActions.members.SearchAdhesionsSuccess) &&
        action.payload.request.request_id == Constants.search_adhesions) {
        return {
            ...state,
            adhesions: action.payload.response.adhesions
        }
    }

    return state;
}

// ** Load Reducer
import { injectAsyncReducer } from "modules/redux";
export interface IMembersViewReducer {
    MembersView: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "MembersView", Reducer);
}
