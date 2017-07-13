import * as moment from "moment";

export interface IResourceColumn {
    label: string
    field: string
}

export interface IResource {
    [key: string]: any
    id: string | number
    children?: IResource[],
    title?: string
    eventColor?: string
}

export interface IEvent {
    [key: string]: any
    id: string | number
    resourceId: string | number
    start: string | Date | moment.Moment
    end: string | Date | moment.Moment
    title: string
    eventColor?: string
}