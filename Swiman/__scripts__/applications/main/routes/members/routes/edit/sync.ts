// *** Constants
export const Constants = {
    view_member: "routes/members/edit/view_member",
    edit_member: "routes/members/edit/edit_member"
}

// *** Actions
import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";

export const Actions = {
    init: actionCreator("MembersEdit/init"),
}

// *** Reducer
import { isType, IAction } from "modules/redux";

interface IState {
    member?: ApiModels.Member
}
const InitialState: IState = {
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {

    if (isType(action, Actions.init)) return InitialState;

    if (isType(action, ApiActions.members.GetMemberByIdSuccess) &&
        action.payload.request.request_id == Constants.view_member) {
        return {
            ...state,
            member: action.payload.response
        }
    }

    return state;
}

// ** Load Reducer
import { injectAsyncReducer } from "modules/redux";
export interface IMembersEditReducer {
    MembersEdit: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "MembersEdit", Reducer);
}
