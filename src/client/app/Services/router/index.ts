import * as React from "react"
import { RouteComponentProps } from "react-router"
import { createHashHistory, History } from "history"

export interface IRoutesConfig 
{
    path: string
    exact?: boolean

    sidebar?: React.ComponentType<RouteComponentProps<any> | {}>
    main?: React.ComponentType<RouteComponentProps<any> | {}>

    //routes?: IRoutesConfig[]
}

let _history = undefined;
export const getHistory = (): History => {
    if(_history == undefined) _history = createHashHistory();
    return _history;
}
