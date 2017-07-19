// *** Constants
export const Constants = {
    searchPlace: "routes/sessions/calendar/searchPlace",
    searchSessions: "routes/sessions/calendar/searchSessions",
    updateSession: "routes/sessions/calendar/updateSession",
    searchActivities: "routes/sessions/calendar/searchActivities",
}

// *** Actions
import { actionCreator } from "modules/redux";
import * as ApiModels from "modules/api/models";
import * as ApiActions from "modules/api/actions";

export const Actions = {
    init: actionCreator("SessionsCalendar/init"),
    selectPlace: actionCreator<ApiModels.Place>("SessionsCalendar/selectPlace"),
    selectSection: actionCreator<ApiModels.Section>("SessionsCalendar/selectSection")
}

// *** Reducer
import { isType, IAction } from "modules/redux";

interface IState {
    places?: ApiModels.Place[]
    place_selected?: ApiModels.Place

    sections?: ApiModels.CategoryTree[]
    sectionSelected?: ApiModels.Section

    sessions?: ApiModels.Session[]
}
const InitialState: IState = {
    sessions: []
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {

    if (isType(action, Actions.init)) return InitialState;

    //get sessions
    if (isType(action, ApiActions.activities.GetSessionsSuccess) &&
        action.payload.request.request_id == Constants.searchSessions) {
        return {
            ...state,
            sessions: action.payload.response
        }
    }

    //update session
    if (isType(action, ApiActions.activities.UpdateSessionSuccess) &&
        action.payload.request.request_id == Constants.updateSession) {
        if (action.payload.request.Request.session.id == 0) {
            return {
                ...state,
                sessions: [...state.sessions, action.payload.response]
            };
        } else {
            return {
                ...state,
                sessions: state.sessions.map(x => {
                    if (x.id == action.payload.request.Request.session.id)
                        return action.payload.response;
                    return x;
                })
            };
        }
    }


    //place
    if (isType(action, ApiActions.activities.GetPlacesSuccess) &&
        action.payload.request.request_id == Constants.searchPlace) {
        return {
            ...state,
            places: action.payload.response,
            place_selected: (action.payload.response.length > 0) ? action.payload.response[0] : undefined
        }
    }

    //select place
    if (isType(action, Actions.selectPlace)) {
        return {
            ...state,
            place_selected: action.payload
        }
    }

    //get sections
    if (isType(action, ApiActions.activities.GetTreeSuccess) &&
        action.payload.request.request_id == Constants.searchActivities) {
        return {
            ...state,
            sections: action.payload.response
        }
    }

    //select section
    if (isType(action, Actions.selectSection)) {
        return {
            ...state,
            sectionSelected: action.payload
        }
    }

    return state;
}

// ** Load Reducer
import { injectAsyncReducer } from "modules/redux";
export interface ISessionsCalendarReducer {
    SessionsCalendar: IState
}
export const loadReducer = (store) => {
    injectAsyncReducer(store, "SessionsCalendar", Reducer);
}
