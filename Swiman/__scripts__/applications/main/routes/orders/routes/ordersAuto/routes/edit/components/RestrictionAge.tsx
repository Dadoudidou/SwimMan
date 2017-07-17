import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Paper, SelectField, TextField, Subheader, DatePicker, Toggle } from "material-ui";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import { Col, Row, Container } from "react-grid-system";
import { TryParseInt } from "./../../../utils";
import SelectOperator from "./SelectOperators";

interface IRestrictionAgeProps {
    order: ApiModels.OrderAuto
    onUpdate: (order: ApiModels.OrderAuto) => void
}

interface IRestrictionAgeState {
}

class RestrictionAge extends React.PureComponent<IRestrictionAgeProps, IRestrictionAgeState>
{
    constructor(props: IRestrictionAgeProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IRestrictionAgeProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IRestrictionAgeProps, nextState: IRestrictionAgeState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IRestrictionAgeProps, prevState: IRestrictionAgeState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        return (
            <div style={{ padding: "1em", background: (this.props.order.restriction_age == undefined) ? "#eee" : "transparent" }}>
                <Toggle
                    label="Âge"
                    toggled={this.props.order.restriction_age != undefined}
                    onToggle={(ev, checked) => {
                        if (checked)
                            __this.props.onUpdate({ ...__this.props.order, restriction_age: 10, restriction_age_operator: "==" });
                        else
                            __this.props.onUpdate({ ...__this.props.order, restriction_age: undefined, restriction_age_operator: undefined });
                    }} />
                <ExpandTransition open={this.props.order.restriction_age != undefined}>
                    <Row>
                        <Col md={6}>
                            <SelectOperator
                                disabled={this.props.order.restriction_age == undefined}
                                value={this.props.order.restriction_age_operator}
                                onChange={(ev, ind, value) => {
                                    __this.props.onUpdate({
                                        ...__this.props.order,
                                        restriction_age_operator: value
                                    })
                                }} />
                        </Col>
                        <Col md={6}>
                            <TextField fullWidth floatingLabelText="âge"
                                disabled={this.props.order.restriction_age == undefined}
                                value={(this.props.order.restriction_age) ? this.props.order.restriction_age : ""}
                                onChange={(ev, value) => {
                                    __this.props.onUpdate({
                                        ...__this.props.order,
                                        restriction_age: TryParseInt(value, 0)
                                    })
                                }} />
                        </Col>
                    </Row>
                </ExpandTransition>
            </div>
        );
    }
}

export default RestrictionAge;