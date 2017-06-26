export const loadRoutes = (store) => {
    return {
        path: 'orders',
        indexRoute: { onEnter: (nextState, replace) => replace('/orders/list') },
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                //const reducer = require("./reducer");
                const component = require("./Orders").default;

                //load reducer
                //reducer.loadReducer(store);

                //retourne le composant
                callback(null, component);
            });
        },
        getChildRoutes: (partialNextState, callback) => {
            require.ensure([], function (require) {

                let routes = [
                    require("./routes/list").loadRoutes(store)
                ];
                callback(null, routes);
            });
        }
    }
}