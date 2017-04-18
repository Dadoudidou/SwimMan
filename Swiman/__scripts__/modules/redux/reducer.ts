import { combineReducers } from "redux";
import { IAction } from "./actions";
import * as assign from "object-assign";
import { routerReducer } from "react-router-redux";

// **********************
// LastAction Reducer
// **********************
const LastActionReducer = (state = null, action: IAction<any>): IAction<any> => {
    return action;
}
export interface ILastActionState {
    lastAction: IAction<any>
}

// **********************
// Root Reducer
// **********************
export interface IState extends ILastActionState { }

export const makeRootReducer = (asyncReducers?) => {
    return combineReducers(assign({
        lastAction: LastActionReducer,
        routing: routerReducer
    }, asyncReducers));
};