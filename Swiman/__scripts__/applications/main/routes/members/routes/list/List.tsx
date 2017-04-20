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
    getMemberValue: (member?: ApiModels.Member) => string
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
    members?: ApiModels.Member[]
    countMembers?: number
    pageMembers?: number
    membersPerPage?: number
    onInit?: () => void
    onSelectMember?: (member: ApiModels.Member) => void
    onChangePage?: (page: number) => void
    onFilter?: (filters: { [key: string]: any }) => void
}

interface IListState {
    colonnes: HeaderColumn[]
    allColonnes: HeaderColumn[]
    filter?: boolean
    filterCriteria?: { [key: string]: any }
}



class List extends React.Component<IListProps, IListState>
{
    static defaultProps: IListProps = {
        members: [],
        onInit: () => { },
        onSelectMember: () => { },
        onChangePage: () => { },
        onFilter: () => { }
    }

    constructor(props: IListProps ) {
        super(props);
        let __this = this;
        let _colonnes = [
            new HeaderColumn({
                order: 1, code: "licence", label: "Licence", width: 100,
                getMemberValue: (x) => __this.getMeta(x, "licence"),
                getFilterMode: (col, value, onchange) => {
                    return <TextField hintText={col.label} fullWidth
                        value={value ? value : ""} onChange={(ev) => { onchange((ev.target as any).value); }} />
                }
            }),
            new HeaderColumn({
                order: 2, code: "last_name", label: "Nom",
                getMemberValue: (x) => x.last_name,
                getFilterMode: (col, value, onchange) => {
                    return <TextField hintText={col.label} fullWidth
                        value={value ? value : ""} onChange={(ev) => { onchange((ev.target as any).value); }} />
                }
            }),
            new HeaderColumn({
                order: 3, code: "first_name", label: "Prénom",
                getMemberValue: (x) => x.first_name,
                getFilterMode: (col, value, onchange) => {
                    return <TextField hintText={col.label} fullWidth
                        value={value ? value : ""} onChange={(ev) => { onchange((ev.target as any).value); }} />
                }
            }),
            new HeaderColumn({
                order: 4, code: "age", label: "Age", width: 100,
                getMemberValue: (x) => moment(x.birthday).fromNow(true),
                getFilterMode: (col, value, onchange) => {
                    return col.label;
                }
            }),
            new HeaderColumn({
                order: 5, code: "city", label: "Ville",
                getMemberValue: (x) => x.city,
                getFilterMode: (col, value, onchange) => {
                    return <TextField hintText={col.label} fullWidth
                        value={value ? value : ""} onChange={(ev) => { onchange((ev.target as any).value); }} />
                }
            }),
        ];
        this.state = {
            colonnes: [_colonnes[0], _colonnes[1], _colonnes[2], _colonnes[3]],
            allColonnes: _colonnes,
            filter: false,
            filterCriteria: {}
        };
        this.handle_onChangeColumns = this.handle_onChangeColumns.bind(this);
        this.handle_onFiltering = this.handle_onFiltering.bind(this);
    }

    componentWillMount() {
        this.props.onInit();
    }

    handle_onRowClick(member?: ApiModels.Member) {
        this.props.onSelectMember(member);
    }

    getMeta(member: ApiModels.Member, col_key: string): string {
        if (!member || !member.metas) return undefined;
        let _index = member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
        if (_index > -1 && member.metas[_index].col_value && member.metas[_index].col_value.trim() != "") {
            return member.metas[_index].col_value;
        } else {
            return undefined;
        }
    }

