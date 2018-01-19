import { IRoutesConfig } from "app/Services/router"



export const loadRoutes = (parent = ""): IRoutesConfig[] => {
    /*
    let _requestFiles = (require as any).context(".", true, /^\.\/[a-zA-Z0-9_]*\/route\.ts$/);
    let _childRoutes: IRoutesConfig[] = [];
    let _keys: any[] = _requestFiles.keys();

    //execute routes
    for(let i=0; i<_keys.length; i++){
        let _route = _requestFiles(_keys[i]);
        if(!_route["loadRoutes"]) continue;
        _childRoutes.push(_route.loadRoutes());
    }
    */

    return [
        ...require("./Dashboard/route").loadRoutes(parent),
        ...require("./Test/route").loadRoutes(parent),
        ...require("./Users/route").loadRoutes(parent),
        ...require("./System/route").loadRoutes(parent),
    ]
}