import * as React from "react";
import { SelectField, MenuItem } from "material-ui";

import { HeaderColumn } from "./FilteredTable"

export interface IFilteredColumnsDropdownProps {
    columns: HeaderColumn<any>[]
    onChange: (columns: HeaderColumn<any>[]) => void
}

interface IFilteredColumnsDropdownState {
}

class FilteredColumnsDropdown extends React.PureComponent<IFilteredColumnsDropdownProps, IFilteredColumnsDropdownState>
{
    constructor(props: IFilteredColumnsDropdownProps) {
        super(props);
        this.state = {
        };
        this.handle_onChangeColumns = this.handle_onChangeColumns.bind(this);
    }

    sortColumns(a: HeaderColumn<any>, b: HeaderColumn<any>): number {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
    }

    handle_onChangeColumns(event, index, values: HeaderColumn<any>[]) {
        if (this.props.onChange)
            this.props.onChange(this.props.columns.map(col => {
                let _index = values.map(x => x.key).indexOf(col.key);
                if (_index > -1) {
                    return {
                        ...values[_index],
                        hidden: false
                    }
                } else {
                    return {
                        ...col,
                        hidden: true
                    }
                }
            }));
    }

    render() {
        let __this = this;
        let _selectedColumns = this.props.columns.filter(x => !x.hidden).sort(this.sortColumns);
        return (
            <SelectField multiple autoWidth
                style={{ width: "8em" }}
                hintText="Colonnes"
                selectionRenderer={(values) => { return "Colonnes"; }}
                labelStyle={{ textAlign: "left" }}
                value={_selectedColumns}
                onChange={this.handle_onChangeColumns} >

                {this.props.columns.map(col => {
                    return (
                        <MenuItem
                            key={col.key}
                            insetChildren
                            primaryText={col.headerLabel}
                            value={col}
                            checked={_selectedColumns.map(x => x.key).indexOf(col.key) > -1} />
                    )
                })}

            </SelectField>
        );
    }
}

export default FilteredColumnsDropdown;