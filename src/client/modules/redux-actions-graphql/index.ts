import { 
    IAction as IBaseAction,
    actionAsyncCreator, 
    actionCreator, 
    IActionCreator, 
    IActionCreatorSettings as IBaseActionCreatorSettings } from "modules/redux-actions"
    
/**
 * Interface de la requete
 * request_id : permet d'identifier une requete
 * request : input de la requete
 * response : output de la requete
 */
export interface IRequest<T_INPUT, T_OUTPUT>
{
    request_id: string,
    request: T_INPUT,
    response: T_OUTPUT
}

/**
 * Retour de la requete
 */
export interface IResponse<T_INPUT, T_OUTPUT, T_RESPONSE>
{
    request: IRequest<T_INPUT, T_OUTPUT>,
    response: T_RESPONSE
}

/**
 * Paramètres d'entrés de la fonction principale
 */
export interface IOptions<T_INPUT, T_OUTPUT, T_RESPONSE>
{
    name: string
    query: (args: IRequest<T_INPUT, T_OUTPUT>) => string
    response: IActionCreator<IResponse<T_INPUT, T_OUTPUT, T_RESPONSE>>
    error: IActionCreator<IResponse<T_INPUT,T_OUTPUT, any>>
}

/**
 * Interface de retour de la fonction principale
 */
export interface IActionCreatorSettings<T_INPUT, T_OUTPUT, T_RESPONSE> extends IBaseActionCreatorSettings {
    query: (args: IRequest<T_INPUT, T_OUTPUT>) => string
    response: IActionCreator<IResponse<T_INPUT, T_OUTPUT, T_RESPONSE>>
    error: IActionCreator<IResponse<T_INPUT,T_OUTPUT, any>>
}

export interface IGraphQlAction<T_INPUT, T_OUTPUT, T_RESPONSE> extends IBaseAction<IRequest<T_INPUT, Partial<T_OUTPUT>>> {
    metas: IActionCreatorSettings<T_INPUT, T_OUTPUT, T_RESPONSE>
}

/**
 * fonction permettant la création d'une fonction pour la création d'une requête
 * @param action_type type de l'action : api, ...
 */
export const makeGraphqlRequestCreator = (action_type: string) => {
    return <T_INPUT, T_OUTPUT, T_RESPONSE>(options: IOptions<T_INPUT,T_OUTPUT, T_RESPONSE>) => {
        return actionCreator<IRequest<T_INPUT, Partial<T_OUTPUT>>>(options.name, action_type, {  
            query: options.query,
            response: options.response,
            error: options.error
        } as IActionCreatorSettings<T_INPUT, T_OUTPUT, T_RESPONSE>);
    }
}

export { IMakeGraphQlMiddleware, makeGraphQlMiddleware } from "./middleware"
export { makeCombineGraphqlAction } from "./combine"


