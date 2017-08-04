import * as Redux from "redux";
import { IAction } from "modules/redux";

// *** middlewares
import thunkMiddleware from "redux-thunk";
import * as createLoggerMiddleware from "redux-logger";
import crashReporterMiddleware from "./middlewares/crashReporter";
import timeoutSchedulerMiddleware from "./middlewares/timeoutScheduler";
let loggerMiddleware = createLoggerMiddleware({ collapsed: true, duration: true, timestamp: true });
import { routerMiddleware } from "react-router-redux";
import { hashHistory } from "react-router";

// *** reducers
const LastActionReducer = (state = null, action: IAction<any>): IAction<any> => {
    return action;
}
import { routerReducer } from "react-router-redux";

const makeRootReducer = (asyncReducers?) => {
    return Redux.combineReducers({
        lastAction: LastActionReducer,
        ...asyncReducers
    });
};

export interface IStore<T> extends Redux.Store<T> {
    asyncReducers: { [name: string]: Redux.Reducer<any> }
}

interface IStoreOption {
    thunkMiddleware?: boolean
    loggerMiddleware?: boolean
    routingReducer?: boolean
}

const defaultStoreOption: IStoreOption = {
    thunkMiddleware: true,
    loggerMiddleware: true,
    routingReducer: false
}


class StoreManager {
    stores: { [key: string]: IStore<any> }

    constructor() {
        this.stores = {};
    }

    addStore(key: string, store: IStore<any>): StoreManager {
        this.stores[key.toLowerCase()] = store;
        return this;
    }

    getStore(key: string): IStore<any> {
        return this.stores[key.toLowerCase()];
    }

    createStore(key: string, options?: IStoreOption, initialState = {}): StoreManager {

        let __options: IStoreOption = (options) ? options : {};
        __options = { ...defaultStoreOption, ...__options };

        // *** middlewares
        let middlewares = [];
        if (__options.thunkMiddleware) middlewares.push(thunkMiddleware);
        if (__options.routingReducer) middlewares.push(routerMiddleware(hashHistory as any));
        middlewares.push(timeoutSchedulerMiddleware);
        if (!PRODUCTION) {
            if (__options.loggerMiddleware) middlewares.push(loggerMiddleware);
        }
        middlewares.push(crashReporterMiddleware);

        // *** store
        let __store = Redux.createStore(
            makeRootReducer(),
            initialState,
            Redux.applyMiddleware(...middlewares));

        // *** reducers asynchrones
        (__store as IStore<any>).asyncReducers = {};

        // *** add to store manager
        this.addStore(key, __store as IStore<any>);

        // *** initials reducers
        if (__options.routingReducer) this.injectAsyncReducer(key, "routing", routerReducer);

        return this;
    }

    injectAsyncReducer(storeKey: string, name: string, asyncReducer): StoreManager {
        let __store = this.getStore(storeKey);
        if (!__store) {
            console.error("Not found store whith key [" + storeKey + "]");
            return;
        }
        __store.asyncReducers[name] = asyncReducer;
        __store.replaceReducer(makeRootReducer(__store.asyncReducers));

        return this;
    }
}


let _storemanager = new StoreManager();
export const getStoreManager = () => { return _storemanager; }


export const injectAsyncReducer = (store: IStore<any>, name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
};