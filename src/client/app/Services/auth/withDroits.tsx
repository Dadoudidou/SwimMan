import * as React from "react"
import { Route, RouteProps, Redirect, RouteComponentProps } from "react-router-dom"
import { LocationDescriptor } from "history"
import * as ApiModels from "app/Services/models"
import { authorize } from "./authorize"


export interface IWithDroitsOptions {
    droits: number[]
    redirectTo?: LocationDescriptor
}

export const withDroits = (options: IWithDroitsOptions) => {
    return function <P>(component: React.ComponentType<P>): React.ComponentClass<P> {

        interface IWithDroitsState {
            authorize: boolean,
            loading: boolean
        }

        class WithDroits extends React.PureComponent<P, IWithDroitsState>{
            static displayName: string = "withDroits(" + (component.displayName || component["name"]) + ")"
            constructor(props){
                super(props);
                this.state = { authorize: false, loading: true }
                this.authCallback = this.authCallback.bind(this);
            }
            componentWillMount(){
                authorize(options.droits, this.authCallback);
            }
            authCallback(auth: boolean) {
                this.setState({ ...this.state, authorize: auth, loading: false });
            }
            render()
            {
                //recherche authorisation
                if(this.state.loading){
                    return <span>Authorisation...</span>
                }

                //autorisé
                if(this.state.authorize){
                    return React.createElement(component as any, this.props);
                }

                //non autorisé - redirection
                //if(options.redirectTo){
                    return (
                        <Redirect 
                            to={options.redirectTo || "/dashboard"} />
                    )
                //}

                //non autorisé - 
                /*return (
                    <span>Non autorisé</span>
                )*/
                
            }
        }

        return WithDroits;
    }
}