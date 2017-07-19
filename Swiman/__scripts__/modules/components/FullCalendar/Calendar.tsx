import * as React from "react";
import * as ApiModels from "modules/api/models";

require("fullcalendar");
require("fullcalendar/dist/fullcalendar.min.css");

import * as JQuery from "jquery";
import * as FullCalendar from "fullcalendar";
import * as moment from "moment";



interface ICalendarProps {
    options?: FullCalendar.Options
    view?: string
    date?: Date
    events?: FullCalendar.EventObject[]
    locale?: string

    onDayClick?: (date: Date, jsEvent: MouseEvent, view: FullCalendar.ViewObject) => void
    onEventClick?: (event: FullCalendar.EventObject, jsEvent: MouseEvent, view: FullCalendar.ViewObject) => void
    onEventMouseover?: (event: FullCalendar.EventObject, jsEvent: MouseEvent, view: FullCalendar.ViewObject) => void;
    onEventMouseout?: (event: FullCalendar.EventObject, jsEvent: MouseEvent, view: FullCalendar.ViewObject) => void;
    onViewRender?: (view: FullCalendar.ViewObject, element: JQuery) => void;
    onViewDestroy?: (view: FullCalendar.ViewObject, element: JQuery) => void;
    onDayRender?: (date: Date, cell: JQuery) => void;
    onWindowResize?: (view: FullCalendar.ViewObject) => void;

    // --- event rendering
    onEventRender?: (event: FullCalendar.EventObject, element: JQuery, view: FullCalendar.ViewObject) => void;
    onEventAfterRender?: (event: FullCalendar.EventObject, element: JQuery, view: FullCalendar.ViewObject) => void;
    onEventAfterAllRender?: (view: FullCalendar.ViewObject) => void;
    onEventDestroy?: (event: FullCalendar.EventObject, element: JQuery, view: FullCalendar.ViewObject) => void;

    // -- event dragging
    onEventDrop?: (event: FullCalendar.EventObject, delta: moment.Duration, revertFunc: Function, jsEvent: Event, ui: any, view: FullCalendar.ViewObject) => void;
    onEventResize?: (event: FullCalendar.EventObject, delta: moment.Duration, revertFunc: Function, jsEvent: Event, ui: any, view: FullCalendar.ViewObject) => void;

    // -- selection
    onSelect?: (start: moment.Moment, end: moment.Moment, jsEvent: MouseEvent, view: FullCalendar.ViewObject, resource?: any) => void;
    onUnselect?: (view: FullCalendar.ViewObject, jsEvent: Event) => void;
}

interface ICalendarState {
}

class Calendar extends React.PureComponent<ICalendarProps, ICalendarState>
{
    // set the default props for the class
    static defaultProps: ICalendarProps = { }

    constructor(props: ICalendarProps) {
        super(props);
        this.state = {};
    }

    refs: {
        calendar: HTMLDivElement
    }
    calendar: JQuery = null;

    initFullCalendar(domNode) {
        moment.locale(this.props.locale);
        require("fullcalendar/dist/locale/" + this.props.locale);
        this.calendar = JQuery(domNode).fullCalendar({
            ...this.props.options,
            defaultView: this.props.view,
            defaultDate: this.props.date,
            events: this.props.events,

            dayClick: this.props.onDayClick,
            eventClick: this.props.onEventClick,
            eventMouseover: this.props.onEventMouseover,
            eventMouseout: this.props.onEventMouseout,
            viewRender: this.props.onViewRender,
            viewDestroy: this.props.onViewDestroy,
            dayRender: this.props.onDayRender,
            windowResize: this.props.onWindowResize,
            eventRender: this.props.onEventRender,
            eventAfterRender: this.props.onEventAfterRender,
            eventAfterAllRender: this.props.onEventAfterAllRender,
            eventDestroy: this.props.onEventDestroy,
            eventDrop: this.props.onEventDrop,
            eventResize: this.props.onEventResize,
            select: this.props.onSelect,
            unselect: this.props.onUnselect
        });
    }

    destroyFullCalendar() {
        this.calendar.fullCalendar('destroy');
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() {
        this.initFullCalendar(this.refs.calendar);
    }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ICalendarProps) {
        this.calendar.fullCalendar("changeView", nextProps.view);
        this.calendar.fullCalendar("gotoDate", nextProps.date);
        this.calendar.fullCalendar("removeEvents");
        this.calendar.fullCalendar("addEventSource", nextProps.events);
    }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ICalendarProps, nextState: ICalendarState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ICalendarProps, prevState: ICalendarState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() {
        this.destroyFullCalendar();
    }

    //#endregion

    render() {
        return (
            <div ref="calendar"></div>
        );
    }
}

export default Calendar;