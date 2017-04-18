export const loadRoutes = (store) => {
    return {
        path: 'seasons',
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                const reducer = require("./reducer");
                const component = require("./Season").default;

                //load reducer
                reducer.loadReducer(store);
                
                //retourne le composant
                callback(null, component);
            });
        }
    }
}