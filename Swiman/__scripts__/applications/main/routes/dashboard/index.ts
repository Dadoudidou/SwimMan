export const loadRoutes = (store) => {
    return {
        path: 'dashboard',
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                //const reducer = require("./Reducer");
                const component = require("./Dashboard").default;

                //load reducer
                //reducer.loadReducer(store);

                //retourne le composant
                callback(null, component);
            });
        }
    }
}