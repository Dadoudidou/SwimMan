import * as React from "react";

//store création
import { Provider } from "react-redux"
import { getStore } from "./store"

//session
require("./Services/session");

//routes
import { Router, Link } from "react-router-dom"
import { getHistory } from "./Services/router"
import RenderRoutes from "./Services/router/RenderRoutes"
import { loadRoutes } from "./Scenes/route"

//scenes
import Main from "./Scenes/Main";

//test session
import { set } from "app/Services/session"
import * as ApiModels from "app/Services/models"
set("user", new ApiModels.Utilisateur({ droits:[100,101,102,103] }))

export default class Application extends React.PureComponent<any, any>
{
    render(){
        return (
            <Provider store={getStore()}>
                <Router history={getHistory()}>
                    <div>
                        
                        <RenderRoutes routes={loadRoutes()} />
                    </div>
                </Router>
            </Provider>
        )
    }
}


