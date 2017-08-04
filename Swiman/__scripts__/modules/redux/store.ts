import * as Redux from "redux";
import { makeRootReducer, IState } from "./reducer";

export interface IStore<T> extends Redux.Store<T> {
    asyncReducers: { [name: string]: Redux.Reducer<any> }
}

//middlewares
import thunkMiddleware from "redux-thunk";
import * as createLoggerMiddleware from "redux-logger";
import crashReporterMiddleware from "./middlewares/crashReporter";
import timeoutSchedulerMiddleware from "./middlewares/timeoutScheduler";
import { routerMiddleware } from "react-router-redux";
import { hashHistory } from "react-router";
let loggerMiddleware = createLoggerMiddleware({
    collapsed: true
});


let store = undefined;

let finalCreateStore = (initialState = {}) => {
    //middleware configuration
    let middlewares = [];
    middlewares.push(thunkMiddleware);
    middlewares.push(routerMiddleware(hashHistory as any));
    middlewares.push(timeoutSchedulerMiddleware);
    middlewares.push(loggerMiddleware);
    middlewares.push(crashReporterMiddleware);

    /*if (!PRODUCTION) {
        middlewares.push(loggerMiddleware);
    }*/

    //store
    store = Redux.createStore(
        makeRootReducer(),
        initialState,
        Redux.applyMiddleware(...middlewares));

    //ajout de reducers async
    store.asyncReducers = {};

    //last action call
    store.subscribe(() => {
        /*let _state: IState = store.getState() as IState;
        let _action = _state.lastAction;
        if (_action && _action.onNext) {
            _action.onNext(store.dispatch, _action.payload);
        }*/
    });

    return store;
}

import { getStoreManager, injectAsyncReducer as _injectAsyncReducer } from "./storeManager";


export const createStore = (store: string = "default") => {
    return getStoreManager()
        .createStore(store, { loggerMiddleware: true, routingReducer: true, thunkMiddleware: true })
        .getStore(store);
}
export const getStore = (store: string = "default") => getStoreManager().getStore(store);
export const injectAsyncReducer = _injectAsyncReducer