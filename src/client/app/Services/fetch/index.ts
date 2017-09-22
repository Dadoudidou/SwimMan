require("es6-promise").polyfill();
require("isomorphic-fetch");
import * as deepExtend from "deep-extend"

/**
 * Wrap la fonction fetch avec des paramètres de bases
 */

// declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
export default (input: RequestInfo, init?: RequestInit): Promise<Response> => {

    let _options = deepExtend({}, init)

    return fetch(input, _options)
    .then((response:any) => {

        //test de la validité de la réponse
        if(response.status >= 200 && response.status < 300){
            return response;
        } else {
            let error = new Error(response.statusText || response.status.toString())
            error["response"] = response;
            return Promise.reject(error);
        }

    });
}