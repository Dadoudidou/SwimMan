﻿if (PRODUCTION) {
    __webpack_public_path__ = window.baseUrl + "/wwwRoot/";
}

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as modRedux from "modules/redux";
import { Provider } from "react-redux";
import { hashHistory, Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

//moment locale
import * as moment from "moment";
moment.locale("fr");

//es6 promise
import * as Promise from "es6-promise";
Promise.polyfill();

//test perfs react
import * as perf from "react-addons-perf";
(window as any).Perf = perf;

// *************
// store création
// *************
let store = modRedux.createStore();
import { loadReducer as AppLoadReducer } from "./reducer";
AppLoadReducer(store);

// *************
// route création
// *************
import { loadRoutes } from "./routes";
let routes = loadRoutes(store);

let history = syncHistoryWithStore(hashHistory as any, store);

// *************
// notifications
// *************
import * as modNotifs from "modules/notifications";
import Notifs from "modules/notifications/containers/Notifications";
modNotifs.reducer.loadReducer(store);

// *************
// Root Component
// *************
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import getMuiTheme from "material-ui/styles/getMuiTheme";
let _fontSize = 12;
let _theme = getMuiTheme({
   
})
class Root extends React.PureComponent<any, any>{
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={_theme}>
                    <div>
                        <Router history={history as any} routes={routes} />
                        <Notifs />
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));