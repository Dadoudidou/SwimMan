export const loadRoutes = (store) => {
    return {
        path: 'inscriptionexpress',
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                const reducer = require("./sync");
                const component = require("./InscriptionExpress").default;

                //load reducer
                reducer.loadReducer(store);

                //retourne le composant
                callback(null, component);
            });
        },
        authorize: ['test']
    }
}