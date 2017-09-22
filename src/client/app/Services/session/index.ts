import { getStore } from "app/store"
import { IStore } from "modules/redux-store-manager"
import * as Actions from "./action"
import { ISessionState, reducer } from "./reducer"

//injection dans le store
export interface ISessionReducer {
    "session": ISessionState
}
getStore().injectAsyncReducer("session", reducer);



let _timeout_session = undefined;

// Vide la session
export const clearSession = () => {
    clearTimeout(_timeout_session);
    getStore().dispatch(Actions.clear());
}

// Enregitre une valeur dans la session
export const set = (key: string, value: any) => {
    getStore().dispatch(Actions.set({ 
        key: key, 
        value: value 
    }));
}

// Récupère une valeur dans la session
export const get = (key: string, defaultValue?: any): any => {
    let _value = (getStore().getState() as ISessionReducer).session[key];
    if(_value == undefined) return defaultValue;
    return _value;
}
