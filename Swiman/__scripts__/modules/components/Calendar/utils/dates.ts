import * as moment from "moment";

export const range = (start: Date, end: Date, unit: moment.unitOfTime.DurationConstructor = "day"): Date[] => {
    let _current = moment(start);
    let _days: Date[] = [];
    while (_current.isBefore(moment(end))) {
        _days.push(_current.toDate());
        _current.add(1, unit);
    }
    return _days;
}