import * as FullCalendar from "fullcalendar";
import * as assign from "object-assign";
import * as moment from "moment";
import * as ApiModels from "modules/api/models";

export class EventModel implements FullCalendar.EventObject
{
    id?: any; // String/number
    title: string;
    allDay?: boolean;
    url?: string;
    className?: string | string[];
    editable?: boolean;
    startEditable?: boolean;
    durationEditable?: boolean;
    rendering?: string;
    overlap?: boolean;
    constraint?: FullCalendar.Timespan | FullCalendar.BusinessHours;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    start: Date;
    end?: Date;

    session?: ApiModels.Session

    constructor(title: string, start: Date, init?: Partial<EventModel>) {
        this.title = title;
        this.start = start;
        if(init) assign(this, init);
    }
}