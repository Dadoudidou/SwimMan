import * as React from "react";
import * as ApiModels from "modules/api/models";

import Layout from "applications/main/layouts/SidebarLeft";
import SideBar from "applications/main/partials/SidebarMenu";

interface IAdhesionsProps {
}

interface IAdhesionsState {
}

class Adhesions extends React.PureComponent<IAdhesionsProps, IAdhesionsState>
{
    // set the default props for the class
    static defaultProps: IAdhesionsProps = { }

    constructor(props: IAdhesionsProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IAdhesionsProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IAdhesionsProps, nextState: IAdhesionsState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IAdhesionsProps, prevState: IAdhesionsState) { }

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

export default Adhesions;