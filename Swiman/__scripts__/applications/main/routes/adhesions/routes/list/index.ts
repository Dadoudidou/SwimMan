﻿export const loadRoutes = (store) => {
    return {
        path: 'list',
        getComponent: (partialNextState, callback) => {
            //chargement asynchrone
            require.ensure([], function (require) {

                const reducer = require("./sync");
                const component = require("./List").default;

                //load reducer
                reducer.loadReducer(store);

                //retourne le composant
                callback(null, component);
            });
        }
    }
}