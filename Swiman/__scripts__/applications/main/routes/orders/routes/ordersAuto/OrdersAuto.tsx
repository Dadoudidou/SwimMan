import * as React from "react";
import * as ApiModels from "modules/api/models";

interface IOrdersAutoProps {
}

interface IOrdersAutoState {
}

class OrdersAuto extends React.PureComponent<IOrdersAutoProps, IOrdersAutoState>
{
    // set the default props for the class
    static defaultProps: IOrdersAutoProps = { }

    constructor(props: IOrdersAutoProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IOrdersAutoProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IOrdersAutoProps, nextState: IOrdersAutoState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IOrdersAutoProps, prevState: IOrdersAutoState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default OrdersAuto;