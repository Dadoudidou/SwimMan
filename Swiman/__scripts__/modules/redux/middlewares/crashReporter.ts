/*

Récupère la moindre erreur avec Redux

*/
export default store => next => action => {
    try {
        return next(action);
    }
    catch (err) {
        console.error("caught an exception", err);
        throw err;
    }
}