// *** Constants
export const Constants = {
    search_members: "routes/members/list/search_members"
}

// *** Actions
import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";

export const Actions = {
    init: actionCreator("membersList/init"),
}

// *** Reducer
import { isType, IAction } from "modules/redux";

interface IState {
    members?: ApiModels.Member[]
    searchCount?: number
    searchPage?: number
    searchLimit?: number

}
const InitialState: IState = {
    members: [],
    searchLimit: 10
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {

    if (isType(action, Actions.init)) return InitialState;

    //search
    if (isType(action, ApiActions.members.SearchSuccess) &&
        action.payload.request.request_id == Constants.search_members) {
        return {
            ...state,
            members: action.payload.response.members,
            searchCount: action.payload.response.count,
            searchPage: action.payload.response.page
        };
    }

    return state;
}

// ** Load Reducer
import { injectAsyncReducer } from "modules/redux";
export interface IMembersListReducer {
    MembersList: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "MembersList", Reducer);
}
