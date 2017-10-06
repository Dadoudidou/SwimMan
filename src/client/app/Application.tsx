import * as React from "react";

import * as moment from "moment"
moment.locale("fr");

//styles
require("./Utils/utils.scss");

//fontawesome
require("font-awesome/css/font-awesome.min.css");
//animate css
require("animate.css/animate.min.css");

//store création
import { Provider } from "react-redux"
import { getStore } from "./store"

//apollo
import { ApolloProvider } from "react-apollo"
import { graphQlApiClient } from "./store"

//session
require("./Services/session");

//routes
import { Router, Link } from "react-router-dom"
import { getHistory } from "./Services/router"
import RenderRoutes from "./Services/router/RenderRoutes"
import { loadRoutes } from "./Scenes/route"



//test session
import { set } from "app/Services/session"
import * as ApiModels from "app/Services/models"

// ----------------------------------------------------------
// -- temporaire
/*set("user", new ApiModels.Utilisateur({ 
    droits:[1],
    first_name: "David",
    last_name: "Violet"
}))*/
// ----------------------------------------------------------

//material-ui
import { MuiThemeProvider, createMuiTheme, colors } from "material-ui"
import { create as createJss } from "jss"
import { JssProvider } from "react-jss"
import * as preset from "jss-preset-default"

const jss = createJss();
jss.setup(preset);

export default class Application extends React.PureComponent<any, any>
{
    render(){
        return (
            <Provider store={getStore()}>
                <ApolloProvider client={graphQlApiClient} store={getStore()}>
                    <Router history={getHistory()}>
                        <div>
                            <JssProvider Jss={jss}>
                                <MuiThemeProvider theme={createMuiTheme({
                                    palette: {
                                        primary: colors.blueGrey
                                    }
                                })}>
                                    <RenderRoutes routes={loadRoutes()} />
                                </MuiThemeProvider>
                            </JssProvider>
                        </div>
                    </Router>
                </ApolloProvider>
            </Provider>
        )
    }
}


