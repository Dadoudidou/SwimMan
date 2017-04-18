import * as assign from "object-assign";

export interface IAction<T> {
    type: string,
    payload: T,
    metas?: { [key: string]: any }
    onNext?: (dispatch: Function, payload: T) => void
}


interface IActionParams {
    delay?: number
}

export interface IActionCreator<T> {
    type: string,
    (payload?: T): IAction<T>
}

export interface IActionAsyncCreator<T> {
    type: string,
    (payload?: T): (dispatch) => void
}



export const actionCreator = <T>(type: string, settings?: IActionParams): IActionCreator<T> => {

    let _function = (payload?: T): IAction<T> => {
        let _retour = {
            type: type,
            payload: payload,
            metas: {}
        }
        if (settings) {
            if (settings.delay != undefined) _retour.metas["delay"] = settings.delay;
        }
        return _retour;
    };

    return assign(
        _function,
        { type }
    )
}




export const actionAsyncCreator = <T>(type: string, action: (dispatch: Function, event: T) => any): IActionAsyncCreator<T> => {

    let _function = (payload?: T): ((dispatch) => void) => {
        /*let _retour = {
            type: type,
            payload: payload
        }*/

        return (dispatch) => {
            return action(dispatch, payload);
        };
    };

    return assign(
        _function,
        { type }
    );
}

export const isType = <T>(action: IAction<any>, actionCreator: IActionCreator<T>):
    action is IAction<T> => action.type === actionCreator.type 