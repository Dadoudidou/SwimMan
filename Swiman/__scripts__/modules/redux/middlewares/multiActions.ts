/*
    lance plusieurs actions
    [
        action1,
        action2,
        ...
    ]
*/
export default store => next => action => {
    if (Array.isArray(action)) {
        action.filter(Boolean).map(store.dispatch);
    } else {
        return next(action);
    }
}