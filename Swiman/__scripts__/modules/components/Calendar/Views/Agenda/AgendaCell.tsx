import * as React from "react";
import * as ApiModels from "modules/api/models";
import { ICalendarProps } from "./../../Calendar";

interface IAgendaCellProps {
    options?: ICalendarProps
}

interface IAgendaCellState {
}

class AgendaCell extends React.PureComponent<IAgendaCellProps, IAgendaCellState>
{
    // set the default props for the class
    static defaultProps: IAgendaCellProps = { }

    constructor(props: IAgendaCellProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IAgendaCellProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IAgendaCellProps, nextState: IAgendaCellState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IAgendaCellProps, prevState: IAgendaCellState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let _rootStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1
        }
        let _cellStyle: React.CSSProperties = {
            borderBottom: "1px dotted #ddd",
            flexBasis: "25%", flexGrow: 1
        }
        return (
            <div style={_rootStyle}>
                <div style={_cellStyle}></div>
                <div style={_cellStyle}></div>
                <div style={_cellStyle}></div>
                <div style={_cellStyle}></div>
            </div>
        );
    }
}

export default AgendaCell;