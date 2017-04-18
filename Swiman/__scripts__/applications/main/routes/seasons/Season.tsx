import * as React from "react";
import * as ApiModels from "modules/api/models";
import Layout from "applications/main/layouts/SidebarLeft";
import SideBar from "applications/main/partials/SidebarMenu";
import HeaderBarRight from "applications/main/partials/HeaderBarRight";

import CompSeasons from "./components/Seasons";

interface ISeasonProps {

}

interface ISeasonState {

}

class Season extends React.Component<ISeasonProps, ISeasonState>
{
    constructor(props: ISeasonProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Layout sidebarContent={<SideBar />} headerBar_right={<HeaderBarRight />}>
                <CompSeasons />
            </Layout>
        );
    }
}


import { connect } from "react-redux";
import { ISeason_Reducer } from "./reducer";

const mapStateToProps = (state: ISeason_Reducer): ISeasonProps => {
    return {};
}

const mapDispatchToProps = (dispatch): ISeasonProps => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Season);