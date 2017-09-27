import { 
    actionAsyncCreator, 
    actionCreator, 
    IActionCreator, 
    IActionCreatorSettings as IBaseActionCreatorSettings } from "modules/redux-actions"
    
/**
 * Interface de la requete
 * request_id : permet d'identifier une requete
 * request : input de la requete
 */
export interface IRequest<T_INPUT>
{
    request_id: string,
    request: T_INPUT
}

/**
 * Retour de la requete
 */
export interface IResponse<T_INPUT, T_RESPONSE>
{
    request: IRequest<T_INPUT>,
    response: T_RESPONSE
}

/**
 * Paramètres d'entrés de la fonction principale
 */
export interface IOptions<T_INPUT, T_RESPONSE>
{
    name: string
    uri: string
    response: IActionCreator<IResponse<T_INPUT, T_RESPONSE>>
    error: IActionCreator<IResponse<T_INPUT, any>>
    fetchOptions?: RequestInit
}

/**
 * Interface de retour de la fonction principale
 */
export interface IActionCreatorSettings<T_INPUT, T_RESPONSE> extends IBaseActionCreatorSettings {
    uri: string
    response: IActionCreator<IResponse<T_INPUT, T_RESPONSE>>
    error: IActionCreator<IResponse<T_INPUT, any>>
    fetchOptions?: RequestInit
}

/**
 * fonction permettant la création d'une fonction pour la création d'une requête
 * @param action_type type de l'action : api, ...
 */
export const makeFetchRequestCreator = (action_type: string) => {
    return <T_INPUT, T_RESPONSE>(options: IOptions<T_INPUT, T_RESPONSE>) => {
        return actionCreator<IRequest<T_INPUT>>(options.name, action_type, {  
            uri: options.uri,
            response: options.response,
            error: options.error,
            fetchOptions: options.fetchOptions
        } as IActionCreatorSettings<T_INPUT, T_RESPONSE>);
    }
}

export { IMakeFetchMiddleware, makeFetchMiddleware } from "./middleware"


