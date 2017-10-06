import { StoreManager } from "modules/redux-store-manager"

// middlewares
import ThunkMiddleware from "redux-thunk"
import ApiMiddleware from "./Services/api/api-middleware"
import { makeGraphQlMiddleware } from "modules/redux-actions-graphql"
import { makeFetchMiddleware } from "modules/redux-actions-fetch"
import WrapFetch from "./Services/fetch"
import { ApolloClient, createNetworkInterface } from "react-apollo"

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

export const graphQlApiClient = new ApolloClient({
    reduxRootSelector: state => state.apollo,
    networkInterface: createNetworkInterface({
        uri: "/graphql"
    }).use([
        { applyMiddleware: (req, next) => {
            if(!req.options.headers) req.options.headers = {};
            let get = require("app/Services/session").get;
            let _token = get("token");
            if(_token){
                req.options.headers.authorization = `JWT ${_token}`;
            }
            next();
        }}
    ])
});

let middlewares = [
    ThunkMiddleware,
    ApiMiddleware,
    graphQlApiClient.middleware(),
    graphqlApiMiddleware,
    fetchDefaultMiddleware
];
let _storeManager = new StoreManager();
let _defaultStore = _storeManager.createStore(
    "default", 
    {
        apollo: graphQlApiClient.reducer()
    }, 
    {}, 
    middlewares).getStore("default");

export const getStore = () => _defaultStore;