
import { IAction } from "modules/redux-actions"
import { IActionCreatorSettings, IRequest } from "./index"


export interface IMakeFetchMiddleware {
    acton_type: string
    fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
    fetchOptions?: RequestInit
}

export const makeFetchMiddleware = (options: IMakeFetchMiddleware) => {
    return store => next => action => {


        //filtre des actions
        if(!action || !action.type || action.type != options.acton_type){
            return next(action);
        }

        let _action = action as IAction<IRequest<any>>;
        let _metas = _action.metas as IActionCreatorSettings<any, any>;

        // -- execution de l'action
        next(_action);

        // -- requete
        return options.fetch(_metas.uri, {
            ...options.fetchOptions,
            ..._metas.fetchOptions,
            body: JSON.stringify(_action.payload.request)
        }).then(response => {
            //conversion json de la réponse
            return response.json();
        }).then(data => {
            //dispatch l'information
            store.dispatch(_metas.response({request: _action.payload, response: data}));
            return data;
        }).catch(err => {
            //dispatch l'information
            store.dispatch(_metas.error({ request: _action.payload, response: err }));
            return err;
        });
    }
}
