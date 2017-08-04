import * as React from "react";
import * as ApiModels from "modules/api/models";

import { TextField, Toggle, FlatButton, Paper } from "material-ui";
import { Col, Row, Container } from "react-grid-system";
import * as moment from "moment";

import { default as FilteredTable, HeaderColumn } from "applications/main/components/FilteredTable";
import FilteredColumns from "applications/main/components/FilteredColumnsDropdown";
import NavigationTable from "applications/main/components/NavigationTable";

import { PageTitle } from "applications/main/components";
import AdhesionsList from "./../../components/List";


interface IListProps {

    adhesions?: ApiModels.Adhesion[]

    countPage?: number
    currentPage?: number
    elementsPerPage?: number

    onMount?: () => void
    onSelect?: (adhesion: ApiModels.Adhesion) => void
    onChangePage?: (page: number) => void
    onFilter?: (filters: { [key: string]: any }) => void

}

interface IListState {

}

class List extends React.PureComponent<IListProps, IListState>
{
    // set the default props for the class
    static defaultProps: IListProps = {
        adhesions: [],
        onChangePage: () => { },
        onFilter: () => { },
        onMount: () => { },
        onSelect: () => { }
    }

    constructor(props: IListProps) {
        super(props);
        this.state = {

        };
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


    render() {
        let __this = this;
        return (
            <div>
                <PageTitle
                    label={<span><i className="fa fa-id-card-o" /> Adhésions</span>}
                    actions={
                        <div style={{ textAlign: "right" }}>
                            <FlatButton label="Nouvelle adhésion" href="#/adhesions/edit" />
                        </div>
                    } />
                <AdhesionsList
                    adhesions={this.props.adhesions}
                    countPage={this.props.countPage}
                    currentPage={this.props.currentPage}
                    elementsPerPage={this.props.elementsPerPage}
                    onChangePage={this.props.onChangePage}
                    onFilter={this.props.onFilter}
                    onSelect={this.props.onSelect} />
            </div>
        );
    }
}



import { connect } from "react-redux";
import { Actions, Constants, IAdhesionsListReducer } from "./sync";
import * as ApiActions from "modules/api/actions";
import { getStore } from "modules/redux";
import { push } from "react-router-redux";

const mapStateToProps = (state: IAdhesionsListReducer, props: IListProps): IListProps => {
    return {
        adhesions: state.AdhesionsList.adhesions,
        countPage: state.AdhesionsList.searchCount,
        currentPage: state.AdhesionsList.searchPage,
        elementsPerPage: state.AdhesionsList.searchLimit
    };
}

const mapDispatchToProps = (dispatch): IListProps => {
    return {
        onMount: () => {
            let _state: IAdhesionsListReducer = getStore().getState();
            dispatch(ApiActions.members.SearchAdhesions({
                request_id: Constants.search_adhesions,
                Request: {
                    criteria: {},
                    limit: _state.AdhesionsList.searchLimit,
                    page: 1
                }
            }))
        },

        onSelect: (adhesion) => {
            //dispatch(push("/adhesions/" + adhesion.id));
        },

        onChangePage: (page) => {
            let _state: IAdhesionsListReducer = getStore().getState();
            dispatch(ApiActions.members.SearchAdhesions({
                request_id: Constants.search_adhesions,
                Request: {
                    criteria: {},
                    limit: _state.AdhesionsList.searchLimit,
                    page: page
                }
            }))
        },

        onFilter: (filtres) => {
            let _state: IAdhesionsListReducer = getStore().getState();
            dispatch(ApiActions.members.SearchAdhesions({
                request_id: Constants.search_adhesions,
                Request: {
                    limit: _state.AdhesionsList.searchLimit,
                    page: _state.AdhesionsList.searchPage,
                    criteria: {
                        
                    }
                }
            }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);