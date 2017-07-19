import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment"

import { FlatButton, Paper, SelectField, MenuItem } from "material-ui"
import { Col, Row, Container } from "react-grid-system";

import * as colors from "material-ui/styles/colors";

require("./calendar.scss");
import { EventModel } from "./EventModel";
import { PageTitle } from "applications/main/components";
import FullCalendar from "modules/components/FullCalendar/Calendar";


import { connect } from "react-redux";
import * as ApiActions from "modules/api/actions";
import { getStore } from "modules/redux";
import { IApp_Reducer } from "applications/main/reducer";
import { ISessionsCalendarReducer, Constants, Actions } from "./sync";
import { push } from "react-router-redux";
interface IStateReducer extends IApp_Reducer, ISessionsCalendarReducer { }

import SelectSection from "./SelectSection";
import Formulaire from "./Form";


interface ICalendarProps {
    season?: ApiModels.Season

    sessions?: ApiModels.Session[]
    onSaveSession?: (session: ApiModels.Session) => void

    places?: ApiModels.Place[]
    placeSelected?: ApiModels.Place
    onSelectPlace?: (place: ApiModels.Place) => void

    sectionSelected?: ApiModels.Section
    onSelectSection?: (section?: ApiModels.Section) => void

    onMount?: () => void
}

interface ICalendarState {
    date: Date
    sessionEdited: ApiModels.Session
}

class Calendar extends React.PureComponent<ICalendarProps, ICalendarState>
{
    // set the default props for the class
    static defaultProps: ICalendarProps = {
        onMount: () => { },
        onSelectPlace: () => { },
        onSaveSession: () => { },
        onSelectSection: () => { }
    }

    constructor(props: ICalendarProps) {
        super(props);
        this.state = {
            date: moment().toDate(),
            sessionEdited: undefined
        };

        this.onEventClick = this.onEventClick.bind(this);
        this.onEventDrop = this.onEventDrop.bind(this);
        this.onEventResize = this.onEventResize.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onMount();
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ICalendarProps) {
        if (nextProps.season != this.props.season) {
            this.props.onMount();
        }
    }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ICalendarProps, nextState: ICalendarState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ICalendarProps, prevState: ICalendarState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    //#region EVENTS

    onEventClick(event: EventModel, jsEvent, view) {
        //console.log(event);
        this.setState({
            ...this.state,
            sessionEdited: event.session
        });
    }

    onEventDrop(event: EventModel, delta: moment.Duration, revertFunc: Function, jsEvent: Event, ui: any, view) {
        let _session: ApiModels.Session = {
            ...event.session,
            day: moment(event.start).day(),
            start: moment(event.start).format("HH:mm:ss"),
            end: moment(event.end).format("HH:mm:ss")
        }
        this.props.onSaveSession(_session);
    }

    onEventResize(event: EventModel, delta: moment.Duration, revertFunc: Function, jsEvent: Event, ui: any, view) {
        let _session: ApiModels.Session = {
            ...event.session,
            day: moment(event.start).day(),
            start: moment(event.start).format("HH:mm:ss"),
            end: moment(event.end).format("HH:mm:ss")
        }
        this.props.onSaveSession(_session);
    }

    renderEvents(sessions: ApiModels.Session[]): EventModel[] {
        let _events: EventModel[] = [];
        sessions.forEach(session => {
            let _title = session.section.name + " (" + session.section.activity.category.name + "/" + session.section.activity.name + ")";
            let _start = moment(this.state.date).day(session.day).startOf("day").add(moment.duration(session.start)).toDate();
            let _end = moment(this.state.date).day(session.day).startOf("day").add(moment.duration(session.end)).toDate();
            _events.push(new EventModel(_title, _start, {
                end: _end,
                session: session
            }));
        })
        return _events;
    }

    onSelect(start: moment.Moment, end: moment.Moment, jsEvent: MouseEvent, view, resource?: any) {
        this.setState({
            ...this.state,
            sessionEdited: new ApiModels.Session({
                day: moment(start).day(),
                start: moment(start).format("HH:mm:ss"),
                end: moment(end).format("HH:mm:ss"),
                place: this.props.placeSelected,
                section: this.props.sectionSelected,
                nbSlots: 0
            })
        })
    }

    //#endregion

    onCancel() {
        this.setState({ ...this.state, sessionEdited: undefined });
    }

    onSave(session: ApiModels.Session) {
        this.props.onSaveSession(session);
        this.setState({ ...this.state, sessionEdited: undefined });
    }

