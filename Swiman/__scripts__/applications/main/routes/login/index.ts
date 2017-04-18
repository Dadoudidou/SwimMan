export const loadRoutes = (store) => {
    return {
        path: 'login',
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                const reducer = require("./reducer");
                const component = require("./Login").default;

                //load reducer
                reducer.loadReducer(store);

                //retourne le composant
                callback(null, component);
            });
        }
    }
}