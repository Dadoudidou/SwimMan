import * as modRedux from "modules/redux";
import { isType, immutable } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../constants";

interface IMembersState {
    members?: ApiModels.Member[]
    memberSelected?: ApiModels.Member
}

const initial: IMembersState = {
    members:[]
};

const reducer = (state: IMembersState = initial, action: modRedux.IAction<any>): IMembersState => {

    if (isType(action, ApiActions.members.SearchSuccess) &&
        action.payload.request.request_id == Constants.search_members) {
        return {
            ...state,
            members: action.payload.response
        };
    }

    if (isType(action, ApiActions.members.GetMemberByIdSuccess) &&
        action.payload.request.request_id == Constants.view_member) {
        return {
            ...state,
            memberSelected: action.payload.response
        }
    }

    if (isType(action, ApiActions.members.UpdateMemberRequest) &&
        action.payload.request_id == Constants.edit_member) {
        return {
            ...state,
            members: immutable.Array.update(
                state.members,
                (x) => x.id == action.payload.Request.member.id,
                (x, index) => action.payload.Request.member
            ),
            memberSelected: (state.memberSelected && state.memberSelected.id == action.payload.Request.member.id) ?
                action.payload.Request.member : state.memberSelected
        }
    }

    if (isType(action, ApiActions.members.UpdateMemberSuccess) &&
        action.payload.request.request_id == Constants.edit_member) {
        return {
            ...state,
            members: immutable.Array.update(
                state.members,
                (x) => x.id == action.payload.request.Request.member.id,
                (x, index) => action.payload.response
            ),
            memberSelected: (state.memberSelected && state.memberSelected.id == action.payload.request.Request.member.id) ?
                action.payload.response : state.memberSelected
        }
    }


    return state;
}



import { injectAsyncReducer } from "modules/redux";
export interface IMembers_Reducer {
    route_Members: IMembersState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "route_Members", reducer);
}