// *** Constants
export const Constants = {
    view_adhesion: "routes/adhesions/add/view_adhesion"
}

// *** Actions
import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";

export const Actions = {
    init: actionCreator("AdhesionsAdd/init"),
}

// *** Reducer
import { isType, IAction } from "modules/redux";

interface IState {
    adhesion?: ApiModels.Adhesion
}
const InitialState: IState = {
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {

    if (isType(action, Actions.init)) return InitialState;

    if (isType(action, ApiActions.members.GetAdhesionByIdSuccess) &&
        action.payload.request.request_id == Constants.view_adhesion) {
        return {
            ...state,
            adhesion: action.payload.response
        }
    }


    return state;
}

// ** Load Reducer
import { injectAsyncReducer } from "modules/redux";
export interface IAdhesionsAddReducer {
    AdhesionsAdd: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "AdhesionsAdd", Reducer);
}
