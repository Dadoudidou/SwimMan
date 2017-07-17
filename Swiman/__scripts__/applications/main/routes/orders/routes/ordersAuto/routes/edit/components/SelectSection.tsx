import * as React from "react";
import * as ApiModels from "modules/api/models";
import { SelectField, MenuItem, Subheader } from "material-ui";
import { getSection } from "./../../../utils";

interface ISelectProps {
    disabled?: boolean
    value: ApiModels.Section
    onChange: (event, index: number, value: ApiModels.Section) => void
}

interface ISelectSectionProps extends ISelectProps {
    
    categories?: ApiModels.CategoryTree[]
}

interface ISelectSectionState {
}

class SelectSection extends React.PureComponent<ISelectSectionProps, ISelectSectionState>
{
    
    constructor(props: ISelectSectionProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ISelectSectionProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ISelectSectionProps, nextState: ISelectSectionState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ISelectSectionProps, prevState: ISelectSectionState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        let _items = [];
        this.props.categories.forEach(category => {
            category.activities.forEach(activity => {
                _items.push(<Subheader key={category.id + "." + activity.id}>{category.name}/{activity.name}</Subheader>)
                activity.sections.forEach(section => {
                    _items.push(
                        <MenuItem key={section.id} primaryText={section.name} value={section.id} />
                    )
                })
            })
        })

        return (
            <SelectField floatingLabelText="Opérateur" fullWidth
                disabled={this.props.disabled}
                value={(this.props.value) ? this.props.value.id : undefined}
                onChange={(event, index, value) => {
                    __this.props.onChange(event, index, getSection(__this.props.categories, value));
                }}>
                {_items}
            </SelectField>
        );
    }
}

import { IOrdersAutoEditReducer } from "./../sync";
import { connect } from "react-redux";
const mapStateToProps = (state: IOrdersAutoEditReducer, props: ISelectProps): Partial<ISelectSectionProps> => {
    return {
        categories: state.OrdersAutoEdit.categories
    };
}

export default connect(mapStateToProps)(SelectSection);