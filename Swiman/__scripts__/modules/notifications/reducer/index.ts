import * as modRedux from "modules/redux";
import * as Models from "./../models";
import * as Actions from "./../actions";

export interface IModNotifs_State {
    notifications?: Models.Notification[]
}

export const InitialState: IModNotifs_State = {
    notifications: []
}

export const Reducer = (state: IModNotifs_State = InitialState, action: modRedux.IAction<any>): IModNotifs_State => {

    if (modRedux.isType(action, Actions.Send)) {
        return modRedux.immutable.Object.update(state, {
            notifications: modRedux.immutable.Array.insert(
                state.notifications,
                action.payload)
        } as IModNotifs_State);
    }

    if (modRedux.isType(action, Actions.Dismiss)) {
        return modRedux.immutable.Object.update(state, {
            notifications: modRedux.immutable.Array.remove(
                state.notifications,
                (item) => item.id == action.payload)
        } as IModNotifs_State);
    }

    if (modRedux.isType(action, Actions.Clear)) {
        return modRedux.immutable.Object.update(state, {
            notifications: []
        } as IModNotifs_State);
    }

    return state;
}



//--------------------------
export interface IModNotifs_Reducer {
    mod_notifications: IModNotifs_State
}
export const loadReducer = (store) => {
    modRedux.injectAsyncReducer(store, "mod_notifications", Reducer);
}