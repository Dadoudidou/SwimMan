import * as React from "react"
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel
} from "material-ui"

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

class DataTable extends React.PureComponent<DataTableProps, DataTableState>
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
                            if(col.width) _style.width = col.width;
                            return (
                                <TableCell 
                                    key={col.id}
                                    className={col.headerClassName}
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
                                onClick={(ev) => { this.props.onRowClick(ev, data); }}>
                            {_cols.map((col, index) => {
                                let _style: React.CSSProperties = {};
                                if(col.width) _style.width = col.width;
                                return (
                                    <TableCell 
                                        key={col.id}
                                        className={col.dataClassName}
                                        style={_style}
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

export default DataTable;