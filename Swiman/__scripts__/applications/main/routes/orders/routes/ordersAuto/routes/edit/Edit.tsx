import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Paper, SelectField, TextField, Subheader, DatePicker, Divider, FlatButton, RaisedButton, MenuItem } from "material-ui";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import { Col, Row, Container } from "react-grid-system";
import * as moment from "moment";
import { orderToStringAction } from "./../../utils";

import { PageTitle } from "applications/main/components";

import * as areIntlLocalesSupported from 'intl-locales-supported';
let DateTimeFormat;
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/fr');
    require('intl/locale-data/jsonp/fa-IR');
}

import RestrAge from "./components/RestrictionAge";
import RestrAdherentNb from "./components/RestrictionAdherents";
import RestrAdhesionsNb from "./components/RestrictionAdhsions";
import RestrCategory from "./components/RestrictionCategory";
import RestrActivity from "./components/RestrictionActivity";
import RestrSection from "./components/RestrictionSection";
import Amount from "./components/Amount";

interface IEditParams {
    id?: number
}

interface IEditProps {
    params?: IEditParams
    onChangeParams?: (params: IEditParams) => void

    season?: ApiModels.Season
    order?: ApiModels.OrderAuto
    onSave?: (order: ApiModels.OrderAuto) => void
}

interface IEditState {
    order: ApiModels.OrderAuto
    show_restrictions?: boolean
    show_amounts?: boolean

    errors?: { [key: string]: string }
}

class Edit extends React.PureComponent<IEditProps, IEditState>
{
    // set the default props for the class
    static defaultProps: IEditProps = {
        onChangeParams: () => { },
        onSave: () => { }
    }

    constructor(props: IEditProps) {
        super(props);
        this.state = {
            order: (props.params.id && props.order) ? JSON.parse(JSON.stringify(props.order)) : this.newOrderAuto(),
            show_amounts: true,
            show_restrictions: false,
            errors: {}
        };
        this.handle_onUpdate = this.handle_onUpdate.bind(this);
        this.handle_onSave = this.handle_onSave.bind(this);
    }

    newOrderAuto() {
        return new ApiModels.OrderAuto({
            action_amount: 0,
            apply_on_member: true,
            date_from: moment(this.props.season.start).toDate(),
            date_to: moment(this.props.season.end).toDate(),
            season: this.props.season
        });
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onChangeParams(this.props.params);
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IEditProps) {
        let _state = this.state;

        //changement de paramètres
        if (String(this.props.params.id) != String(nextProps.params.id)) {
            nextProps.onChangeParams(nextProps.params);
            _state = {
                ..._state,
                order: (nextProps.params.id && nextProps.order) ? JSON.parse(JSON.stringify(nextProps.order)) : this.newOrderAuto()
            };
        }

        //changement de order
        if (this.props.order != nextProps.order) {
            _state = {
                ..._state,
                order: JSON.parse(JSON.stringify(nextProps.order))
            };
        }

        if (this.state != _state) this.setState(_state);
    }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IEditProps, nextState: IEditState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IEditProps, prevState: IEditState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    handle_onUpdate(order: ApiModels.OrderAuto) {
        this.setState({
            ...this.state,
            order: order,
            errors: {}
        });
    }
    handle_onSave() {
        let _order = this.state.order;
        let _errors: any = {};

        //vérification des erreurs
        if (!_order.description || _order.description.trim() == "")
            _errors["description"] = "La description doit contenir un texte."
        
        //sauvegarde
        let _length = 0;
        for (let _i in _errors) { _length++; }
        if (_length > 0) {
            this.setState({
                ...this.state,
                errors: _errors
            });
        } else {
            this.props.onSave(_order);
        }
    }

