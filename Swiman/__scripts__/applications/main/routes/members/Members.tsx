import * as React from "react";
import * as ApiModels from "modules/api/models";
import Layout from "applications/main/layouts/SidebarLeft";
import HeaderBarRight from "applications/main/partials/HeaderBarRight";
import SideBar from "applications/main/partials/SidebarMenu";
import { Paper } from "material-ui"

import List from "./routes/list/List";


interface IMembersProps {
    onInit?: () => void
}

interface IMembersState {

}

class Members extends React.PureComponent<IMembersProps, IMembersState>
{

    static defaultProps: IMembersProps = {
        onInit: () => { }
    }

    constructor(props: IMembersProps ) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.onInit();
    }

    render() {
        return (
            <Layout sidebarContent={<SideBar />} headerBar_right={undefined}>
                {
                    (this.props.children) ? this.props.children : <List />
                }
                
            </Layout>
        );
    }
}


import { connect } from "react-redux";
import { IMembers_Reducer } from "./reducer";
import * as Constants from "./constants";
import * as ApiActions from "modules/api/actions";

const mapStateToProps = (state: IMembers_Reducer): IMembersProps => {
    return {};
}

const mapDispatchToProps = (dispatch): IMembersProps => {
    return {
        onInit: () => {
            
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Members);