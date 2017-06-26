import * as React from "react";
import { Dialog, MenuItem, FlatButton, TextField, Toggle, DatePicker, SelectField, Subheader } from "material-ui";
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
    order?: ApiModels.Order
    open?: boolean
    onCancel?: () => void
    onSave?: (order: ApiModels.Order) => void
}

interface IFormProps extends IFormPropsComponent {

    init?: () => void
    sections?: ApiModels.CategoryTree[]
    season?: ApiModels.Season
}

interface IFormState {
    order: ApiModels.Order
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
        let _order: ApiModels.Order = (props.order) ? JSON.parse(JSON.stringify(props.order)) : new ApiModels.Order();
        if (!_order.date_from) _order.date_from = (props.season) ? moment(props.season.start).toDate() : moment().toDate();
        if (!_order.date_to) _order.date_to = (props.season) ? moment(props.season.end).toDate() : moment().toDate();

        return _order;
    }

    handle_onUpdate(order: ApiModels.Order) {
        this.setState({
            ...this.state,
            order: order,
            errors: {
                ...this.state.errors,
                section: (order.restriction_section_id != this.state.order.restriction_section_id) ? undefined : this.state.errors["section"]
            }
        });
    }

    handle_onSave() {
        let _save = true;

        if (!this.state.order.restriction_section_id) {
            _save = false;
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    section: "Une section doit être sélectionnée"
                }
            })
        }

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
        let _selectItems = [];
        this.props.sections.forEach(cat => {
            cat.activities.forEach(act => {
                _selectItems.push(<Subheader key={cat.id + "_" + act.id}>{cat.name} / {act.name}</Subheader>);
                act.sections.forEach(sec => {
                    _selectItems.push(<MenuItem key={sec.id} value={sec.id} primaryText={sec.name} />);
                })
            })
        })
        return (
            <Dialog
                open={this.props.open}
                actions={_actions}
                modal={false}
                onRequestClose={this.props.onCancel}>

                <Row>
                    <Col md={12}>
                        <SelectField
                            fullWidth floatingLabelText="Section"
                            errorText={this.state.errors["section"]}
                            value={this.state.order.restriction_section_id}
                            onChange={(event, index, value) => {
                                let _sections = [], _section;
                                __this.props.sections.forEach(x => x.activities.forEach(y => y.sections.forEach(z => _sections.push(z))));
                                let _index = _sections.map(x => x.id).indexOf(value);
                                if (_index > -1) _section = _sections[_index];
                                __this.handle_onUpdate({
                                    ...__this.state.order,
                                    restriction_section_id: value,
                                    section: _section
                                })
                            }}>
                            {_selectItems}
                        </SelectField>
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
                </Row>
                <Row>
                    <Col md={6}>
                        <br />
                        <Toggle
                            label="Carte d'abonnement"
                            labelPosition="right"
                            toggled={this.state.order.is_card}
                            onToggle={(event, toggled) => {
                                __this.handle_onUpdate({
                                    ...__this.state.order,
                                    is_card: toggled,
                                    card_nb_session: (toggled) ? 1 : 0,
                                    restriction_session_max: undefined,
                                    restriction_session_min: undefined
                                })
                            }} />
                    </Col>
                </Row>
                {
                    (this.state.order.is_card) ?
                        <Row>
                            <Col md={12}>
                                <TextField
                                    fullWidth floatingLabelText="Nombre de sessions"
                                    value={(this.state.order.card_nb_session != undefined) ? this.state.order.card_nb_session : ""}
                                    onChange={(event, value) => {
                                        let _value = TryParseInt(value, undefined);
                                        if ((_value != undefined && _value != NaN) || value.trim() == "") {
                                            __this.handle_onUpdate({
                                                ...__this.state.order,
                                                card_nb_session: (value.trim() == "") ? undefined : _value
                                            });
                                        }
                                    }}
                                    onBlur={() => {
                                        if (__this.state.order.card_nb_session == undefined)
                                            __this.handle_onUpdate({
                                                ...__this.state.order,
                                                card_nb_session: 1
                                            });
                                    }} />
                            </Col>
                        </Row>
                        :
                        <Row>
                            <Col md={12}>
                                <br />
                                <Toggle
                                    label="Limiter le nombre de sessions"
                                    labelPosition="right"
                                    toggled={this.state.order.restriction_session_min != undefined || this.state.order.restriction_session_max != undefined}
                                    onToggle={(event, toggled) => {
                                        __this.handle_onUpdate({
                                            ...__this.state.order,
                                            restriction_session_min: (toggled) ? 1 : undefined,
                                            restriction_session_max: (toggled) ? 1 : undefined
                                        })
                                    }}/>
                            </Col>
                            {
                                (this.state.order.restriction_session_min != undefined || this.state.order.restriction_session_max != undefined) ?
                                    <div>
                                        <Col md={6}>
                                            <TextField
                                                fullWidth floatingLabelText="Minimum"
                                                value={(this.state.order.restriction_session_min != undefined) ? this.state.order.restriction_session_min : ""}
                                                onChange={(event, value) => {
                                                    let _value = TryParseInt(value, undefined);
                                                    if ((_value != undefined && _value != NaN) || value.trim() == "") {
                                                        __this.handle_onUpdate({
                                                            ...__this.state.order,
                                                            restriction_session_min: (value.trim() == "") ? undefined : _value,
                                                            restriction_session_max: (__this.state.order.restriction_session_max < _value) ? _value : __this.state.order.restriction_session_max
                                                        });
                                                    }
                                                }}
                                                onBlur={() => {
                                                    if (__this.state.order.restriction_session_min == undefined)
                                                        __this.handle_onUpdate({
                                                            ...__this.state.order,
                                                            restriction_session_min: __this.state.order.restriction_session_max
                                                        });
                                                }} />
                                        </Col>
                                        <Col md={6}>
                                            <TextField
                                                fullWidth floatingLabelText="Maximum"
                                                value={(this.state.order.restriction_session_max != undefined) ? this.state.order.restriction_session_max : ""}
                                                onChange={(event, value) => {
                                                    let _value = TryParseInt(value, undefined);
                                                    if ((_value != undefined && _value != NaN) || value.trim() == "") {
                                                        __this.handle_onUpdate({
                                                            ...__this.state.order,
                                                            restriction_session_max: (value.trim() == "") ? undefined : _value,
                                                            restriction_session_min: (__this.state.order.restriction_session_min > _value) ? _value : __this.state.order.restriction_session_min
                                                        });
                                                    }
                                                }}
                                                onBlur={() => {
                                                    if (__this.state.order.restriction_session_max == undefined)
                                                        __this.handle_onUpdate({
                                                            ...__this.state.order,
                                                            restriction_session_max: __this.state.order.restriction_session_min
                                                        });
                                                }} />
                                        </Col>
                                    </div>
                                    : undefined
                            }
                        </Row>
                }
                <Row>
                    <Col md={12}>
                        <TextField
                            fullWidth floatingLabelText="Tarif (€)"
                            value={(this.state.order.amount != undefined) ? this.state.order.amount : ""}
                            onChange={(event, value) => {
                                let _value = TryParseFloat(value, undefined);
                                if ((_value != undefined && _value != NaN) || value.trim() == "") {
                                    __this.handle_onUpdate({
                                        ...__this.state.order,
                                        amount: (value.trim() == "") ? undefined : _value
                                    });
                                }
                            }}
                            onBlur={() => {
                                if (__this.state.order.amount == undefined)
                                    __this.handle_onUpdate({
                                        ...__this.state.order,
                                        amount: 1
                                    });
                            }} />
                    </Col>
                </Row>
            </Dialog>
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
        sections: state.route_Orders_List.categoryTrees
    };
}

const mapDispatchToProps = (dispatch): IFormProps => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);