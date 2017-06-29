import * as React from "react";
import {
    Dialog, MenuItem, FlatButton, TextField,
    Toggle, DatePicker, SelectField, Subheader, Card, CardText,
    Divider, CardHeader, Paper, List, ListItem,
    IconMenu, FontIcon, IconButton
} from "material-ui";
import * as ApiModels from "modules/api/models";
import { Col, Row, Container } from "react-grid-system";


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
import * as moment from "moment";

import { orderToStringAction } from "./utils";

function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}

function TryParseFloat(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseFloat(str);
            }
        }
    }
    return retValue;
}


interface IFormPropsComponent {
    order?: ApiModels.OrderAuto
    open?: boolean
    onCancel?: () => void
    onSave?: (order: ApiModels.OrderAuto) => void
}

interface IFormProps extends IFormPropsComponent {

    init?: () => void
    sections?: ApiModels.CategoryTree[]
    season?: ApiModels.Season
}

interface IFormState {
    order: ApiModels.OrderAuto
    errors?: { [key: string]: string }
}

class Form extends React.PureComponent<IFormProps, IFormState>
{
    static defaultProps: IFormProps = {
        init: () => { },
        onCancel: () => { },
        onSave: () => { },
        sections: [],
        open: false
    }

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            order: this.InitOrderProps(props),
            errors: {}
        };
        this.handle_onSave = this.handle_onSave.bind(this);
    }

    componentWillMount() {
        this.props.init();
    }

    componentWillReceiveProps(nextProps: IFormProps) {
        let _state = this.state;

        if (nextProps.order != this.props.order) {
            _state = { ..._state, order: this.InitOrderProps(nextProps) };
        }

        if (nextProps.open != this.props.open) {
            _state = { ..._state, errors: {} };
        }

        if (this.state != _state) {
            this.setState(_state);
        }
    }

    InitOrderProps(props: IFormProps) {
        let _order: ApiModels.OrderAuto = (props.order) ? JSON.parse(JSON.stringify(props.order)) : new ApiModels.OrderAuto();
        if (!_order.date_from) _order.date_from = (props.season) ? moment(props.season.start).toDate() : moment().toDate();
        if (!_order.date_to) _order.date_to = (props.season) ? moment(props.season.end).toDate() : moment().toDate();

        return _order;
    }

    handle_onUpdate(order: ApiModels.OrderAuto) {
        this.setState({
            ...this.state,
            order: order,
            errors: {
                ...this.state.errors
            }
        });
    }

    handle_onSave() {
        let _save = true;

        if (_save)
            this.props.onSave(this.state.order);
    }

    render() {

        if (!this.props.season) return <div></div>

        let __this = this;
        let _actions = [
            <FlatButton key="cancel" label="Annuler" onClick={this.props.onCancel} />,
            <FlatButton key="save" label="Enregistrer" onClick={this.handle_onSave} />
        ];

        return (
            <Dialog
                open={this.props.open}
                actions={_actions}
                modal={false}
                onRequestClose={this.props.onCancel}>

                <Row>
                    <Col md={12}>
                        <TextField
                            fullWidth
                            floatingLabelText="Description"
                            value={this.state.order.description}
                            onChange={(event, value) => {
                                __this.handle_onUpdate({
                                    ...__this.state.order,
                                    description: value
                                })
                            }} />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            fullWidth
                            floatingLabelText="Début"
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
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            fullWidth
                            floatingLabelText="Fin"
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
                            }}/>
                    </Col>

                    {this.renderRestrictions()}
                    {this.renderAmount()}

                    <Col md={12}>
                        <Divider />
                        <Paper zDepth={1} style={{ padding: "1em" }}>
                            {orderToStringAction(this.state.order)}
                        </Paper>
                    </Col>
                </Row>
                
            </Dialog>
        );
    }

    renderRestrictions() {
        let __this = this;
        return (
            <Col md={12}>
                <Paper>
                    <Subheader style={{ float: "left", width: "auto" }}>Restriction</Subheader>
                    <div style={{ float: "right" }}>
                        <IconMenu
                            iconButtonElement={<IconButton iconClassName="fa fa-plus" iconStyle={{ fontSize: 18 }} />}
                            width={250}>
                            <MenuItem primaryText="Age" rightToggle={<Toggle toggled={this.state.order.restriction_age != undefined} onToggle={(ev, value) => { __this.handle_onUpdate({ ...__this.state.order, restriction_age: (value) ? 0 : undefined }); }} />} />
                            <MenuItem primaryText="Catégorie" rightToggle={<Toggle />} />
                            <MenuItem primaryText="Activité" rightToggle={<Toggle />} />
                            <MenuItem primaryText="Section" rightToggle={<Toggle />} />
                            <MenuItem primaryText="Adhésions" rightToggle={<Toggle />} />
                            <MenuItem primaryText="Adhérents" rightToggle={<Toggle toggled={this.state.order.restriction_member_nb != undefined} onToggle={(ev, value) => { __this.handle_onUpdate({ ...__this.state.order, restriction_member_nb: (value) ? 1 : undefined }); }} />} />
                        </IconMenu>
                    </div>
                    <div style={{ clear: "both" }}></div>
                    <div style={{ padding: "1em" }}>
                        {
                            (this.state.order.restriction_age == undefined) ? undefined :
                                <Paper zDepth={1} style={{padding: "0 1em"}}>
                                    <Row>
                                        <Col md={6}>
                                            <SelectField floatingLabelText="Opérateur" fullWidth
                                                value={this.state.order.restriction_age_operator}
                                                onChange={(ev, ind, value) => { __this.handle_onUpdate({ ...__this.state.order, restriction_age_operator: value }) }}>
                                                <MenuItem primaryText="Egal à" value="==" />
                                                <MenuItem primaryText="Différent de" value="!=" />
                                                <MenuItem primaryText="Inférieur à" value="<" />
                                                <MenuItem primaryText="Inférieur et égal à" value="<=" />
                                                <MenuItem primaryText="Supérieur à" value=">" />
                                                <MenuItem primaryText="Supérieur et égal à" value=">=" />
                                            </SelectField>
                                        </Col>
                                        <Col md={6}>
                                            <TextField fullWidth floatingLabelText="âge"
                                                value={this.state.order.restriction_age}
                                                onChange={(ev, value) => { __this.handle_onUpdate({ ...__this.state.order, restriction_age: TryParseInt(value, 0) }) }} />
                                        </Col>
                                    </Row>
                                </Paper>
                        }
                        {(this.state.order.restriction_member_nb == undefined) ? undefined :
                            <Paper zDepth={1} style={{ padding: "0 1em" }}>
                                <Row>
                                    <Col md={6}>
                                        <SelectField floatingLabelText="Opérateur" fullWidth
                                            value={this.state.order.restriction_member_nb_operator}
                                            onChange={(ev, ind, value) => { __this.handle_onUpdate({ ...__this.state.order, restriction_member_nb_operator: value }) }}>
                                            <MenuItem primaryText="Egal à" value="==" />
                                            <MenuItem primaryText="Différent de" value="!=" />
                                            <MenuItem primaryText="Inférieur à" value="<" />
                                            <MenuItem primaryText="Inférieur et égal à" value="<=" />
                                            <MenuItem primaryText="Supérieur à" value=">" />
                                            <MenuItem primaryText="Supérieur et égal à" value=">=" />
                                        </SelectField>
                                    </Col>
                                    <Col md={6}>
                                        <TextField fullWidth floatingLabelText="Nombre d'adhérents"
                                            value={this.state.order.restriction_member_nb}
                                            onChange={(ev, value) => { __this.handle_onUpdate({ ...__this.state.order, restriction_member_nb: TryParseInt(value, 0) }) }} />
                                    </Col>
                                </Row>
                            </Paper>}
                    </div>
                </Paper>
                <br />
            </Col>
        );
    }

    renderAmount() {
        return (
            <Col md={12}>
                <Paper>
                    <Subheader>Montant</Subheader>
                </Paper>
            </Col>
        );
    }
}

import { connect } from "react-redux";
import { IOrdersList_Reducer } from "./reducer";
import { IApp_Reducer } from "applications/main/reducer";
import { getStore } from "modules/redux";

interface IState extends IOrdersList_Reducer, IApp_Reducer { }

const mapStateToProps = (state: IState, props: IFormPropsComponent): IFormProps => {
    return {
        ...props,
        season: state.application.seasonSelected,
        sections: state.route_Orders_Auto_List.categoryTrees
    };
}

const mapDispatchToProps = (dispatch): IFormProps => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);