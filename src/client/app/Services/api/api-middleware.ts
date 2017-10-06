import { IAction } from "modules/redux-actions"
import { IActionCreatorSettings, IRequest, IResponse } from "modules/redux-actions-graphql"
import { Store } from "redux"

import { getTracker } from "app/Services/analytics"

const apiMiddleware = store => next => action => {


    //filtre des actions
    if(!action || !action.type || action.type != "api"){
        return next(action);
    }

    let _store = store as Store<any>;
    let _action = action as IAction<IRequest<any, any>>;
    let _metas = _action.metas as IActionCreatorSettings<any, any, any>;

    

    //getTracker().event(_action.type, _action.action_id);

    //execution de l'action
    return next(_action);
}

export default apiMiddleware;
