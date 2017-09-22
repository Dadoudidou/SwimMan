import * as Actions from "./action";
import { IAction, isType } from "modules/redux-actions"

export interface ISessionState {
    [key: string]: any
}

export const initialState: ISessionState = {

}

export const reducer = (state: ISessionState = initialState, action: IAction<any>): ISessionState => {

    if(isType(action, Actions.set)){
        return {
            ...state,
            [action.payload.key]: action.payload.value
        }
    }

    if(isType(action, Actions.clear)){
        return initialState;
    }

    return state;
}