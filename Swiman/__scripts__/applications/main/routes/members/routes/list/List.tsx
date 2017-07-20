import * as React from "react";
import * as ApiModels from "modules/api/models";

import { TextField, Toggle, FlatButton, Paper } from "material-ui";
import { Col, Row, Container } from "react-grid-system";
import * as moment from "moment";

import { default as FilteredTable, HeaderColumn } from "applications/main/components/FilteredTable";
import FilteredColumns from "applications/main/components/FilteredColumnsDropdown";
import NavigationTable from "applications/main/components/NavigationTable";

import { PageTitle } from "applications/main/components";

interface IListProps {

    members?: ApiModels.Member[]

    countPage?: number
    currentPage?: number
    elementsPerPage?: number

    onMount?: () => void
    onSelect?: (member: ApiModels.Member) => void
    onChangePage?: (page: number) => void
    onFilter?: (filters: { [key: string]: any }) => void
}

interface IListState {
    colonnes: HeaderColumn<ApiModels.Member>[]
    filter?: boolean
    filterCriteria?: { [key: string]: any }
}

class List extends React.PureComponent<IListProps, IListState>
{
    // set the default props for the class
    static defaultProps: IListProps = {
        members: [],
        onChangePage: () => { },
        onFilter: () => { },
        onMount: () => { },
        onSelect: () => { }
    }

    static getMeta(member: ApiModels.Member, col_key: string): string {
        if (!member || !member.metas) return undefined;
        let _index = member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
        if (_index > -1 && member.metas[_index].col_value && member.metas[_index].col_value.trim() != "") {
            return member.metas[_index].col_value;
        } else {
            return undefined;
        }
    }

    constructor(props: IListProps) {
        super(props);
        this.state = {
            colonnes: [
                new HeaderColumn<ApiModels.Member>({
                    order: 1, key: "licence", headerLabel: "Licence", width: 100,
                    bodyContent: (x) => List.getMeta(x, "licence"),
                    filterView: (x, value, onchange) => {
                        return (
                            <TextField fullWidth hintText="Licence" value={value ? value : ""} onChange={(ev, value) => { onchange(value); }} />
                        );
                    }
                }),
                new HeaderColumn<ApiModels.Member>({
                    order: 2, key: "last_name", headerLabel: "Nom",
                    bodyContent: (x) => x.last_name,
                    filterView: (x, value, onchange) => {
                        return (
                            <TextField fullWidth hintText="Nom" value={value ? value : ""} onChange={(ev, value) => { onchange(value); }} />
                        );
                    }
                }),
                new HeaderColumn<ApiModels.Member>({
                    order: 3, key: "first_name", headerLabel: "Prénom",
                    bodyContent: (x) => x.first_name,
                    filterView: (x, value, onchange) => {
                        return (
                            <TextField fullWidth hintText="Prénom" value={value ? value : ""} onChange={(ev, value) => { onchange(value); }} />
                        );
                    }
                }),
                new HeaderColumn<ApiModels.Member>({
                    order: 4, key: "age", headerLabel: "Age", width: 100,
                    bodyContent: (x) => moment(x.birthday).fromNow(true),
                    filterView: (x, value, onchange) => {
                        return "Age";
                    }
                }),
                new HeaderColumn<ApiModels.Member>({
                    order: 5, key: "city", headerLabel: "Ville",
                    bodyContent: (x) => x.city,
                    filterView: (x, value, onchange) => {
                        return (
                            <TextField fullWidth hintText="Ville" value={value ? value : ""} onChange={(ev, value) => { onchange(value); }} />
                        );
                    }
                })
            ],
            filter: false,
            filterCriteria: {}
        };

        this.handle_onRowClick = this.handle_onRowClick.bind(this);
        this.handle_onUpdateFilteredColumns = this.handle_onUpdateFilteredColumns.bind(this);
        this.handle_onChangeFilter = this.handle_onChangeFilter.bind(this);
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onMount()
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IListProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IListProps, nextState: IListState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IListProps, prevState: IListState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    handle_onRowClick(row: number, column: number) {
        this.props.onSelect(this.props.members[row]);
    }

    handle_onChangeFilter(filters) {
        this.props.onFilter(filters);
    }

    handle_onUpdateFilteredColumns(columns: HeaderColumn<any>[]) {
        this.setState({
            ...this.state,
            colonnes: columns
        });
    }

    render() {
        let __this = this;
        return (
            <div>
                <PageTitle
                    label={<span><i className="fa fa-users" /> Adhérents</span>}
                    actions={
                        <div style={{ textAlign: "right" }}>
                            <FlatButton label="Nouvel adhérent" href="#/members/edit" />
                        </div>
                    } />
                <Row>
                    <Col md={4}>
                        <Toggle toggled={this.state.filter} label="Filtrer" labelPosition="right"
                            onToggle={() => {
                                __this.setState({ ...__this.state, filter: !__this.state.filter, filterCriteria: {} });
                                __this.props.onFilter({});
                            }} />
                    </Col>
                    <Col md={8}>
                        <div style={{ float: "right" }}>
                            <FilteredColumns columns={this.state.colonnes} onChange={this.handle_onUpdateFilteredColumns} />
                            <NavigationTable
                                countPages={this.props.countPage}
                                currentPage={this.props.currentPage}
                                ElementsPerPage={this.props.elementsPerPage}
                                onChangePage={this.props.onChangePage} />
                        </div>
                    </Col>
                </Row>
                <Paper zDepth={1}>
                    <FilteredTable
                        filterMode={this.state.filter}
                        selectable
                        onChangeFilter={this.handle_onChangeFilter}
                        columns={this.state.colonnes}
                        elements={this.props.members}
                        onCellClick={this.handle_onRowClick}>
                    </FilteredTable>
                </Paper>
            </div>
        );
    }
}



import { connect } from "react-redux";
import { Actions, Constants, IMembersListReducer } from "./sync";
import * as ApiActions from "modules/api/actions";
import { getStore } from "modules/redux";
import { push } from "react-router-redux";

const mapStateToProps = (state: IMembersListReducer): IListProps => {
    return {
        members: state.MembersList.members,
        countPage: state.MembersList.searchCount,
        currentPage: state.MembersList.searchPage,
        elementsPerPage: state.MembersList.searchLimit
    };
}

const mapDispatchToProps = (dispatch): IListProps => {
    return {
        onMount: () => {
            let _state: IMembersListReducer = getStore().getState();
            dispatch(ApiActions.members.Search({
                request_id: Constants.search_members,
                Request: {
                    criteria: {},
                    limit: _state.MembersList.searchLimit,
                    page: 1
                }
            }))
        },

        onSelect: (member) => {
            dispatch(push("/members/" + member.id));
        },

        onChangePage: (page) => {
            let _state: IMembersListReducer = getStore().getState();
            dispatch(ApiActions.members.Search({
                request_id: Constants.search_members,
                Request: {
                    criteria: {},
                    limit: _state.MembersList.searchLimit,
                    page: page
                }
            }))
        },

        onFilter: (filtres) => {
            let _state: IMembersListReducer = getStore().getState();
            dispatch(ApiActions.members.Search({
                request_id: Constants.search_members,
                Request: {
                    limit: _state.MembersList.searchLimit,
                    page: _state.MembersList.searchPage,
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