    render() {
        let _label = "Sessions ";
        if (!this.props.season) {
            return (
                <div>
                    <PageTitle label={<span>{_label}</span>} />
                    <Row><Col md={12}>Chargement ...</Col></Row>
                </div>
            );
        }

        let __this = this;
        _label += this.props.season.name;

        return (
            <div className="routes-sessions-calendar">
                <PageTitle
                    label={<span>{_label}</span>}
                    actions={
                        <div style={{ textAlign: "right" }}>
                            <FlatButton label="Ajouter une session" onClick={() => { __this.setState({ ...__this.state, sessionEdited: new ApiModels.Session() }) }} />
                        </div>
                    } />
                <Row>
                    <Col md={4}>
                        {this.renderSelectPlace()}
                    </Col>
                    <Col md={4}>
                        <SelectSection
                            allText="Toutes les sections"
                            value={this.props.sectionSelected}
                            onChange={(event, index, section) => {
                                __this.props.onSelectSection(section);
                            }} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={12}>
                        <Paper zDepth={1}>
                            <FullCalendar
                                view="agendaWeek"
                                date={this.state.date}
                                locale="fr"
                                events={this.renderEvents(this.props.sessions)}
                                onEventClick={this.onEventClick}
                                onEventDrop={this.onEventDrop}
                                onEventResize={this.onEventResize}
                                onSelect={this.onSelect}
                                options={{
                                    header: false,
                                    allDaySlot: false,
                                    slotDuration: moment.duration(15, "minute"),
                                    slotLabelInterval: moment.duration(1, "hour"),
                                    minTime: moment.duration(7, "hour"),
                                    maxTime: moment.duration(23, "hour"),
                                    scrollTime: moment.duration(20, "hour"),
                                    columnFormat: "dddd",
                                    hiddenDays: [0],
                                    height: 600,
                                    editable: true,
                                    selectable: true,
                                    selectHelper: false
                                }} />
                        </Paper>
                    </Col>
                </Row>
                <Formulaire
                    session={this.state.sessionEdited}
                    onCancel={this.onCancel}
                    onSave={this.onSave} />
            </div>
        );
    }

    renderSelectPlace() {
        if (!this.props.places || this.props.places.length == 0) return undefined;
        let __this = this;
        return (
            <SelectField
                fullWidth
                floatingLabelText="Lieu"
                value={(this.props.placeSelected) ? this.props.placeSelected.id : undefined}
                onChange={(event, index, value) => {
                    __this.props.onSelectPlace(__this.props.places[index]);
                }}>
                {this.props.places.map(place => {
                    return <MenuItem key={place.id} value={place.id} primaryText={place.name} />
                })}
            </SelectField>
        )
    }
}








const mapStateToProps = (state: IStateReducer): ICalendarProps => {
    return {
        season: state.application.seasonSelected,
        places: state.SessionsCalendar.places,
        placeSelected: state.SessionsCalendar.place_selected,
        sessions: state.SessionsCalendar.sessions,
        sectionSelected: state.SessionsCalendar.sectionSelected
    };
}

const mapDispatchToProps = (dispatch): ICalendarProps => {
    return {
        onMount: () => {
            let state: IStateReducer = getStore().getState();
            if (state.application.seasonSelected) {

                dispatch(Actions.init());

                //liste des catégories - activités - sections
                dispatch(ApiActions.activities.GetTree({
                    request_id: Constants.searchActivities,
                    Request: {
                        season: state.application.seasonSelected
                    }
                }))

                //lieux
                dispatch(ApiActions.activities.GetPlaces({
                    request_id: Constants.searchPlace,
                    Request: {}
                })).then((places: ApiModels.Place[]) => {
                    let state: IStateReducer = getStore().getState();
                    if (state.SessionsCalendar.place_selected) {
                        dispatch(ApiActions.activities.GetSessions({
                            request_id: Constants.searchSessions,
                            Request: {
                                props: {
                                    place: state.SessionsCalendar.place_selected,
                                    season: state.application.seasonSelected,
                                    section: state.SessionsCalendar.sectionSelected
                                }
                            }
                        }))
                    }
                });

            }
        },
        onSelectPlace: (place) => {
            let state: IStateReducer = getStore().getState();
            dispatch(Actions.selectPlace(place));
            dispatch(ApiActions.activities.GetSessions({
                request_id: Constants.searchSessions,
                Request: {
                    props: {
                        place: place,
                        season: state.application.seasonSelected,
                        section: state.SessionsCalendar.sectionSelected
                    }
                }
            }))
        },
        onSelectSection: (section) => {
            let state: IStateReducer = getStore().getState();
            dispatch(Actions.selectSection(section));
            dispatch(ApiActions.activities.GetSessions({
                request_id: Constants.searchSessions,
                Request: {
                    props: {
                        place: state.SessionsCalendar.place_selected,
                        season: state.application.seasonSelected,
                        section: section
                    }
                }
            }))
        },
        onSaveSession: (session) => {
            dispatch(ApiActions.activities.UpdateSession({
                request_id: Constants.updateSession,
                Request: { session: session }
            }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);