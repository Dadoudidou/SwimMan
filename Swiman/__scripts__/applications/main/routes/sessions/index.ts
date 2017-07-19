export const loadRoutes = (store) => {
    return {
        path: 'sessions',
        indexRoute: { onEnter: (nextState, replace) => replace('/sessions/calendar') },
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                //const reducer = require("./reducer");
                const component = require("./Sessions").default;

                //load reducer
                //reducer.loadReducer(store);

                //retourne le composant
                callback(null, component);
            });
        },
        getChildRoutes: (partialNextState, callback) => {
            require.ensure([], function (require) {

                let routes = [
                    require("./routes/calendar").loadRoutes(store)
                ];
                callback(null, routes);
            });
        }
    }
}