import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Paper, SelectField, TextField, Subheader, DatePicker, Toggle } from "material-ui";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import { Col, Row, Container } from "react-grid-system";
import { TryParseInt } from "./../../../utils";
import SelectOperator from "./SelectOperators";

interface IRestrictionAdhesionsProps {
    order: ApiModels.OrderAuto
    onUpdate: (order: ApiModels.OrderAuto) => void
}

interface IRestrictionAdhesionsState {
}

class RestrictionAdhesions extends React.PureComponent<IRestrictionAdhesionsProps, IRestrictionAdhesionsState>
{
    constructor(props: IRestrictionAdhesionsProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IRestrictionAdhesionsProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IRestrictionAdhesionsProps, nextState: IRestrictionAdhesionsState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IRestrictionAdhesionsProps, prevState: IRestrictionAdhesionsState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        return (
            <div style={{ padding: "1em", background: (this.props.order.restriction_adhesion_nb == undefined) ? "#eee" : "transparent" }}>
                <Toggle
                    label="Nombre d'adhésions"
                    toggled={this.props.order.restriction_adhesion_nb != undefined}
                    onToggle={(ev, checked) => {
                        if (checked)
                            __this.props.onUpdate({ ...__this.props.order, restriction_adhesion_nb: 1, restriction_adhesion_nb_operator: "==" });
                        else
                            __this.props.onUpdate({ ...__this.props.order, restriction_adhesion_nb: undefined, restriction_adhesion_nb_operator: undefined });
                    }} />
                <ExpandTransition open={this.props.order.restriction_adhesion_nb != undefined}>
                    <Row>
                        <Col md={6}>
                            <SelectOperator
                                disabled={this.props.order.restriction_adhesion_nb == undefined}
                                value={this.props.order.restriction_adhesion_nb_operator}
                                onChange={(ev, ind, value) => {
                                    __this.props.onUpdate({
                                        ...__this.props.order,
                                        restriction_adhesion_nb_operator: value
                                    })
                                }} />
                        </Col>
                        <Col md={6}>
                            <TextField fullWidth floatingLabelText="Nombre d'adhérents"
                                disabled={this.props.order.restriction_adhesion_nb == undefined}
                                value={(this.props.order.restriction_adhesion_nb) ? this.props.order.restriction_adhesion_nb : ""}
                                onChange={(ev, value) => {
                                    __this.props.onUpdate({
                                        ...__this.props.order,
                                        restriction_adhesion_nb: TryParseInt(value, 0)
                                    })
                                }} />
                        </Col>
                    </Row>
                </ExpandTransition>
            </div>
        );
    }
}

export default RestrictionAdhesions;