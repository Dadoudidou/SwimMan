import * as React from "react";
import * as ApiModels from "modules/api/models";

import Layout from "applications/main/layouts/SidebarLeft";
import SideBar from "applications/main/partials/SidebarMenu";

interface IMembersProps {
}

interface IMembersState {
}

class Members extends React.PureComponent<IMembersProps, IMembersState>
{
    // set the default props for the class
    static defaultProps: IMembersProps = { }

    constructor(props: IMembersProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IMembersProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IMembersProps, nextState: IMembersState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IMembersProps, prevState: IMembersState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        return (
            <Layout sidebarContent={<SideBar />} headerBar_right={undefined}>
                {this.props.children}
            </Layout>
        );
    }
}

export default Members;