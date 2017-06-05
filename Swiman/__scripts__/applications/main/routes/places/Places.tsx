import * as React from "react";
import * as ApiModels from "modules/api/models";
import Layout from "applications/main/layouts/SidebarLeft";
import HeaderBarRight from "applications/main/partials/HeaderBarRight";
import SideBar from "applications/main/partials/SidebarMenu";
import { Paper } from "material-ui"

import List from "./routes/list/List";

interface IPlacesProps {
}

interface IPlacesState {

}

class Places extends React.PureComponent<IPlacesProps, IPlacesState>
{

    static defaultProps: IPlacesProps = {
        onInit: () => { }
    }

    constructor(props: IPlacesProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Layout sidebarContent={<SideBar />} headerBar_right={<HeaderBarRight />}>
                {
                    (this.props.children) ? this.props.children : <List />
                }
            </Layout>
        );
    }
}

export default Places;