    render() {
        let __this = this;
        let _label = (
            <span>
                <i className="fa fa-eur" /> Editer un tarif / réduction 
                {(this.props.season) ? <small> - {this.props.season.name}</small> : ""}
            </span>
        );

        let _actionsBtn = (
            <div style={{ textAlign: "right" }}>
                <RaisedButton label="Enregistrer" onClick={this.handle_onSave} />
            </div>
        );

        return (
            <div>
                <PageTitle label={_label} backButton actions={_actionsBtn} />
                <Row>
                    <Col md={4}>
                        <Subheader>Paramétrage général</Subheader>
                        <Paper zDepth={1} style={{ padding: "1em" }}>
                            <TextField fullWidth floatingLabelText="Description - Visible sur la facture"
                                errorText={this.state.errors["description"]}
                                value={this.state.order.description}
                                onChange={(event, value) => {
                                    __this.handle_onUpdate({
                                        ...__this.state.order,
                                        description: value
                                    })
                                }} />
                            <DatePicker fullWidth floatingLabelText="Début"
                                formatDate={new DateTimeFormat('fr', { day: 'numeric', month: 'long', year: 'numeric' }).format}
                                DateTimeFormat={DateTimeFormat} locale="fr"
                                minDate={moment(this.props.season.start).toDate()}
                                maxDate={moment(this.state.order.date_to).toDate()}
                                value={moment(this.state.order.date_from).toDate()}
                                onChange={(event, date) => {
                                    __this.handle_onUpdate({
                                        ...__this.state.order,
                                        date_from: date
                                    })
                                }} />
                            <DatePicker fullWidth floatingLabelText="Fin"
                                formatDate={new DateTimeFormat('fr', { day: 'numeric', month: 'long', year: 'numeric' }).format}
                                DateTimeFormat={DateTimeFormat} locale="fr"
                                minDate={moment(this.state.order.date_from).toDate()}
                                maxDate={moment(this.props.season.end).toDate()}
                                value={moment(this.state.order.date_to).toDate()}
                                onChange={(event, date) => {
                                    __this.handle_onUpdate({
                                        ...__this.state.order,
                                        date_to: date
                                    })
                                }} />
                            <SelectField fullWidth 
                                floatingLabelText="Ordre d'application"
                                value={this.state.order.order || 0}
                                onChange={(event, index, value) => {
                                    __this.handle_onUpdate({
                                        ...__this.state.order,
                                        order: value
                                    })
                                }}>
                                <MenuItem primaryText="0 (appliquer en premier)" value={0} />
                                <MenuItem primaryText="1" value={1} />
                                <MenuItem primaryText="2" value={2} />
                                <MenuItem primaryText="3" value={3} />
                                <MenuItem primaryText="4" value={4} />
                                <MenuItem primaryText="5" value={5} />
                                <MenuItem primaryText="6" value={6} />
                                <MenuItem primaryText="7" value={7} />
                                <MenuItem primaryText="8" value={8} />
                                <MenuItem primaryText="9 (appliquer en dernier)" value={9} />
                            </SelectField>
                        </Paper>
                        <Subheader>Application</Subheader>
                        <Paper zDepth={1} style={{ padding: "1em" }}>
                            {orderToStringAction(this.state.order)}
                        </Paper>
                    </Col>
                    <Col md={8}>
                        <Subheader>Restrictions</Subheader>
                        <Paper zDepth={1} >
                                <RestrAge order={this.state.order} onUpdate={this.handle_onUpdate} />
                                <Divider />
                                <RestrAdherentNb order={this.state.order} onUpdate={this.handle_onUpdate} />
                                <Divider />
                                <RestrAdhesionsNb order={this.state.order} onUpdate={this.handle_onUpdate} />
                                <Divider />
                                <RestrCategory order={this.state.order} onUpdate={this.handle_onUpdate} />
                                <Divider />
                                <RestrActivity order={this.state.order} onUpdate={this.handle_onUpdate} />
                                <Divider />
                                <RestrSection order={this.state.order} onUpdate={this.handle_onUpdate} />
                        </Paper>
                        
                        <Subheader>Montant</Subheader>
                        <Paper zDepth={1} style={{ padding: "1em" }}>
                            <Amount order={this.state.order} onUpdate={this.handle_onUpdate} />
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}



import { connect } from "react-redux";
import * as ApiActions from "modules/api/actions";
import { getStore } from "modules/redux";
import { IApp_Reducer } from "applications/main/reducer";
import { IOrdersAutoEditReducer, Constants } from "./sync";
import { push } from "react-router-redux";

interface IStateReducer extends IApp_Reducer, IOrdersAutoEditReducer { }

const mapStateToProps = (state: IStateReducer): IEditProps => {
    return {
        season: state.application.seasonSelected,
        order: state.OrdersAutoEdit.order
    };
}

const mapDispatchToProps = (dispatch): IEditProps => {
    return {
        onChangeParams: (params) => {
            let state: IStateReducer = getStore().getState();
            if (params && params.id != undefined && state.application.seasonSelected) {
                dispatch(ApiActions.orders.SearchOrdersAuto({
                    request_id: Constants.getElement,
                    Request: {
                        criteria: {
                            season_id: state.application.seasonSelected.id,
                            orderAuto_id: params.id
                        }
                    }
                }));
                dispatch(ApiActions.activities.GetTree({
                    request_id: Constants.getCategories,
                    Request: { season: state.application.seasonSelected }
                }));
            }
        },
        onSave: (order) => {
            dispatch(ApiActions.orders.UpdateOrderAuto({
                request_id: Constants.saveElement,
                Request: { order: order }
            })).then((order) => {
                dispatch(push("/orders/ordersauto/"));
            });;
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);