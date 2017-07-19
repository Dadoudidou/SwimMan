import * as React from "react";
import * as ApiModels from "modules/api/models";

import { SelectField, MenuItem, Subheader } from "material-ui"

import { getSection } from "./../helpers/activities";

export interface ISelectSectionProps {
    categories?: ApiModels.CategoryTree[]
    errorText?: React.ReactNode
    allText?: string
    allValue?: any
    value?: ApiModels.Section
    disabled?: boolean
    onChange?: (event, index: number, value: ApiModels.Section) => void
}

interface ISelectSectionState {
}

class SelectSection extends React.PureComponent<ISelectSectionProps, ISelectSectionState>
{
    // set the default props for the class
    static defaultProps: ISelectSectionProps = {
        categories: [],
        onChange: () => { }
    }

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
        if (this.props.allText) {
            _items.push(<MenuItem key="all" primaryText={this.props.allText} value={null} />)
        }
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

        let _label = "Section";
        if (this.props.allText)
            _label = this.props.value ? _label : " "


        return (
            <SelectField floatingLabelText={_label} fullWidth
                errorText={this.props.errorText}
                disabled={this.props.disabled}
                value={(this.props.value) ? this.props.value.id : null}
                onChange={(event, index, value) => {
                    if (!value)
                        __this.props.onChange(event, index, value);
                    else
                        __this.props.onChange(event, index, getSection(__this.props.categories, value));
                }}>
                {_items}
            </SelectField>
        );
    }
}

export default SelectSection;