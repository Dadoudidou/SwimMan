export const loadRoutes = (store) => {
    return {
        path: 'ordersAuto',
        indexRoute: { onEnter: (nextState, replace) => replace('/orders/ordersAuto/list') },
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                //const reducer = require("./reducer");
                const component = require("./OrdersAuto").default;

                //load reducer
                //reducer.loadReducer(store);

                //retourne le composant
                callback(null, component);
            });
        },
        getChildRoutes: (partialNextState, callback) => {
            require.ensure([], function (require) {

                let routes = [
                    require("./routes/list").loadRoutes(store),
                    require("./routes/edit").loadRoutes(store),
                ];
                callback(null, routes);
            });
        }
    }
}