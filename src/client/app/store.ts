import { StoreManager } from "modules/redux-store-manager"

// middlewares
import ThunkMiddleware from "redux-thunk"
import ApiMiddleware from "./Services/api/api-middleware"
import { makeGraphQlMiddleware } from "modules/redux-actions-graphql"
import { makeFetchMiddleware } from "modules/redux-actions-fetch"
import WrapFetch from "./Services/fetch"

let graphqlApiMiddleware = makeGraphQlMiddleware({
    acton_type: "api",
    uri: "/graphql",
    fetch: WrapFetch,
    fetchOptions: {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }
})

let fetchDefaultMiddleware = makeFetchMiddleware({
    acton_type: "fetch",
    fetch: WrapFetch,
    fetchOptions: {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }
})


let middlewares = [
    ThunkMiddleware,
    ApiMiddleware,
    graphqlApiMiddleware,
    fetchDefaultMiddleware
];

let _storeManager = new StoreManager();
let _defaultStore = _storeManager.createStore("default", {}, middlewares).getStore("default");
export const getStore = () => _defaultStore;