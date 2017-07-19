import * as React from "react";
import * as ApiModels from "modules/api/models";
import { TextField } from "material-ui";
import { TryParseFloat, TryParseInt } from "./../helpers/numbers"

interface INumberFieldProps {
    fullWidth?: boolean
    errorText?: React.ReactNode
    floatingLabelText?: string
    disabled?: boolean
    decimal?: boolean
    value?: any
    onChange?: (event, value: number) => void
}

interface INumberFieldState {
}

class NumberField extends React.PureComponent<INumberFieldProps, INumberFieldState>
{
    // set the default props for the class
    static defaultProps: INumberFieldProps = {
        onChange: () => { }
    }

    constructor(props: INumberFieldProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: INumberFieldProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: INumberFieldProps, nextState: INumberFieldState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: INumberFieldProps, prevState: INumberFieldState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        return (
            <TextField
                errorText={this.props.errorText}
                fullWidth={this.props.fullWidth}
                floatingLabelText={this.props.floatingLabelText}
                disabled={this.props.disabled}
                value={this.props.value}
                onChange={(ev, value) => {
                    let _value = (__this.props.decimal) ? TryParseFloat(value, 0) : TryParseInt(value, 0);
                    __this.props.onChange(event, _value);
                }} />
        );
    }
}

export default NumberField;