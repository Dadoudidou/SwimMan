import * as reqfetch from "isomorphic-fetch";
import { actionAsyncCreator, actionCreator, IActionCreator } from "modules/redux";

export interface IFetchRequest<T_REQUEST> {
    request_id: string,
    Request: T_REQUEST
}

export interface IFetchResponse<T_REQUEST, T_RESPONSE> {
    request: IFetchRequest<T_REQUEST>,
    response: T_RESPONSE
}

export const checkErrCode = (err: any) => {
    if (String(err.status) == "440") {
        document.location.reload();
    }
}

interface IFetchOptions<T_REQUEST, T_RESPONSE> {
    name: string
    uri: string
    request: IActionCreator<IFetchRequest<T_REQUEST>>
    response: IActionCreator<IFetchResponse<T_REQUEST, T_RESPONSE>>
    error: IActionCreator<IFetchResponse<T_REQUEST, any>>
}
export const fetchActionAsyncCreator = <T_REQUEST, T_RESPONSE>(options: IFetchOptions<T_REQUEST, T_RESPONSE>) => {
    return actionAsyncCreator<IFetchRequest<T_REQUEST>>(options.name, (dispatch, event) => {
        dispatch(options.request(event));
        return fetch(options.uri, {
            method: "post",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
            },
            body: JSON.stringify(event.Request)
        }).then((rep) => {
            if (!rep.ok)
                throw rep;
            return rep;
        }).then((rep) => {
            return rep.json().then(x => {
                dispatch(options.response({ request: event, response: x }))
                return x;
            });
        }).catch((err) => {
            checkErrCode(err);
            dispatch(options.error({ request: event, response: err }));
        });
    });
}