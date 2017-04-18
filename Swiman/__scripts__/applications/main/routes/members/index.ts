export const loadRoutes = (store) => {
    return {
        path: 'members',
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                const reducer = require("./reducer");
                const component = require("./Members").default;

                //load reducer
                reducer.loadReducer(store);
                
                //retourne le composant
                callback(null, component);
            });
        },
        getChildRoutes: (partialNextState, callback) => {
            require.ensure([], function (require) {

                let routes = [
                    require("./routes/list").loadRoutes(store),
                    require("./routes/add").loadRoutes(store),
                    require("./routes/view").loadRoutes(store)
                ];
                callback(null, routes);
            });
        },
        authorize: [ 'test' ]
    }
}