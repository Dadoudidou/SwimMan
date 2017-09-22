import * as React from "react"
import { IRoutesConfig } from "./index"
import { Route, Switch } from "react-router"

interface IRenderRoutesProps {
    routes: IRoutesConfig[]
}

class RenderRoutes extends React.Component<IRenderRoutesProps, any>
{
    static defaultProps: IRenderRoutesProps = {
        routes: []
    }
    render(){
        return (
            <div>
                <Switch>
                    {this.props.routes.map((route, index) => {
                        return (
                            <Route 
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main} />
                        )
                    })}
                </Switch>
            </div>
        )
    }
}

export default RenderRoutes;