    render() {
        return (
            <div>
                <PageTitle
                    label={<span><i className="fa fa-users" /> Adhérents</span>}
                    actions={
                        <div style={{ textAlign: "right" }}>
                            <FlatButton label="Nouvel adhérent" href="#/members/add" />
                        </div>
                    } />
                <Row>
                    <Col md={4}>
                        {this.renderFilter()}
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

    renderFilter() {
        let __this = this;
        return (
            <div>
                <Toggle toggled={this.state.filter} label="Filtrer" labelPosition="right"
                    onToggle={() => {
                        __this.setState({ ...__this.state, filter: !__this.state.filter, filterCriteria: {} });
                        if (__this.state.filter)
                            __this.props.onFilter({});
                    }} />
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
                {
                    (this.props.pageMembers && this.props.countMembers) ?
                        <div style={{ verticalAlign: "top", display: "inline-block", height: "48px" }}>
                            <span>
                                &nbsp;&nbsp;
                                {(this.props.pageMembers - 1) * this.props.membersPerPage + 1}
                                <span> - </span>
                                {(this.props.countMembers < this.props.pageMembers * this.props.membersPerPage) ? this.props.countMembers : this.props.pageMembers * this.props.membersPerPage}
                                <span> de </span>
                                {this.props.countMembers}
                            </span>
                            <IconButton
                                iconClassName="fa fa-chevron-left"
                                disabled={this.props.pageMembers == 1}
                                onClick={() => { __this.props.onChangePage(__this.props.pageMembers - 1); }} />
                            <IconButton
                                iconClassName="fa fa-chevron-right"
                                disabled={(this.props.pageMembers) >= (this.props.countMembers / this.props.membersPerPage)}
                                onClick={() => { __this.props.onChangePage(__this.props.pageMembers + 1); }} />
                        </div>
                        : undefined
                }
                
            </div>
        );
    }

    //#endregion

    handle_onFiltering(col: HeaderColumn, value: any) {
        let _filter = {};
        _filter[col.code] = value;
        let filters = {
            ...this.state.filterCriteria,
            ..._filter
        }
        this.props.onFilter(filters);
        this.setState({
            ...this.state,
            filterCriteria: filters
        });
    }

    renderTable() {
        let __this = this;
        let _cols = [...this.state.colonnes].sort(this.sortColumns);

        return (
            <Table
                selectable={true}
                onCellClick={(row, column) => { __this.handle_onRowClick(__this.props.members[row]); } }>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        {_cols.map(col => {
                            return (
                                <TableHeaderColumn
                                    key={col.code}
                                    style={{
                                        width: col.width
                                    }}>
                                    {
                                        (__this.state.filter) ?
                                            col.getFilterMode(col,
                                                __this.state.filterCriteria[col.code],
                                                (value) => { __this.handle_onFiltering(col, value); })
                                            : col.label
                                    }
                                </TableHeaderColumn>
                            );
                        })}

                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover>
                    {this.props.members.map((member) => {
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
import { IMembers_Reducer } from "./../../reducer";
import { IApp_Reducer } from "applications/main/reducer";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../../constants";

interface IState extends IMembers_Reducer, IApp_Reducer { }

const mapStateToProps = (state: IState): IListProps => {
    return {
        members: state.route_Members.members,
        countMembers: state.route_Members.searchCount,
        pageMembers: state.route_Members.searchPage,
        membersPerPage: state.route_Members.searchLimit
    };
}

const mapDispatchToProps = (dispatch): IListProps => {
    return {
        onInit: () => {
            dispatch(ApiActions.members.Search({
                request_id: Constants.search_members,
                Request: {
                    criteria: {},
                    limit: (getStore().getState() as IState).route_Members.searchLimit,
                    page: 1
                }
            }))
        },
        onSelectMember: (member: ApiModels.Member) => {
            dispatch(push("/members/" + member.id));
        },
        onChangePage: (page) => {
            dispatch(ApiActions.members.Search({
                request_id: Constants.search_members,
                Request: {
                    criteria: {},
                    limit: (getStore().getState() as IState).route_Members.searchLimit,
                    page: page
                }
            }))
        },
        onFilter: (filtres) => {
            dispatch(ApiActions.members.Search({
                request_id: Constants.search_members,
                Request: {
                    limit: (getStore().getState() as IState).route_Members.searchLimit,
                    page: (getStore().getState() as IState).route_Members.searchPage,
                    criteria: {
                        last_name: filtres["last_name"],
                        first_name: filtres["first_name"],
                        city: filtres["city"],
                        licence: filtres["licence"]
                    }
                }
            }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);