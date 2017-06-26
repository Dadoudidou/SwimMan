import * as React from "react";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, SelectField, MenuItem, IconButton } from "material-ui";
import * as assign from "object-assign";

export class HeaderColumn<T> {
    key: string
    order?: number

    headerLabel?: React.ReactNode
    headerStyle?: React.CSSProperties

    bodyContent?: (obj: T) => React.ReactNode
    bodyStyle?: React.CSSProperties
        
    width?: number | string
    textAlign?: "left" | "center" | "right"

    filterView?: (column: HeaderColumn<T>, value: any, onChange: (value: any) => void) => React.ReactNode
    hidden?: boolean

    constructor(init: HeaderColumn<T>) {
        assign(this, init);
    }
}

export interface IFilteredTableProps {
    //TABLE
    selectable?: boolean
    onCellClick?: (row: number, column: number) => void
    
    //FILTERED
    columns?: HeaderColumn<any>[]
    elements?: any[]
    filterMode?: boolean
    onChangeFilter?: (filters: { [key: string]: any }) => void
}

interface IFilteredTableState {
    filterCriteria: { [key: string]: any }
}

class FilteredTable extends React.PureComponent<IFilteredTableProps, IFilteredTableState>
{
    constructor(props: IFilteredTableProps) {
        super(props);
        this.state = {
            filterCriteria: {}
        };
    }

    sortColumns(a: HeaderColumn<any>, b: HeaderColumn<any>): number {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
    }

    handle_onChangeFilter(col: HeaderColumn<any>, value: any) {
        let __this = this;
        this.setState({
            ...this.state,
            filterCriteria: {
                ...this.state.filterCriteria,
                [col.key]: value
            }
        }, () => {
            if (__this.props.onChangeFilter)
                __this.props.onChangeFilter(__this.state.filterCriteria);
        });
    }

    render() {
        let __this = this;
        let _cols = this.props.columns.filter(x => !x.hidden).sort(this.sortColumns);

        return (
            <Table
                selectable={this.props.selectable}
                onCellClick={this.props.onCellClick}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        {_cols.map(col => {
                            return (
                                <TableHeaderColumn
                                    key={col.key}
                                    style={{
                                        width: col.width,
                                        textAlign: col.textAlign || "left",
                                        ...col.headerStyle
                                    }}>

                                    {
                                        (__this.props.filterMode) ?
                                            col.filterView(
                                                col,
                                                __this.state.filterCriteria[col.key],
                                                (value) => { __this.handle_onChangeFilter(col, value) })
                                            : col.headerLabel
                                    }

                                </TableHeaderColumn>
                            );
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover>
                    {this.props.elements.map(element => {
                        return (
                            <TableRow key={element.id} style={{ cursor: "pointer" }}>
                                {_cols.map(col => {
                                    return (
                                        <TableRowColumn
                                            key={col.key}
                                            style={{
                                                width: col.width,
                                                textAlign: col.textAlign || "left",
                                                ...col.bodyStyle
                                            }}>
                                            {col.bodyContent(element)}
                                        </TableRowColumn>
                                    );
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                </TableFooter>
            </Table>
        );
    }
}

export default FilteredTable;