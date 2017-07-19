import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as DeepExtend from "deep-extend";
import * as moment from "moment";

import WeekView from "./Views/Week/WeekView";

export interface ICalendarProps {
    date?: Date
    views?: {
        agenda?: {
            allDaySlot?: boolean                    //affiche le All-Day au dessus du calendrier
            allDayText?: string                     //texte affiché pour le AllDaySlot
            slotDuration?: string                   //fréquence d'affichage des slots de temps
            slotLabelFormat?: string                //format des heures
            slotLabelInterval?: moment.Duration     //durée entre chaque slot de temps
            snapDuration?: moment.Duration          //durée lors du drag n drop
            minTime?: string                        //durée minimale
            maxTime?: string                        //durée maximale
        }
        week?: {
            titleFormat?: string
        }
    }
    hiddenDays?: number[]
}

interface ICalendarState {
}

class Calendar extends React.PureComponent<ICalendarProps, ICalendarState>
{
    // set the default props for the class
    static defaultProps: ICalendarProps = {}

    static defaultOptions: ICalendarProps = {
        date: moment().toDate(),
        views: {
            agenda: {
                allDaySlot: true,
                allDayText: "All day",
                slotDuration: "00:30:00",
                slotLabelFormat: "h(:mm)a",
                slotLabelInterval: moment.duration(1, "hour"),
                snapDuration: moment.duration(30, "minute"),
                minTime: "00:00:00",
                maxTime: "24:00:00"
            },
            week: {
                titleFormat: "ll"
            }
        }
    }

    constructor(props: ICalendarProps) {
        super(props);
        //console.log(props);
        //this.options = DeepExtend(props, Calendar.defaultOptions);
        this.state = {};
    }

    options: ICalendarProps = {}

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.options = DeepExtend(Calendar.defaultOptions, JSON.parse(JSON.stringify(this.props)));
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ICalendarProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ICalendarProps, nextState: ICalendarState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ICalendarProps, prevState: ICalendarState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let _rootStyle: React.CSSProperties = {
            display: "flex",
        }
        return (
            <div style={_rootStyle}>
                <WeekView {...this.options} />
            </div>
        );
    }
}

export default Calendar;