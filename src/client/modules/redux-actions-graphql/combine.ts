import { IActionCreatorSettings, IGraphQlAction, IOptions, IRequest } from "./index"
import { actionCreator, IAction } from "modules/redux-actions"

interface ICombineAction {
    actionCreator: IGraphQlAction<any, any, any>,
    alias?: string
}

interface IGraphQlCombineAction<T_INPUT, T_OUTPUT, T_RESPONSE> extends IAction<IRequest<T_INPUT, Partial<T_OUTPUT>>> {
    metas: ICombineActionCreatorSettings
}

export interface ICombineActionCreatorSettings {
    query: (args) => string
    requests: ICombineAction[]
}

function sanitize(obj: string): string {
    if(!obj) return obj;
    return obj.replace(/\s+/g, " ");
}

function getQuery(obj: string): string {
    let _obj = sanitize(obj);
    let _objs = _obj.match(/^\s*query\s*{([\s|\S]*)}\s*$/);
    if(!_objs) return null;
    if(_objs.length == 1) return obj;
    return _objs[1];
}

function getMutation(obj: string): string {
    let _obj = sanitize(obj);
    let _objs = _obj.match(/^\s*mutation\s*{([\s|\S]*)}\s*$/);
    if(!_objs) return null;
    if(_objs.length == 1) return obj;
    return _objs[1];
}

function makeQuery(requestCreators: ICombineAction[] ): string {
    
    let queries: IQuery[] = [];
    // -- construction des requetes
    requestCreators.forEach(request => {
        let _req = request.actionCreator.metas.query(request.actionCreator.payload);
        let _query = getQuery(_req);
        let _mutation = getMutation(_req);
        queries.push({
            query: (_mutation) ? _mutation : (_query) ? _query : undefined,
            type: (_mutation) ? "mutation" : (_query) ? "query" : "none"
        });
    })

    // -- on prend le type de la première requete
    // -- construction de la requete finale
    let _finalQuery = queries[0].type + "{";
    for(let i=0; i<queries.length; i++){
        if(queries[0].type == queries[i].type){
            if(queries[i].query){
                _finalQuery += " " + queries[i].query;
            }
        }
    }
    _finalQuery += " }";

    return _finalQuery;
}

interface IQuery {
    query: string
    type: "query" | "mutation" | "none"
}

export const makeCombineGraphqlAction = (action_type: string) => {
    return <T_INPUT, T_OUTPUT, T_RESPONSE>(requestCreators: ICombineAction[]): IGraphQlCombineAction<T_INPUT, T_OUTPUT, T_RESPONSE> => {

        let _query = makeQuery(requestCreators);
        return {
            action_id: "___combine___",
            type: action_type,
            metas: {
                query: (args) => _query,
                requests: requestCreators
            },
            payload: {} as any
        }
    }
}
