export const loadRoutes = (store) => {
    return {
        path: 'activities',
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                const reducer = require("./reducer");
                const component = require("./Activities").default;

                //load reducer
                reducer.loadReducer(store);
                
                //retourne le composant
                callback(null, component);
            });
        }
    }
}