import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment";
import { ICalendarProps } from "./../Calendar"
import TimeColumn from "./TimeColumn";
import HeaderRow from "./HeaderRow";
import GridColumn from "./GridColumn";

import AgendaCell from "./../Views/Agenda/AgendaCell";

import * as dates from "./../utils/dates";

interface ITimeGridProps {
    range: Date[]
    options?: ICalendarProps
}

interface ITimeGridState {
}

class TimeGrid extends React.PureComponent<ITimeGridProps, ITimeGridState>
{
    // set the default props for the class
    static defaultProps: ITimeGridProps = {
        range: []
    }

    constructor(props: ITimeGridProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ITimeGridProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ITimeGridProps, nextState: ITimeGridState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ITimeGridProps, prevState: ITimeGridState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let _rootStyle: React.CSSProperties = {
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
        }
        return (
            <div style={_rootStyle}>
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        );
    }

    renderHeader() {
        let _rootStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: "column",
            border: "1px solid #aaa"
        }
        return (
            <div style={_rootStyle}>
                <HeaderRow
                    range={this.props.range}
                    resourceColumn={<span></span>}
                    resourceColumnStyle={{ width: 80 }} />
            </div>
        );
    }

    renderContent() {
        let __this = this;

        let _rootStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: "row",
            border: "1px solid #aaa"
        }

        let _colStyle: React.CSSProperties = {
            borderLeft: "1px solid #aaa",
            flexBasis: (100 / this.props.range.length) + "%",
            maxWidth: (100 / this.props.range.length) + "%",
        }

        let _cellStyle: React.CSSProperties = {
            borderBottom: "1px solid #ddd",
            height: 40
        }

        let _timeColStyle: React.CSSProperties = {
            width: 80
        }
        let _timeCellStyle: React.CSSProperties = {
            ..._cellStyle,
            textAlign: "right"
        }

        let _range = dates.range(moment().hour(8).minute(0).second(0).toDate(), moment().hour(23).minute(0).second(0).toDate(), "hour");

        return (
            <div style={_rootStyle}>
                <TimeColumn range={_range} style={_timeColStyle} cellStyle={_timeCellStyle} />
                {this.props.range.map((date, i) => {
                    return (
                        <GridColumn key={i}
                            style={_colStyle}
                            cellStyle={_cellStyle}
                            cell={() => {
                                return (
                                    <AgendaCell options={__this.props.options} />
                                );
                            }}
                            range={_range} />
                    );
                })}
            </div>
        );
    }
}

export default TimeGrid;