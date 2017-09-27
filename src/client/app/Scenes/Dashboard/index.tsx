import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router"

import Layout from "./../Layouts/AppLayout";

interface IDashboardProps extends RouteComponentProps<any> {
}

class Dashboard extends React.PureComponent<IDashboardProps, any>
{
    render(){
        let __this = this;
        return (
            <Layout>
                Dashboard
            </Layout>
        )
    }
}

export default withRouter(Dashboard);