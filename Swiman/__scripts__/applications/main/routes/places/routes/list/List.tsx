import * as React from "react";
import * as ApiModels from "modules/api/models";
import {
    Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
    RaisedButton, FlatButton, Paper, IconButton,
    SelectField, MenuItem, DropDownMenu, TextField, FontIcon, Toggle
} from "material-ui";
import { Col, Row, Container } from "react-grid-system";
import { push } from "react-router-redux";
import * as moment from "moment"

import { PageTitle } from "applications/main/components";



class HeaderColumn {
    code: string
    label: string
    getMemberValue: (item?: ApiModels.Place) => string
    order?: number
    width?: number | string
    getFilterMode?: (col: HeaderColumn, value: any, onChange: (value: any) => void) => React.ReactNode
    constructor(init: HeaderColumn) {
        this.code = init.code;
        this.label = init.label;
        this.getMemberValue = init.getMemberValue;
        this.order = init.order;
        this.width = init.width;
        this.getFilterMode = init.getFilterMode;
    }
}

interface IListProps {
    places?: ApiModels.Place[]
    onInit?: () => void
    onSelect?: (place: ApiModels.Place) => void
}

interface IListState {
    colonnes?: HeaderColumn[],
    allColonnes?: HeaderColumn[],
}



class List extends React.PureComponent<IListProps, IListState>
{
    static defaultProps: IListProps = {
        places: [],
        onInit: () => { },
        onSelect: () => { }
    }

    constructor(props: IListProps ) {
        super(props);
        let __this = this;
        let _colonnes = [
            new HeaderColumn({
                order: 1, code: "name", label: "Nom",
                getMemberValue: (x) => x.name,
                getFilterMode: (col, value, onchange) => {
                    return <TextField hintText={col.label} fullWidth
                        value={value ? value : ""} onChange={(ev) => { onchange((ev.target as any).value); }} />
                }
            }),
            new HeaderColumn({
                order: 2, code: "adress", label: "Adresse",
                getMemberValue: (x) => x.adress,
                getFilterMode: (col, value, onchange) => {
                    return <TextField hintText={col.label} fullWidth
                        value={value ? value : ""} onChange={(ev) => { onchange((ev.target as any).value); }} />
                }
            }),
            new HeaderColumn({
                order: 3, code: "postalcode", label: "code postal", width: 100,
                getMemberValue: (x) => x.postalcode,
                getFilterMode: (col, value, onchange) => {
                    return <TextField hintText={col.label} fullWidth
                        value={value ? value : ""} onChange={(ev) => { onchange((ev.target as any).value); }} />
                }
            }),
            new HeaderColumn({
                order: 4, code: "city", label: "Ville", width: 255,
                getMemberValue: (x) => x.city,
                getFilterMode: (col, value, onchange) => {
                    return <TextField hintText={col.label} fullWidth
                        value={value ? value : ""} onChange={(ev) => { onchange((ev.target as any).value); }} />
                }
            }),
        ];
        this.state = {
            colonnes: [_colonnes[0], _colonnes[1], _colonnes[2], _colonnes[3]],
            allColonnes: _colonnes
        };
        this.handle_onChangeColumns = this.handle_onChangeColumns.bind(this);
    }

    componentWillMount() {
        this.props.onInit();
    }

    handle_onRowClick(item?: ApiModels.Place) {
        this.props.onSelect(item);
    }

    render() {
        return (
            <div>
                <PageTitle
                    label={<span><i className="fa fa-map-marker" /> Lieux</span>}
                    actions={
                        <div style={{ textAlign: "right" }}>
                            <FlatButton label="Nouveau lieu" href="#/places/add" />
                        </div>
                    } />
                <Row>
                    <Col md={4}>
                    </Col>
                    <Col md={8}>
                        {this.renderNavigation()}
                    </Col>
                </Row>
                <Paper zDepth={1}>
                    {this.renderTable()}
                </Paper>
            </div>
        );
    }




    //#region RENDER NAVIGATION

    handle_onChangeColumns(event, index, values) {
        this.setState({
            ...this.state,
            colonnes: values
        });
    }

    sortColumns(a: HeaderColumn, b: HeaderColumn): number {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
    }

    renderNavigation() {
        let __this = this;
        return (
            <div style={{ textAlign: "right" }}>
                <SelectField multiple autoWidth
                    style={{ width: "8em" }}
                    hintText="Colonnes" selectionRenderer={(values) => { return "Colonnes"; }}
                    labelStyle={{ textAlign: "left" }}
                    value={this.state.colonnes} onChange={this.handle_onChangeColumns} >
                    {this.state.allColonnes.map(col => {
                        return (
                            <MenuItem
                                key={col.code}
                                insetChildren
                                primaryText={col.label}
                                value={col}
                                checked={__this.state.colonnes && __this.state.colonnes.map(x => x.code).indexOf(col.code) > -1} />
                        )
                    })}
                </SelectField>
            </div>
        );
    }

    //#endregion


    renderTable() {
        let __this = this;
        let _cols = [...this.state.colonnes].sort(this.sortColumns);

        return (
            <Table
                selectable={true}
                onCellClick={(row, column) => { __this.handle_onRowClick(__this.props.places[row]); }}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        {_cols.map(col => {
                            return (
                                <TableHeaderColumn
                                    key={col.code}
                                    style={{
                                        width: col.width
                                    }}>
                                    {col.label}
                                </TableHeaderColumn>
                            );
                        })}

                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover>
                    {this.props.places.map((member) => {
                        return (
                            <TableRow key={member.id} style={{ cursor: "pointer" }}>
                                {_cols.map(col => {
                                    return (
                                        <TableRowColumn
                                            key={col.code}
                                            style={{
                                                width: col.width
                                            }}>
                                            {col.getMemberValue(member)}
                                        </TableRowColumn>
                                    );
                                })}

                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                </TableFooter>
            </Table>
        );
    }
}

import { connect } from "react-redux";
import { getStore } from "modules/redux";
import { IPlaces_Reducer } from "./../../reducer";
import { IApp_Reducer } from "applications/main/reducer";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../../constants";

interface IState extends IPlaces_Reducer, IApp_Reducer { }

const mapStateToProps = (state: IState): IListProps => {
    return {
        places: state.route_Places.places
    };
}

const mapDispatchToProps = (dispatch): IListProps => {
    return {
        onInit: () => {
            dispatch(ApiActions.activities.GetPlaces({
                request_id: Constants.search_places,
                Request: {  }
            }))
        },
        onSelect: (place) => {
            dispatch(push("/places/" + place.id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);