/*
    lance une action à retardement
    parametrage :
    action.metas.delay : Nombre de millisecondes

    le retour de dispatch est une fonction permettant d'annuler le timeout
*/
export default store => next => action => {
    if (!action.metas || !action.metas.delay) {
        return next(action);
    }

    let timeoutId = setTimeout(
        () => next(action),
        action.metas.delay
    );

    return function cancel() {
        clearTimeout(timeoutId);
    }
}