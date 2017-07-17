import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Paper, SelectField, TextField, Subheader, DatePicker, Toggle, List, ListItem, RadioButton, RadioButtonGroup, MenuItem } from "material-ui";
import { Col, Row, Container } from "react-grid-system";
import { TryParseFloat } from "./../../../utils";

interface IAmountProps {
    order: ApiModels.OrderAuto
    onUpdate: (order: ApiModels.OrderAuto) => void
}

interface IAmountState {
}

class Amount extends React.PureComponent<IAmountProps, IAmountState>
{


    constructor(props: IAmountProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IAmountProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IAmountProps, nextState: IAmountState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IAmountProps, prevState: IAmountState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    updateTarif(order: ApiModels.OrderAuto) {
        let _tarif = (this.props.order.action_amount != undefined) ? this.props.order.action_amount :
            (this.props.order.action_amount_pourcent != undefined) ? this.props.order.action_amount_pourcent :
                (this.props.order.action_amount_fix != undefined) ? this.props.order.action_amount_fix :
                    0;

    }

    getActionProp() {
        return (this.props.order.action_amount != undefined) ? "action_amount" :
            (this.props.order.action_amount_pourcent != undefined) ? "action_amount_pourcent" :
                (this.props.order.action_amount_fix != undefined) ? "action_amount_fix" :
                    "action_amount";
    }

    getApplyProp() {
        return (this.props.order.apply_on_member) ? "apply_on_member" :
            (this.props.order.apply_on_adhesion) ? "apply_on_adhesion" :
                "apply_on_member";
    }

    getTarifValue() {
        return (this.props.order.action_amount != undefined) ? this.props.order.action_amount :
            (this.props.order.action_amount_pourcent != undefined) ? this.props.order.action_amount_pourcent :
                (this.props.order.action_amount_fix != undefined) ? this.props.order.action_amount_fix :
                    undefined;
    }

    render() {
        let __this = this;
        let _tarif = this.getTarifValue();
        let _typeSelectValue = this.getActionProp();
        let _applySelectValue = this.getApplyProp();
        return (
            <div>
                <Row>
                    <Col md={12}>
                        <TextField fullWidth floatingLabelText="Tarif (euros)"
                            value={_tarif}
                            onChange={(event, value) => {
                                let _action = __this.getActionProp();
                                let _value = TryParseFloat(value, undefined);
                                let _order: ApiModels.OrderAuto = {
                                    ...this.props.order,
                                    action_amount: undefined,
                                    action_amount_fix: undefined,
                                    action_amount_pourcent: undefined
                                };
                                _order[_action] = _value;
                                __this.props.onUpdate(_order);
                            }} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <SelectField fullWidth floatingLabelText="Type de tarif"
                            value={_typeSelectValue}
                            onChange={(event, index, value) => {
                                let _value = __this.getTarifValue();
                                let _order: ApiModels.OrderAuto = {
                                    ...this.props.order,
                                    action_amount: undefined,
                                    action_amount_fix: undefined,
                                    action_amount_pourcent: undefined
                                };
                                _order[value] = _value;
                                __this.props.onUpdate(_order);
                            }}>
                            <MenuItem primaryText="Tarif relatif" value="action_amount" />
                            <MenuItem primaryText="Pourcentage" value="action_amount_pourcent" />
                        </SelectField>
                    </Col>
                    <Col md={6}>
                        <SelectField fullWidth floatingLabelText="Appliquer le tarif"
                            value={_applySelectValue}
                            onChange={(event, index, value) => {
                                let _order: ApiModels.OrderAuto = {
                                    ...this.props.order,
                                    apply_on_adhesion: false,
                                    apply_on_family: false,
                                    apply_on_member: false
                                };
                                _order[value] = true;
                                __this.props.onUpdate(_order);
                            }}>
                            <MenuItem primaryText="A l'adhérent" value="apply_on_member" />
                            <MenuItem primaryText="A l'adhésion" value="apply_on_adhesion" />
                        </SelectField>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Amount;