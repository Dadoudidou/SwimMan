import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment";
import { actionCreator, isType, IAction, getStore, injectAsyncReducer } from "modules/redux";
import * as ApiActions from "modules/api/actions";
import { connect } from "react-redux";

import { Col, Row, Container } from "react-grid-system";
import { Toggle, Subheader, SelectField, MenuItem } from "material-ui";

import SelectSection from "applications/main/components/SelectSection";
import { OrderToNode, OrderToString } from "applications/main/helpers/orders";

//#region SYNC

const Constants = {
    search_sections: "routes/adhesions/components/formorder/search_sections",
    search_order: "routes/adhesions/components/formorder/search_order",
    search_sessions: "routes/adhesions/components/formorder/search_sessions",
}
const Actions = {
    init: actionCreator("AdhesionsFormOrder/init"),
    initSessions: actionCreator("AdhesionsFormOrder/initSessions")
}
interface IState {
    sections: ApiModels.CategoryTree[],
    orders: ApiModels.Order[],
    sessions: ApiModels.Session[]
}
const InitialState: IState = {
    sections: undefined,
    orders: undefined,
    sessions: undefined
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {
    if (isType(action, Actions.init)) return InitialState;
    //sections
    if (isType(action, ApiActions.activities.GetTreeSuccess) &&
        action.payload.request.request_id == Constants.search_sections) {
        return {
            ...state,
            sections: action.payload.response
        };
    }
    //orders
    if (isType(action, ApiActions.orders.SearchSuccess) &&
        action.payload.request.request_id == Constants.search_order) {
        return {
            ...state,
            orders: action.payload.response.orders
        };
    }
    //sessions
    if (isType(action, ApiActions.activities.GetSessionsSuccess) &&
        action.payload.request.request_id == Constants.search_sessions) {
        return {
            ...state,
            sessions: action.payload.response
        };
    }
    //initSessions
    if (isType(action, Actions.initSessions)) return { ...state, sessions: undefined };
    return state;
}
interface IAdhesionsFormOrderReducer {
    AdhesionsFormOrder: IState
}
injectAsyncReducer(getStore(), "AdhesionsFormOrder", Reducer);

//#endregion

//#region COMPONENTS

interface IFormOrderViewProps {
    season: ApiModels.Season
    adhesion?: ApiModels.Adhesion
    onUpdate?: (adhesion: ApiModels.Adhesion) => void
}
interface IFormOrderProps extends IFormOrderViewProps {
    sections?: ApiModels.CategoryTree[]
    orders?: ApiModels.Order[]
    sessions?: ApiModels.Session[]
    onMount?: (props: IFormOrderViewProps) => void
    onSelectSection?: (section: ApiModels.Section, season: ApiModels.Season) => void
}
interface IFormOrderState {
    section?: ApiModels.Section
    sessions: number[]
    order: ApiModels.Order
    useCard?: boolean
    useSessions?: boolean

    adhesion?: ApiModels.Adhesion
}
class FormOrder extends React.PureComponent<IFormOrderProps, IFormOrderState>
{
    // set the default props for the class
    static defaultProps: IFormOrderProps = {
        season: undefined,
        onMount: () => { },
        onSelectSection: () => { },
        onUpdate: () => { }
    }

    constructor(props: IFormOrderProps) {
        super(props);
        this.state = {
            adhesion: (props.adhesion) ? JSON.parse(JSON.stringify(props.adhesion)) : new ApiModels.Adhesion(),
            sessions: [],
            order: undefined,
            useCard: (props.adhesion && props.adhesion.order) ? props.adhesion.order.is_card : false,
            useSessions: (props.adhesion && props.adhesion.sessions && props.adhesion.sessions.length > 0 && props.adhesion.order && props.adhesion.order.restriction_session_min != undefined) ? true : false
        };
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onMount(this.props);
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IFormOrderProps) {
        let _state = this.state;
        let _onUpdateCall = false;
        let __this = this;

        if (this.props.season != nextProps.season) this.props.onMount(nextProps);
        if (this.props.adhesion != nextProps.adhesion)
            _state = {
                ..._state,
                adhesion: (nextProps.adhesion) ? JSON.parse(JSON.stringify(nextProps.adhesion)) : new ApiModels.Adhesion()
            }
        if (this.props.sessions != nextProps.sessions) {
            if (_state.adhesion.order != undefined) {
                _state = {
                    ..._state,
                    adhesion: {
                        ..._state.adhesion,
                        sessions: nextProps.sessions
                    }
                }
                _onUpdateCall = true;
            }
        }

        if (this.state != _state)
            this.setState(_state, () => {
                if (_onUpdateCall) {
                    __this.props.onUpdate(__this.state.adhesion);
                }
            });
    }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IFormOrderProps, nextState: IFormOrderState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IFormOrderProps, prevState: IFormOrderState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    UpdateAdhesionOnUpdate() {
        let __this = this;
        let __orders = __this.getOrders();
        if (__orders.length == 1)
            __this.handle_onSelectOrder(__orders[0], () => {
                __this.props.onUpdate(__this.state.adhesion);
            });
        else
            __this.props.onUpdate(__this.state.adhesion);
    }

    handle_onSelectSection(section: ApiModels.Section) {
        let __this = this;
        this.setState({
            ...this.state,
            section: section,
            adhesion: {
                ...this.state.adhesion,
                section: section,
                sessions: [],
                order: undefined
            }
        }, () => {
            __this.props.onSelectSection(section, __this.props.season)
            __this.UpdateAdhesionOnUpdate();
        })
    }

    handle_onToggleUseCard(use: boolean) {
        let __this = this;
        this.setState({
            ...this.state,
            useCard: use,
            useSessions: false,
            adhesion: { ...this.state.adhesion, order: undefined, sessions: [] }
        }, () => {
            __this.UpdateAdhesionOnUpdate();
        })
    }

    handle_onToggleUseSessions(use: boolean) {
        let __this = this;
        this.setState({
            ...this.state,
            useCard: false,
            useSessions: use,
            adhesion: { ...this.state.adhesion, order: undefined, sessions: [] }
        }, () => {
            __this.UpdateAdhesionOnUpdate();
        })
    }

    handle_onSelectOrder(order: ApiModels.Order, callback?: () => void) {
        let __this = this;
        this.setState({
            ...this.state,
            order: order,
            adhesion: {
                ...this.state.adhesion,
                order: order
            }
        }, () => {
            __this.props.onUpdate(__this.state.adhesion);
            if (callback) callback();
        });
    }

    handle_onSelectSessions(values: number[]) {
        let _sessions = this.props.sessions.filter(x => values.indexOf(x.id) > -1);
        let __this = this;
        this.setState({
            ...this.state,
            sessions: values,
            adhesion: { ...this.state.adhesion, sessions: _sessions, order: undefined },
            order: undefined
        }, () => {
            __this.UpdateAdhesionOnUpdate();
        })
    }

    getOrders() {
        let __this = this;

        //orders with sections
        let _filteredOrders = this.props.orders.filter((order, index) => order.section && order.section.id == this.state.adhesion.section.id);

        // --- is card
        _filteredOrders = _filteredOrders.filter(x => (this.state.useCard) ? x.is_card == true : !x.is_card);

        // --- nb sessions
        _filteredOrders = _filteredOrders.filter(x => {
            if (__this.state.adhesion.sessions && __this.state.adhesion.sessions.length > 0 && __this.state.useSessions) {
                if (x.restriction_session_min != undefined && x.restriction_session_max != undefined) {
                    return __this.state.adhesion.sessions.length <= x.restriction_session_max && __this.state.adhesion.sessions.length >= x.restriction_session_min;
                }
                return false;
            } else {
                return x.restriction_session_min == undefined || x.restriction_session_max == undefined;
            }
        })

        return _filteredOrders;
    }

    render() {
        let __this = this;
        if (!this.props.orders || !this.props.sections || !this.props.season) return (<div>Chargement ...</div>);

        return (
            <div style={{padding: "1em"}}>
                <Row>
                    <Col md={12}>
                        <SelectSection
                            categories={this.props.sections}
                            value={this.state.adhesion.section}
                            onChange={(event, index, value) => { __this.handle_onSelectSection(value); }} />
                    </Col>
                </Row>
                {this.renderChoiceOrder()}
            </div>
        );
    }

    renderChoiceOrder() {
        let __this = this;
        if (!this.state.adhesion.section) return (<div></div>);
        let _noOrders = (<div>Aucun tarif ne correspond à votre demande ou précisez les options.</div>);

        //orders with sections
        let _filteredOrders = this.props.orders.filter((order, index) => order.section && order.section.id == this.state.adhesion.section.id);

        //has card order
        let _hasCard = _filteredOrders.map(x => x.is_card).indexOf(true) > -1;

        //has sessions
        let _sessionsMin: number = undefined, _sessionsMax: number = undefined;
        _filteredOrders.forEach(x => {
            if (x.restriction_session_min != undefined && x.restriction_session_max != undefined) {
                if (_sessionsMin == undefined) _sessionsMin = x.restriction_session_min;
                if (_sessionsMax == undefined) _sessionsMax = x.restriction_session_max;
                if (x.restriction_session_min < _sessionsMin) _sessionsMin = x.restriction_session_min;
                if (x.restriction_session_max > _sessionsMax) _sessionsMax = x.restriction_session_max;
            }
        });
        let _hasSessions = _sessionsMin != undefined && _sessionsMax != undefined;

        _filteredOrders = this.getOrders();

        return (
            <Row>
                <Col md={12}>
                    {
                        (_hasCard || _hasSessions) ?
                            <Subheader>Options</Subheader>
                            : undefined
                    }
                    {
                        (_hasCard) ? 
                            <Toggle
                                label="Utiliser une carte"
                                labelPosition="right"
                                toggled={this.state.useCard}
                                onToggle={(event, value) => { __this.handle_onToggleUseCard(value) }} />
                            : undefined
                    }
                    {
                        (_hasSessions) ?
                            <Toggle
                                label="Sélectionner une ou plusieurs sessions par semaine"
                                labelPosition="right"
                                toggled={this.state.useSessions}
                                onToggle={(event, value) => { __this.handle_onToggleUseSessions(value) }} />
                            : undefined
                    }
                    {
                        (this.state.useSessions) ?
                            (this.props.sessions && this.props.sessions.length > 0) ?
                                <SelectField
                                    fullWidth
                                    multiple
                                    floatingLabelText="Sessions"
                                    value={(this.state.adhesion.sessions) ? this.state.adhesion.sessions.map(x => x.id) : []}
                                    onChange={(event, index, values) => { __this.handle_onSelectSessions(values) }}>
                                    {this.props.sessions.map(session => {
                                        let _day = moment().day(session.day).format("dddd");
                                        let _start = moment().startOf("day").add(moment.duration(session.start)).format("HH:mm");
                                        let _end = moment().startOf("day").add(moment.duration(session.end)).format("HH:mm");
                                        return (
                                            <MenuItem
                                                key={session.id}
                                                value={session.id}
                                                primaryText={_day + " de " + _start + " à " + _end}
                                                secondaryText={session.place.name} />
                                        )
                                    })}
                                </SelectField>
                                :
                                <div>
                                    Aucune sessions de disponible pour cette activité
                                </div>
                            : undefined
                    }
                    <Subheader>Tarif</Subheader>
                    <div style={{ padding: "1em", background: "#eee" }}>
                        {
                            (_filteredOrders.length == 0) ?
                                _noOrders
                                :
                                (_filteredOrders.length == 1) ?
                                    OrderToString(_filteredOrders[0])
                                    :
                                    <SelectField
                                        fullWidth
                                        floatingLabelText="Choix du tarif"
                                        value={(this.state.adhesion.order) ? this.state.adhesion.order.id : undefined}
                                        onChange={(event, index, value) => {
                                            __this.handle_onSelectOrder(_filteredOrders[index])
                                        }}>
                                        {_filteredOrders.map(order => {
                                            return (
                                                <MenuItem key={order.id} value={order.id} primaryText={OrderToString(order)} />
                                            );
                                        })}
                                    </SelectField>
                        }
                    </div>
                </Col>
            </Row>
        );
    }
}

//#endregion

//#region CONNEXION

const mapStateToProps = (state: IAdhesionsFormOrderReducer, props: IFormOrderViewProps): Partial<IFormOrderProps> => {
    return {
        orders: state.AdhesionsFormOrder.orders,
        sections: state.AdhesionsFormOrder.sections,
        sessions: state.AdhesionsFormOrder.sessions
    };
}

const mapDispatchToProps = (dispatch): Partial<IFormOrderProps> => {
    return {
        onMount: (props) => {
            if (props.season) {
                dispatch(ApiActions.activities.GetTree({
                    request_id: Constants.search_sections,
                    Request: { season: props.season }
                }));
                dispatch(ApiActions.orders.Search({
                    request_id: Constants.search_order,
                    Request: { criteria: { season_id: props.season.id }, limit: 99999, page: 1 }
                }));
            }
        },

        onSelectSection: (section, season) => {
            dispatch(Actions.initSessions());
            dispatch(ApiActions.activities.GetSessions({
                request_id: Constants.search_sessions,
                Request: { props: { section: section, season: season } }
            }))
        }
    };
}

//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(FormOrder);