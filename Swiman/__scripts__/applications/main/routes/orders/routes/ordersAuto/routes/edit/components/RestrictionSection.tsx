import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Paper, SelectField, TextField, Subheader, DatePicker, Toggle } from "material-ui";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import { Col, Row, Container } from "react-grid-system";
import { TryParseInt, getSection } from "./../../../utils";
import SelectSection from "./SelectSection";

interface IRestrictionSectionProps {
    order: ApiModels.OrderAuto
    onUpdate: (order: ApiModels.OrderAuto) => void
    categories?: ApiModels.CategoryTree[]
}

interface IRestrictionSectionState {
}

class RestrictionSection extends React.PureComponent<IRestrictionSectionProps, IRestrictionSectionState>
{
    constructor(props: IRestrictionSectionProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IRestrictionSectionProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IRestrictionSectionProps, nextState: IRestrictionSectionState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IRestrictionSectionProps, prevState: IRestrictionSectionState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        let _firstSection: ApiModels.Section = getSection(this.props.categories);

        return (
            <div style={{ padding: "1em", background: (this.props.order.restriction_section == undefined) ? "#eee" : "transparent" }}>
                <Toggle
                    label="Section"
                    toggled={this.props.order.restriction_section != undefined}
                    onToggle={(ev, checked) => {
                        if (checked)
                            __this.props.onUpdate({ ...__this.props.order, restriction_section: _firstSection });
                        else
                            __this.props.onUpdate({ ...__this.props.order, restriction_section: undefined });
                    }} />
                <ExpandTransition open={this.props.order.restriction_section != undefined}>
                    <Row>
                        <Col md={12}>
                            <SelectSection
                                disabled={this.props.order.restriction_section == undefined}
                                value={this.props.order.restriction_section}
                                onChange={(ev, ind, value) => {
                                    __this.props.onUpdate({
                                        ...__this.props.order,
                                        restriction_section: value
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
const mapStateToProps = (state: IOrdersAutoEditReducer, props: IRestrictionSectionProps): Partial<IRestrictionSectionProps> => {
    return {
        categories: state.OrdersAutoEdit.categories
    };
}

export default connect(mapStateToProps)(RestrictionSection);