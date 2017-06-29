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
import { orderToStringAction } from "./utils";

interface IListProps {

    season?: ApiModels.Season
    orders?: ApiModels.OrderAuto[]
    
    countPage?: number
    currentPage?: number
    elementsPerPage?: number

    onUpdateOrder?: (order: ApiModels.OrderAuto) => void

    onInit?: () => void
    onSelect?: (member: ApiModels.Member) => void
    onChangePage?: (page: number) => void
    onFilter?: (filters: { [key: string]: any }) => void
}

interface IListState {
    colonnes: HeaderColumn<ApiModels.OrderAuto>[]
    filter?: boolean
    filterCriteria?: { [key: string]: any }

    editedOrder?: ApiModels.OrderAuto
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
                new HeaderColumn<ApiModels.OrderAuto>({
                    order: 1, key: "description", headerLabel: "Description",
                    bodyContent: (item) => {
                        return (
                            <span>
                                {item.description}
                            </span>
                        );
                    }
                }),
                new HeaderColumn<ApiModels.OrderAuto>({
                    order: 2, key: "date_from", headerLabel: "Période",
                    bodyContent: (item) => {
                        return (
                            <span>
                                du {moment(item.date_from).format("LL")} au {moment(item.date_to).format("LL")}
                            </span>
                        );
                    }
                }),
                new HeaderColumn<ApiModels.OrderAuto>({
                    order: 9, key: "action", headerLabel: "Action", textAlign: "left",
                    bodyStyle: { whiteSpace: "normal" },
                    bodyContent: (item) => {
                        return (
                            <span>{orderToStringAction(item)}</span>
                        );
                    }
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
            editedOrder: new ApiModels.OrderAuto({ season: this.props.season })
        });
    }

    handle_onCancel() {
        this.setState({
            ...this.state,
            editedOrder: undefined
        });
    }

    handle_onSave(order: ApiModels.OrderAuto) {
        let __this = this;
        this.setState({
            ...this.state,
            editedOrder: undefined
        }, () => {
            __this.props.onUpdateOrder(order);
        });
    }

    render() {
        let _label = "Tarifs Autos / Réductions ";
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
                    onCancel={this.handle_onCancel} />
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
        orders: state.route_Orders_Auto_List.orders,
        countPage: state.route_Orders_Auto_List.searchCount,
        currentPage: state.route_Orders_Auto_List.searchPage,
        elementsPerPage: 20
    };
}

let _loadOrders = (dispatch) => {
    let state: IState = getStore().getState();
    if (state.application.seasonSelected) {
        dispatch(ApiActions.orders.SearchOrdersAuto({
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
            dispatch(ApiActions.orders.SearchOrdersAuto({
                request_id: Constants.search,
                Request: {
                    criteria: {
                        season_id: state.application.seasonSelected.id
                    },
                    limit: 20,
                    page: page
                }
            }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
