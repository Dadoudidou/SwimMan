import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Paper, SelectField, TextField, Subheader, DatePicker, Toggle } from "material-ui";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import { Col, Row, Container } from "react-grid-system";
import { TryParseInt, getCategory } from "./../../../utils";
import SelectCategory from "./SelectCategory";

interface IRestrictionCategoryProps {
    order: ApiModels.OrderAuto
    onUpdate: (order: ApiModels.OrderAuto) => void
    categories?: ApiModels.CategoryTree[]
}

interface IRestrictionCategoryState {
}

class RestrictionCategory extends React.PureComponent<IRestrictionCategoryProps, IRestrictionCategoryState>
{
    constructor(props: IRestrictionCategoryProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IRestrictionCategoryProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IRestrictionCategoryProps, nextState: IRestrictionCategoryState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IRestrictionCategoryProps, prevState: IRestrictionCategoryState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        let firstCategory = getCategory(this.props.categories)
        return (
            <div style={{ padding: "1em", background: (this.props.order.restriction_category == undefined) ? "#eee" : "transparent" }}>
                <Toggle
                    label="Catégorie"
                    toggled={this.props.order.restriction_category != undefined}
                    onToggle={(ev, checked) => {
                        if (checked)
                            __this.props.onUpdate({ ...__this.props.order, restriction_category: firstCategory });
                        else
                            __this.props.onUpdate({ ...__this.props.order, restriction_category: undefined });
                    }} />
                <ExpandTransition open={this.props.order.restriction_category != undefined}>
                    <Row>
                        <Col md={12}>
                            <SelectCategory
                                disabled={this.props.order.restriction_category == undefined}
                                value={this.props.order.restriction_category}
                                onChange={(ev, ind, value) => {
                                    __this.props.onUpdate({
                                        ...__this.props.order,
                                        restriction_category: value
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
const mapStateToProps = (state: IOrdersAutoEditReducer, props: IRestrictionCategoryProps): Partial<IRestrictionCategoryProps> => {
    return {
        categories: state.OrdersAutoEdit.categories
    };
}

export default connect(mapStateToProps)(RestrictionCategory);