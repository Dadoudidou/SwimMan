export const loadRoutes = (store) => {
    return {
        path: 'add(/:id)',
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                const reducer = require("./sync");
                const component = require("./Add").default;

                //load reducer
                reducer.loadReducer(store);

                //retourne le composant
                callback(null, component);
            });
        }
    }
}