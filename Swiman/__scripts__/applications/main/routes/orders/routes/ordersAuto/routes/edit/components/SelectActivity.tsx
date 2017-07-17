import * as React from "react";
import * as ApiModels from "modules/api/models";
import { SelectField, MenuItem, Subheader } from "material-ui";
import { getActivity } from "./../../../utils";

interface ISelectProps {
    disabled?: boolean
    value: ApiModels.Activity
    onChange: (event, index: number, value: ApiModels.Activity) => void
}

interface ISelectActivityProps extends ISelectProps {
    
    categories?: ApiModels.CategoryTree[]
}

interface ISelectActivityState {
}

class SelectActivity extends React.PureComponent<ISelectActivityProps, ISelectActivityState>
{
    
    constructor(props: ISelectActivityProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ISelectActivityProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ISelectActivityProps, nextState: ISelectActivityState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ISelectActivityProps, prevState: ISelectActivityState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        let _items = [];
        this.props.categories.forEach(category => {
            _items.push(<Subheader key={category.id}>{category.name}</Subheader>)
            category.activities.forEach(activity => {
                _items.push(
                    <MenuItem key={activity.id} primaryText={activity.name} value={activity.id} />
                )
            })
        })

        return (
            <SelectField floatingLabelText="Opérateur" fullWidth
                disabled={this.props.disabled}
                value={(this.props.value) ? this.props.value.id : undefined}
                onChange={(event, index, value) => {
                    __this.props.onChange(event, index, getActivity(__this.props.categories, value))
                }}>
                {_items}
            </SelectField>
        );
    }
}

import { IOrdersAutoEditReducer } from "./../sync";
import { connect } from "react-redux";
const mapStateToProps = (state: IOrdersAutoEditReducer, props: ISelectProps): Partial<ISelectActivityProps> => {
    return {
        categories: state.OrdersAutoEdit.categories
    };
}

export default connect(mapStateToProps)(SelectActivity);