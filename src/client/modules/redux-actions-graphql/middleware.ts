
import { IAction } from "modules/redux-actions"
import { IActionCreatorSettings, IRequest } from "./index"
import { ICombineActionCreatorSettings } from "./combine"

export interface IMakeGraphQlMiddleware {
    acton_type: string
    fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
    fetchOptions?: RequestInit
    uri: string
}

export const makeGraphQlMiddleware = (options: IMakeGraphQlMiddleware) => {
    return store => next => action => {


        //filtre des actions
        if(!action || !action.type || action.type != options.acton_type){
            return next(action);
        }

        let _action = action as IAction<IRequest<any, any>>;
        let _metas = _action.metas as IActionCreatorSettings<any, any, any>;

        // -- execution de l'action
        next(_action);

        // -- requete
        return options.fetch(options.uri, {
            ...options.fetchOptions,
            body: JSON.stringify({
                query: _metas.query(_action.payload)
            })
        }).then(response => {
            //conversion json de la réponse
            return response.json();
        }).then(data => {
            //traitement des données reçues
            if(!data) throw new Error("no value returns");
            if(data.errors) throw data.errors;
            return data.data;
        }).then(data => {
            if(!data) throw new Error("no value returns");
            return data;
        }).then(data => {
            if(_action.action_id == "___combine___"){
                let __metas = _action.metas as ICombineActionCreatorSettings;
                __metas.requests.forEach(request => {
                    store.dispatch(request.actionCreator.metas.response({ request: _action.payload, response: data }));
                })
            } else {
                //dispatch l'information
                store.dispatch(_metas.response({request: _action.payload, response: data}));
            }
            return data;
        }).catch(err => {
            if(_action.action_id == "___combine___"){
                let __metas = _action.metas as ICombineActionCreatorSettings;
                __metas.requests.forEach(request => {
                    store.dispatch(request.actionCreator.metas.error({ request: _action.payload, response: err }));
                })
            } else {
                //dispatch l'information
                store.dispatch(_metas.error({ request: _action.payload, response: err }));
            }
            return err;
        });
    }
}
