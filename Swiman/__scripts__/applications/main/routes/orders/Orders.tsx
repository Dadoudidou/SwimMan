import * as React from "react";
import * as ApiModels from "modules/api/models";
import Layout from "applications/main/layouts/SidebarLeft";
import HeaderBarRight from "applications/main/partials/HeaderBarRight";
import SideBar from "applications/main/partials/SidebarMenu";
import { Paper } from "material-ui"

import List from "./routes/list/List";


interface IOrdersProps {
    onInit?: () => void
}

interface IOrdersState {

}

class Orders extends React.PureComponent<IOrdersProps, IOrdersState>
{

    static defaultProps: IOrdersProps = {
        onInit: () => { }
    }

    constructor(props: IOrdersProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.onInit();
    }

    render() {
        return (
            <Layout sidebarContent={<SideBar />} headerBar_right={<HeaderBarRight />}>
                {this.props.children}
            </Layout>
        );
    }
}


export default Orders;