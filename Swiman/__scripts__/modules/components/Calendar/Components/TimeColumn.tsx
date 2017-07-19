import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment";
import * as dates from "./../utils/dates"

import GridColumn from "./GridColumn";

interface ITimeColumnProps {
    range: Date[]
    format?: string
    style?: React.CSSProperties
    cellStyle?: React.CSSProperties
}

interface ITimeColumnState {
}

class TimeColumn extends React.PureComponent<ITimeColumnProps, ITimeColumnState>
{
    // set the default props for the class
    static defaultProps: ITimeColumnProps = {
        range: [],
        format: "HH:mm"
    }

    constructor(props: ITimeColumnProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ITimeColumnProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ITimeColumnProps, nextState: ITimeColumnState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ITimeColumnProps, prevState: ITimeColumnState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        let _range = dates.range(moment().startOf("day").toDate(), moment().endOf("day").toDate(), "hour");
        let _rootStyle: React.CSSProperties = {
            display: "flex", flex: "none",
            width: 80,
            flexDirection: "column",
            ...this.props.style
        }
        let _dateStyle: React.CSSProperties = {
            ...this.props.cellStyle
        }
        return (
            <GridColumn
                range={this.props.range}
                style={{
                    flex: "none",
                    width: 100,
                    ...this.props.style
                }}
                cellStyle={this.props.cellStyle}
                cell={(date, index) => {
                    return moment(date).format(__this.props.format)
                }} />
        );
    }
}

export default TimeColumn;