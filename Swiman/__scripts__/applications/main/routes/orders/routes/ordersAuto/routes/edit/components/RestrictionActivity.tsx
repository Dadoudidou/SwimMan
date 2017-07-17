import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Paper, SelectField, TextField, Subheader, DatePicker, Toggle } from "material-ui";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import { Col, Row, Container } from "react-grid-system";
import { TryParseInt, getActivity } from "./../../../utils";
import SelectActivity from "./SelectActivity";

interface IRestrictionActivityProps {
    order: ApiModels.OrderAuto
    onUpdate: (order: ApiModels.OrderAuto) => void
    categories?: ApiModels.CategoryTree[]
}

interface IRestrictionActivityState {
}

class RestrictionActivity extends React.PureComponent<IRestrictionActivityProps, IRestrictionActivityState>
{
    constructor(props: IRestrictionActivityProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IRestrictionActivityProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IRestrictionActivityProps, nextState: IRestrictionActivityState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IRestrictionActivityProps, prevState: IRestrictionActivityState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        let _firstActivity: ApiModels.Activity = getActivity(this.props.categories);

        return (
            <div style={{ padding: "1em", background: (this.props.order.restriction_activity == undefined) ? "#eee" : "transparent" }}>
                <Toggle
                    label="Activité"
                    toggled={this.props.order.restriction_activity != undefined}
                    onToggle={(ev, checked) => {
                        if (checked)
                            __this.props.onUpdate({ ...__this.props.order, restriction_activity: _firstActivity });
                        else
                            __this.props.onUpdate({ ...__this.props.order, restriction_activity: undefined });
                    }} />
                <ExpandTransition open={this.props.order.restriction_activity != undefined}>
                    <Row>
                        <Col md={12}>
                            <SelectActivity
                                disabled={this.props.order.restriction_activity == undefined}
                                value={this.props.order.restriction_activity}
                                onChange={(ev, ind, value) => {
                                    __this.props.onUpdate({
                                        ...__this.props.order,
                                        restriction_activity: value
                                    })
                                }} />
                        </Col>
                    </Row>
                </ExpandTransition>
            </div>
        );
    }
}

import { IOrdersAutoEditReducer } from "./../sync";
import { connect } from "react-redux";
const mapStateToProps = (state: IOrdersAutoEditReducer, props: IRestrictionActivityProps): Partial<IRestrictionActivityProps> => {
    return {
        categories: state.OrdersAutoEdit.categories
    };
}

export default connect(mapStateToProps)(RestrictionActivity);