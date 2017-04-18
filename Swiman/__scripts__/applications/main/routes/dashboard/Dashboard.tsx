import * as React from "react";
import * as ApiModels from "modules/api/models";
import Layout from "applications/main/layouts/SidebarLeft";
import SideBar from "applications/main/partials/SidebarMenu";
import HeaderBarRight from "applications/main/partials/HeaderBarRight";
import { Authorization } from "modules/auth";

interface IDashboardProps {

}

interface IDashboardState {

}

class Dashboard extends React.Component<IDashboardProps, IDashboardState>
{
    constructor(props: IDashboardProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Layout sidebarContent={<SideBar />} headerBar_right={<HeaderBarRight />}>
                Dashboard
            </Layout>
        );
    }
}

export default Authorization([1], "/login")(Dashboard);