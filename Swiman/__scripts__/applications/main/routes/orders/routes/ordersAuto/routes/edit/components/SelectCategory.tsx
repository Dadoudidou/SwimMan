import * as React from "react";
import * as ApiModels from "modules/api/models";
import { SelectField, MenuItem } from "material-ui";
import { getCategory } from "./../../../utils";

interface ISelectProps {
    disabled?: boolean
    value: ApiModels.Category
    onChange: (event, index: number, value: ApiModels.Category) => void
}

interface ISelectCategoryProps extends ISelectProps {
    
    categories?: ApiModels.CategoryTree[]
}

interface ISelectCategoryState {
}

class SelectCategory extends React.PureComponent<ISelectCategoryProps, ISelectCategoryState>
{
    
    constructor(props: ISelectCategoryProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ISelectCategoryProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ISelectCategoryProps, nextState: ISelectCategoryState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ISelectCategoryProps, prevState: ISelectCategoryState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        return (
            <SelectField floatingLabelText="Opérateur" fullWidth
                disabled={this.props.disabled}
                value={(this.props.value) ? this.props.value.id : undefined}
                onChange={(event, index, value) => {
                    __this.props.onChange(event, index, getCategory(__this.props.categories, value));
                }}>
                {this.props.categories.map(category => {
                    return (
                        <MenuItem key={category.id} primaryText={category.name} value={category.id} />
                    );
                })}
            </SelectField>
        );
    }
}

import { IOrdersAutoEditReducer } from "./../sync";
import { connect } from "react-redux";
const mapStateToProps = (state: IOrdersAutoEditReducer, props: ISelectProps): Partial<ISelectCategoryProps> => {
    return {
        categories: state.OrdersAutoEdit.categories
    };
}

export default connect(mapStateToProps)(SelectCategory);