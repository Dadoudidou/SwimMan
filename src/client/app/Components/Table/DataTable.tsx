import * as React from "react"
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
    withStyles, WithStyles
} from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"
import { classNames } from "modules/classnames"

export type HeaderColumn = {
    /** Texte de l'entête */
    Header: React.ReactNode
    /** class de la cellule d'entete */
    headerClassName?: string
    /** Ordre d'affichage de la colonne */
    order?: number
    /** Acceseur à la donnée */
    Data: (data: any) => React.ReactNode
    /** classe de la cellule de donnée */
    dataClassName?: string
    /** Fonction pour filtrer */
    filterMethod?: (data: any, filter: any, rows: any) => boolean
    /** Entete en mode filtre */
    Filter?: (column: HeaderColumn, onChange) => React.ReactNode
    /** id */
    id: string
    /** largeur de la colonne */
    width?: number
    /** colonne visible */
    visible?: boolean
    /** si une valeur est numérique */
    isNumeric?: boolean
}

type TStyle = "rowDense" | "cell"

const styles: StyleRulesCallback<TStyle> = theme => ({
    rowDense: {
        height: (theme.typography.fontSize as number) * 2
    },
    cell: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit
    }
})

type DataTableProps = {
    data: any[]
    filterable?: boolean
    hoverable?: boolean
    dense?: boolean
    columns: HeaderColumn[]
    onRowClick?: (event: React.MouseEvent<HTMLTableRowElement>, data: any) => void
    onCellClick?: (event: React.MouseEvent<HTMLTableCellElement>, data: any, col: HeaderColumn) => void
}

type DataTableState = {}

class DataTable extends React.PureComponent<DataTableProps & WithStyles<TStyle>, DataTableState>
{
    static defaultProps: Partial<DataTableProps> = {
        onRowClick: () => {},
        onCellClick: () => {}
    }
    render(){
        let _cols = this.props.columns
            .filter(col => (col.visible == undefined) ? true : col.visible)
            .sort((a, b) => { 
                let _a = a.order || 0;
                let _b = b.order || 0;
                if(_a < _b) return -1;
                if(_a > _b) return 1;
                return 0;
             });

        let _datas = this.props.data;
        return (
            <Table>
                <TableHead>
                    <TableRow >
                        {_cols.map((col, index) => {
                            let _style: React.CSSProperties = {};
                            if(col.width) {
                                _style.width = col.width;
                                //_style.paddingLeft = 0;
                                //_style.paddingRight = 0;
                            }
                            return (
                                <TableCell 
                                    key={col.id}
                                    className={classNames(this.props.classes.cell, col.headerClassName)}
                                    style={_style}>
                                    {col.Header}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_datas.map(data => {
                        return (
                            <TableRow 
                                key={data.id}
                                hover={this.props.hoverable}
                                onClick={(ev) => { this.props.onRowClick(ev, data); }}
                                className={classNames({
                                    [this.props.classes.rowDense]: this.props.dense
                                })}>
                            {_cols.map((col, index) => {
                                let _style: React.CSSProperties = {};
                                if(col.width) {
                                    _style.width = col.width;
                                    _style.paddingLeft = 0;
                                    _style.paddingRight = 0;
                                }
                                return (
                                    <TableCell 
                                        key={col.id}
                                        className={classNames(this.props.classes.cell, col.dataClassName)}
                                        onClick={(ev) => { this.props.onCellClick(ev, data, col); }}>
                                        {col.Data(data)}
                                    </TableCell>
                                )
                            })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }
}

export default withStyles(styles)<DataTableProps>(DataTable);