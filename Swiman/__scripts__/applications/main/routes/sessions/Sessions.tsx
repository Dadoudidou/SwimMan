import * as React from "react";
import * as ApiModels from "modules/api/models";

import Layout from "applications/main/layouts/SidebarLeft";
import HeaderBarRight from "applications/main/partials/HeaderBarRight";
import SideBar from "applications/main/partials/SidebarMenu";

interface ISessionsProps {
}

interface ISessionsState {
}

class Sessions extends React.PureComponent<ISessionsProps, ISessionsState>
{
    // set the default props for the class
    static defaultProps: ISessionsProps = { }

    constructor(props: ISessionsProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ISessionsProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ISessionsProps, nextState: ISessionsState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ISessionsProps, prevState: ISessionsState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        return (
            <Layout sidebarContent={<SideBar />} headerBar_right={<HeaderBarRight />}>
                {this.props.children}
            </Layout>
        );
    }
}

export default Sessions;