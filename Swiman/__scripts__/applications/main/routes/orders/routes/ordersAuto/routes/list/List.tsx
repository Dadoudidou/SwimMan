import * as React from "react";
import * as ApiModels from "modules/api/models";
import { FlatButton, Paper } from "material-ui"
import * as moment from "moment"
import { Col, Row, Container } from "react-grid-system";

import { PageTitle } from "applications/main/components";
import { default as FilteredTable, HeaderColumn } from "applications/main/components/FilteredTable";
import FilteredColumns from "applications/main/components/FilteredColumnsDropdown";
import NavigationTable from "applications/main/components/NavigationTable";

import { orderToStringAction } from "./../../utils";

interface IListProps {
    season?: ApiModels.Season
    orders?: ApiModels.OrderAuto[]

    countPage?: number
    currentPage?: number
    elementsPerPage?: number

    onMount?: () => void
    onChangePage?: (page: number) => void
    onSelectOrder?: (order: ApiModels.OrderAuto) => void
    onAddOrder?: () => void
}

interface IListState {
    colonnes: HeaderColumn<ApiModels.OrderAuto>[]
}

class List extends React.PureComponent<IListProps, IListState>
{
    // set the default props for the class
    static defaultProps: IListProps = {
        onMount: () => { },
        onChangePage: () => { },
        onAddOrder: () => { },
        onSelectOrder: () => { }
    }

    constructor(props: IListProps) {
        super(props);
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
            ]
        };

        this.handle_onUpdateFilteredColumns = this.handle_onUpdateFilteredColumns.bind(this);
        this.handle_onRowClick = this.handle_onRowClick.bind(this);
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onMount();
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IListProps) {
        if (nextProps.season != this.props.season) {
            this.props.onMount();
        }
    }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IListProps, nextState: IListState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IListProps, prevState: IListState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion


    handle_onUpdateFilteredColumns(columns: HeaderColumn<any>[]) {
        this.setState({
            ...this.state,
            colonnes: columns
        });
    }

    handle_onRowClick(row: number, column: number) {
        this.props.onSelectOrder(this.props.orders[row]);
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
                            <FlatButton label="Nouvelle cotisation" onClick={this.props.onAddOrder} />
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
            </div>
        );
    }
}




import { connect } from "react-redux";
import * as ApiActions from "modules/api/actions";
import { getStore } from "modules/redux";
import { IApp_Reducer } from "applications/main/reducer";
import { IOrdersAutoListReducer, Constants } from "./sync";
import { push } from "react-router-redux";


interface IStateReducer extends IApp_Reducer, IOrdersAutoListReducer { }

const mapStateToProps = (state: IStateReducer): IListProps => {
    return {
        season: state.application.seasonSelected,
        orders: state.OrdersAutoList.orders,
        countPage: state.OrdersAutoList.searchCount,
        currentPage: state.OrdersAutoList.searchPage,
        elementsPerPage: state.OrdersAutoList.searchLimit
    };
}

const mapDispatchToProps = (dispatch): IListProps => {
    return {
        onMount: () => {
            let state: IStateReducer = getStore().getState();
            if (state.application.seasonSelected) {
                dispatch(ApiActions.orders.SearchOrdersAuto({
                    request_id: Constants.search,
                    Request: {
                        criteria: {
                            season_id: state.application.seasonSelected.id
                        },
                        limit: state.OrdersAutoList.searchLimit,
                        page: 1
                    }
                }))
            }
        },

        onChangePage: (page) => {
            let state: IStateReducer = getStore().getState();
            if (state.application.seasonSelected) {
                dispatch(ApiActions.orders.SearchOrdersAuto({
                    request_id: Constants.search,
                    Request: {
                        criteria: {
                            season_id: state.application.seasonSelected.id
                        },
                        limit: state.OrdersAutoList.searchLimit,
                        page: page
                    }
                }))
            }
        },

        onSelectOrder: (order) => {
            dispatch(push("/orders/ordersAuto/edit/" + order.id));
        },
        onAddOrder: () => {
            dispatch(push("/orders/ordersAuto/edit"));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);