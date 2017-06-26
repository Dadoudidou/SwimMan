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

import { default as FilteredTable, HeaderColumn } from "applications/main/components/FilteredTable";
import FilteredColumns from "applications/main/components/FilteredColumnsDropdown";
import NavigationTable from "applications/main/components/NavigationTable";
import Form from "./Form";

interface IListProps {

    season?: ApiModels.Season
    orders?: ApiModels.Order[]
    
    countPage?: number
    currentPage?: number
    elementsPerPage?: number

    onUpdateOrder?: (order: ApiModels.Order) => void

    onInit?: () => void
    onSelect?: (member: ApiModels.Member) => void
    onChangePage?: (page: number) => void
    onFilter?: (filters: { [key: string]: any }) => void
}

interface IListState {
    colonnes: HeaderColumn<ApiModels.Order>[]
    filter?: boolean
    filterCriteria?: { [key: string]: any }

    editedOrder?: ApiModels.Order
}



class List extends React.PureComponent<IListProps, IListState>
{
    static defaultProps: IListProps = {
        onInit: () => { },
        onSelect: () => { },
        onChangePage: () => { },
        onFilter: () => { },
        onUpdateOrder: () => { }
    }

    constructor(props: IListProps) {
        super(props);
        let __this = this;
        let _colonnes = [];
        this.state = {
            colonnes: [
                new HeaderColumn<ApiModels.Order>({
                    order: 1, key: "section", headerLabel: "Section", width: 200,
                    bodyContent: (item) => {
                        return (
                            <span>
                                {(!item.section) ? undefined :
                                    <span>
                                        {item.section.name}<br />
                                        <small>{item.section.activity.category.name}/{item.section.activity.name}</small>
                                    </span>
                                }
                            </span>
                        );
                    }
                }),
                new HeaderColumn<ApiModels.Order>({
                    order: 2, key: "date_from", headerLabel: "Période",
                    bodyContent: (item) => {
                        return (
                            <span>
                                du {moment(item.date_from).format("LL")} au {moment(item.date_to).format("LL")}
                            </span>
                        );
                    }
                }),
                new HeaderColumn<ApiModels.Order>({
                    order: 3, key: "session", headerLabel: "Sessions",
                    bodyContent: (item) => {
                        return (
                            <span>
                                {
                                    (item.is_card) ?
                                        <span>Carte de {item.card_nb_session} session{(item.card_nb_session > 1) ? "s" : ""}</span>
                                        :
                                        (item.restriction_session_min == undefined || item.restriction_session_max == undefined) ?
                                            <span>Toutes sessions</span>
                                            :
                                            (item.restriction_session_max == item.restriction_session_min) ?
                                                <span>{item.restriction_session_min} session{(item.restriction_session_min > 1) ? "s" : ""}</span>
                                                :
                                                <span>{item.restriction_session_min} à {item.restriction_session_max} sessions</span>
                                }
                            </span>
                        );
                    }
                }),
                new HeaderColumn<ApiModels.Order>({
                    order: 9, key: "price", headerLabel: "Tarif", textAlign: "right", width: 100,
                    bodyContent: (item) => (
                        <span>{(item.amount) ? item.amount : 0} €</span>
                    )
                })
            ],
            filter: false,
            filterCriteria: {}
        };

        this.handle_onRowClick = this.handle_onRowClick.bind(this);
        this.handle_onUpdateFilteredColumns = this.handle_onUpdateFilteredColumns.bind(this);
        this.handle_onAdd = this.handle_onAdd.bind(this);
        this.handle_onCancel = this.handle_onCancel.bind(this);
        this.handle_onSave = this.handle_onSave.bind(this);
    }

    componentWillMount() {
        this.props.onInit();
    }

    componentWillReceiveProps(nextprops: IListProps) {
        if (nextprops.season != this.props.season) {
            nextprops.onInit();
        }
    }

    handle_onRowClick(row: number, column: number) {
        this.setState({
            ...this.state,
            editedOrder: this.props.orders[row]
        });
    }

    handle_onUpdateFilteredColumns(columns: HeaderColumn<any>[]) {
        this.setState({
            ...this.state,
            colonnes: columns
        });
    }

    handle_onAdd() {
        this.setState({
            ...this.state,
            editedOrder: new ApiModels.Order({ season: this.props.season, season_id: this.props.season.id })
        });
    }

    handle_onCancel() {
        this.setState({
            ...this.state,
            editedOrder: undefined
        });
    }

    handle_onSave(order: ApiModels.Order) {
        let __this = this;
        this.setState({
            ...this.state,
            editedOrder: undefined
        }, () => {
            __this.props.onUpdateOrder(order);
        });
    }

    render() {
        let _label = "Cotisations ";
        if (!this.props.season) {
            return (
                <div>
                    <PageTitle label={<span><i className="fa fa-eur" /> {_label}</span>} />
                    <Row><Col md={12}>Chargement ...</Col></Row>
                </div>
            );
        }

        let __thus = this;
        _label += this.props.season.name;
        return (
            <div>
                <PageTitle
                    label={<span><i className="fa fa-eur" /> {_label}</span>}
                    actions={
                        <div style={{ textAlign: "right" }}>
                            <FlatButton label="Nouvelle cotisation" onClick={this.handle_onAdd} />
                        </div>
                    } />
                <Row>
                    <Col md={12}>
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
                        selectable
                        columns={this.state.colonnes}
                        elements={this.props.orders}
                        onCellClick={this.handle_onRowClick}>
                    </FilteredTable>
                </Paper>
                <Form
                    open={this.state.editedOrder != undefined}
                    order={this.state.editedOrder}
                    onCancel={this.handle_onCancel}
                    onSave={this.handle_onSave} />
            </div>
        );
    }

}

import { connect } from "react-redux";
import * as Constants from "./constants";
import * as ApiActions from "modules/api/actions";
import { getStore } from "modules/redux";
import { IApp_Reducer } from "applications/main/reducer";
import { IOrdersList_Reducer } from "./reducer";

interface IState extends IApp_Reducer, IOrdersList_Reducer { }

const mapStateToProps = (state: IState): IListProps => {
    return {
        season: state.application.seasonSelected,
        orders: state.route_Orders_List.orders,
        countPage: state.route_Orders_List.searchCount,
        currentPage: state.route_Orders_List.searchPage,
        elementsPerPage: 20
    };
}

let _loadOrders = (dispatch) => {
    let state: IState = getStore().getState();
    if (state.application.seasonSelected) {
        dispatch(ApiActions.orders.Search({
            request_id: Constants.search,
            Request: {
                criteria: {
                    season_id: state.application.seasonSelected.id
                },
                limit: 20,
                page: 1
            }
        }));
    }
}

const mapDispatchToProps = (dispatch): IListProps => {
    return {
        onInit: () => {
            let state: IState = getStore().getState();
            if (state.application.seasonSelected) {
                _loadOrders(dispatch);
                dispatch(ApiActions.activities.GetTree({
                    request_id: Constants.search,
                    Request: {
                        season: state.application.seasonSelected
                    }
                }));
            }
        },
        onChangePage: (page) => {
            let state: IState = getStore().getState();
            dispatch(ApiActions.orders.Search({
                request_id: Constants.search,
                Request: {
                    criteria: {
                        season_id: state.application.seasonSelected.id
                    },
                    limit: 20,
                    page: page
                }
            }))
        },
        onUpdateOrder: (order) => {
            dispatch(ApiActions.orders.UpdateOrder({
                request_id: Constants.save,
                Request: {
                    order: order
                }
            })).then(() => {
                _loadOrders(dispatch);
            })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
