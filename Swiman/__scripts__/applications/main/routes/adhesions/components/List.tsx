import * as React from "react";
import * as ApiModels from "modules/api/models";

import { TextField, Toggle, FlatButton, Paper } from "material-ui";
import { Col, Row, Container } from "react-grid-system";
import * as moment from "moment";
import { colors } from "material-ui/styles";

import { default as FilteredTable, HeaderColumn } from "applications/main/components/FilteredTable";
import FilteredColumns from "applications/main/components/FilteredColumnsDropdown";
import NavigationTable from "applications/main/components/NavigationTable";

import { OrderToNode } from "applications/main/helpers/orders";

type columnKey = "created" | "member" | "section" | "sessions" | "season" | "order"

interface IListProps {
    adhesions?: ApiModels.Adhesion[]

    countPage?: number
    currentPage?: number
    elementsPerPage?: number

    onMount?: () => void
    onSelect?: (adhesion: ApiModels.Adhesion) => void
    onChangePage?: (page: number) => void
    onFilter?: (filters: { [key: string]: any }) => void

    hideNavigation?: boolean
    hideChooseColumn?: boolean
    hideFilter?: boolean
    hideColumns?: columnKey[]
}

interface IListState {
    colonnes: HeaderColumn<ApiModels.Adhesion>[]
    filter?: boolean
    filterCriteria?: { [key: string]: any }
}

class List extends React.PureComponent<IListProps, IListState>
{
    // set the default props for the class
    static defaultProps: IListProps = {
        adhesions: [],
        onChangePage: () => { },
        onFilter: () => { },
        onMount: () => { },
        onSelect: () => { },
        hideColumns: []
    }

    constructor(props: IListProps) {
        super(props);
        let _columnsHides = {};
        for (let i = 0; i < props.hideColumns.length; i++) { _columnsHides[props.hideColumns[i]] = true; }
        this.state = {
            colonnes: [
                new HeaderColumn<ApiModels.Adhesion>({
                    order: 1, key: "created", headerLabel: "Date",
                    hidden: _columnsHides["created"],
                    bodyContent: (x) => moment(x.created).format("LLL"),
                    bodyStyle: (x) => {
                        return {
                            borderLeftWidth: 5,
                            borderLeftStyle: "solid",
                            borderLeftColor: (moment().isBetween(moment(x.order.date_from), moment(x.order.date_to), "day", "[]")) ? colors.lightGreen500 : colors.grey500
                        };
                    },
                    filterView: (x, value, onchange) => {
                        return x.headerLabel;
                    }
                }),
                new HeaderColumn<ApiModels.Adhesion>({
                    order: 1, key: "member", headerLabel: "Adhérent",
                    hidden: _columnsHides["member"],
                    bodyContent: (x) => x.member.first_name + " " + x.member.last_name,
                    filterView: (x, value, onchange) => {
                        return (
                            <TextField fullWidth hintText="Adhérent" value={value ? value : ""} onChange={(ev, value) => { onchange(value); }} />
                        );
                    }
                }),
                new HeaderColumn<ApiModels.Adhesion>({
                    order: 1, key: "section", headerLabel: "Section",
                    hidden: _columnsHides["section"],
                    bodyContent: (x) => {
                        return (
                            <div>
                                {x.section.name}<br />
                                <small>{x.section.activity.category.name}/{x.section.activity.name}</small>
                            </div>
                        )
                    },
                    filterView: (x, value, onchange) => {
                        return x.headerLabel;
                    }
                }),
                new HeaderColumn<ApiModels.Adhesion>({
                    order: 1, key: "sessions", headerLabel: "Sessions par semaine",
                    hidden: _columnsHides["sessions"],
                    bodyContent: (x) => {
                        return (
                            <div>
                                {(!x.sessions) ? 0 : x.sessions.length} session{(x.sessions && x.sessions.length > 1) ? "s" : undefined}
                            </div>
                        );
                    },
                    filterView: (x, value, onchange) => {
                        return x.headerLabel;
                    }
                }),
                new HeaderColumn<ApiModels.Adhesion>({
                    order: 1, key: "season", headerLabel: "Saison",
                    hidden: _columnsHides["season"],
                    bodyContent: (x) => {
                        return (
                            <div>
                                {x.order.season.name}
                            </div>
                        );
                    },
                    filterView: (x, value, onchange) => {
                        return x.headerLabel;
                    }
                }),
                new HeaderColumn<ApiModels.Adhesion>({
                    order: 1, key: "order", headerLabel: "Tarif",
                    hidden: _columnsHides["order"],
                    bodyContent: (x) => {
                        return (
                            <div>
                                <OrderToNode order={x.order} hidePeriodicity />
                            </div>
                        );
                    },
                    filterView: (x, value, onchange) => {
                        return x.headerLabel;
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
        this.props.onSelect(this.props.adhesions[row]);
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
                <Row>
                    <Col md={4}>
                        {
                            (!this.props.hideFilter) ?
                                <div>
                                    <br />
                                    <Toggle toggled={this.state.filter} label="Filtrer" labelPosition="right"
                                        onToggle={() => {
                                            __this.setState({ ...__this.state, filter: !__this.state.filter, filterCriteria: {} });
                                            __this.props.onFilter({});
                                        }} />
                                </div>
                                : undefined
                        }
                    </Col>
                    <Col md={8}>
                        <div style={{ float: "right" }}>
                            {
                                (!this.props.hideChooseColumn) ?
                                    <FilteredColumns columns={this.state.colonnes} onChange={this.handle_onUpdateFilteredColumns} />
                                    : undefined
                            }
                            {
                                (!this.props.hideNavigation) ?
                                    <NavigationTable
                                        countPages={this.props.countPage}
                                        currentPage={this.props.currentPage}
                                        ElementsPerPage={this.props.elementsPerPage}
                                        onChangePage={this.props.onChangePage} />
                                    : undefined
                            }
                        </div>
                    </Col>
                </Row>
                <Paper zDepth={1}>
                    <FilteredTable
                        filterMode={this.state.filter}
                        selectable
                        onChangeFilter={this.handle_onChangeFilter}
                        columns={this.state.colonnes}
                        elements={this.props.adhesions}
                        onCellClick={this.handle_onRowClick}>
                    </FilteredTable>
                </Paper>
            </div>
        );
    }
}

export default List;