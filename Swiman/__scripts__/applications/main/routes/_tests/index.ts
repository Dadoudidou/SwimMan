export const loadRoutes = (store) => {
    return {
        path: 'test',
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                //const reducer = require("./reducer");
                const component = require("./Test").default;

                //load reducer
                //reducer.loadReducer(store);

                //retourne le composant
                callback(null, component);
            });
        }
    }
}