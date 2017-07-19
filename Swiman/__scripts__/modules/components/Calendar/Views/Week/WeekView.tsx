import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Navigate } from "./../../Types";
import * as dates from "./../../utils/dates";
import * as moment from "moment";

import { ICalendarProps } from "./../../Calendar";
import TimeGrid from "./../../Components/TimeGrid";

interface IWeekViewState {
}

class WeekView extends React.PureComponent<ICalendarProps, IWeekViewState>
{
    // set the default props for the class
    static defaultProps: Partial<ICalendarProps> = {}

    static navigate(date: Date, action: Navigate): Date {
        switch (action) {
            case "PREVIOUS":
                return moment(action).subtract(1, "week").toDate();
            case "NEXT":
                return moment(action).add(1, "week").toDate();
            default:
                return date;
        }
    }

    static range(date: Date): Date[] {
        let _start = moment(date).startOf("week");
        let _end = moment(date).endOf("week");
        return dates.range(_start.toDate(), _end.toDate());
    }

    constructor(props: ICalendarProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ICalendarProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ICalendarProps, nextState: IWeekViewState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ICalendarProps, prevState: IWeekViewState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let date = this.props.date;
        let range = WeekView.range(date);

        let _rootStyle: React.CSSProperties = {
            display: "flex",
            flexGrow: 1
        }

        return (
            <div style={_rootStyle}>
                <TimeGrid range={range} options={this.props} />
            </div>
        );
    }
}

export default WeekView;