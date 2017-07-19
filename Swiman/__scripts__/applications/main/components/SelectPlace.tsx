import * as React from "react";
import * as ApiModels from "modules/api/models";

import { SelectField, MenuItem, Subheader } from "material-ui"

import { getSection } from "./../helpers/activities";

export interface ISelectPlaceProps {
    places?: ApiModels.Place[]
    errorText?: React.ReactNode
    allText?: string
    value?: ApiModels.Place
    disabled?: boolean
    onChange?: (event, index: number, value: ApiModels.Place) => void
}

interface ISelectPlaceState {
}

class SelectPlace extends React.PureComponent<ISelectPlaceProps, ISelectPlaceState>
{
    // set the default props for the class
    static defaultProps: ISelectPlaceProps = {
        places: [],
        onChange: () => { }
    }

    constructor(props: ISelectPlaceProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: ISelectPlaceProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: ISelectPlaceProps, nextState: ISelectPlaceState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: ISelectPlaceProps, prevState: ISelectPlaceState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;

        let _items = [];
        if (this.props.allText) {
            _items.push(<MenuItem key="all" primaryText={this.props.allText} value={null} />)
        }
        this.props.places.forEach(place => {
            _items.push(
                <MenuItem key={place.id} value={place.id} primaryText={place.name} />
            );
        })

        let _label = "Lieu";
        if (this.props.allText)
            _label = this.props.value ? _label : " "

        return (
            <SelectField
                fullWidth
                errorText={this.props.errorText}
                floatingLabelText={_label}
                value={(this.props.value) ? this.props.value.id : null}
                onChange={(event, index, value) => {
                    let _index = index;
                    if (__this.props.allText) _index += 1;
                    if(value)
                        __this.props.onChange(event, index, __this.props.places[index]);
                    else
                        __this.props.onChange(event, index, value);
                }}>
                {this.props.places.map(place => {
                    return <MenuItem key={place.id} value={place.id} primaryText={place.name} />
                })}
            </SelectField>
        );
    }
}

export default SelectPlace;