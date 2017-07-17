import * as React from "react";
import * as ApiModels from "modules/api/models";
import { SelectField, MenuItem } from "material-ui";

interface ISelectOperatorsProps {
    disabled?: boolean
    value: string
    onChange: (event, index: number, value: string) => void
}

interface ISelectOperatorsState {
}

class SelectOperators extends React.PureComponent<ISelectOperatorsProps, ISelectOperatorsState>
{
    
    constructor(props: ISelectOperatorsProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ISelectOperatorsProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ISelectOperatorsProps, nextState: ISelectOperatorsState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ISelectOperatorsProps, prevState: ISelectOperatorsState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        return (
            <SelectField floatingLabelText="Opérateur" fullWidth
                disabled={this.props.disabled}
                value={this.props.value}
                onChange={this.props.onChange}>
                <MenuItem primaryText="Egal à" value="==" />
                <MenuItem primaryText="Différent de" value="!=" />
                <MenuItem primaryText="Inférieur à" value="<" />
                <MenuItem primaryText="Inférieur et égal à" value="<=" />
                <MenuItem primaryText="Supérieur à" value=">" />
                <MenuItem primaryText="Supérieur et égal à" value=">=" />
            </SelectField>
        );
    }
}

export default SelectOperators;