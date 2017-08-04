// *** Constants
export const Constants = {
    search_adhesions: "routes/inscriptionexpress/stepadhesions/search_adhesions"
}

// *** Actions
import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";

export const Actions = {
    init: actionCreator("InscriptionExpress/init"),
    setMember: actionCreator<ApiModels.Member>("InscriptionExpress/setMember"),
    initAdhesions: actionCreator("InscriptionExpress/initAdhesions"),
    setAdhesion: actionCreator<ApiModels.Adhesion>("InscriptionExpress/setAdhesion"),
    removeAdhesion: actionCreator<ApiModels.Adhesion>("InscriptionExpress/removeAdhesion"),
}

// *** Reducer
import { isType, IAction } from "modules/redux";

interface IState {
    member?: ApiModels.Member
    adhesions?: ApiModels.Adhesion[]
    searching_adhesions?: boolean
}
const InitialState: IState = {
    member: undefined,
    adhesions: [],
    searching_adhesions: false
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {

    //init
    if (isType(action, Actions.init)) return InitialState;

    //set member
    if (isType(action, Actions.setMember))
        return {
            ...state,
            member: action.payload
        }

    //init adhesions
    if (isType(action, Actions.initAdhesions)) return { ...state, adhesions: [] }

    //search adhesions
    if (isType(action, ApiActions.members.SearchAdhesionsRequest) &&
        action.payload.request_id == Constants.search_adhesions) {
        return { ...state, searching_adhesions: true }
    }
    if (isType(action, ApiActions.members.SearchAdhesionsSuccess) &&
        action.payload.request.request_id == Constants.search_adhesions) {
        return {
            ...state,
            adhesions: [...state.adhesions, ...action.payload.response.adhesions],
            searching_adhesions: false
        }
    }

    //set adhesion - ajoute ou modifie une adhésion
    if (isType(action, Actions.setAdhesion)) {
        let _index = state.adhesions.map(x => x.id).indexOf(action.payload.id);
        if (_index > -1) {
            return {
                ...state,
                adhesions: state.adhesions.map(x => { if (x.id == action.payload.id) return action.payload; return x })
            }
        } else {
            return {
                ...state,
                adhesions: [...state.adhesions, action.payload]
            }
        }
    }

    //remove adhesion
    if (isType(action, Actions.removeAdhesion)) {
        return {
            ...state,
            adhesions: state.adhesions.filter(x => x.id != action.payload.id)
        }
    }

    return state;
}

// ** Load Reducer
import { injectAsyncReducer } from "modules/redux";
export interface IInscriptionExpressReducer {
    InscriptionExpress: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "InscriptionExpress", Reducer);
}
