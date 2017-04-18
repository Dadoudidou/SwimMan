import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, RaisedButton, Paper, FlatButton } from "material-ui";
import { push } from "react-router-redux";
import * as moment from "moment"

import { PageTitle } from "applications/main/components";

interface IListProps {
    members?: ApiModels.Member[]
    onInit?: () => void
    onSelectMember?: (member: ApiModels.Member) => void
}

interface IListState {

}

class List extends React.Component<IListProps, IListState>
{
    static defaultProps: IListProps = {
        members: [],
        onInit: () => { },
        onSelectMember: () => { }
    }

    constructor(props: IListProps ) {
        super(props);
        this.state = {};
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
                <Paper zDepth={1}>
                    {this.renderTable()}
                </Paper>
            </div>
        );
    }

    renderTable() {
        let __this = this;
        return (
            <Table
                selectable={true}
                onCellClick={(row, column) => { __this.handle_onRowClick(__this.props.members[row]); } }>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={{ width: "100px" }}>Licence</TableHeaderColumn>
                        <TableHeaderColumn>Nom</TableHeaderColumn>
                        <TableHeaderColumn>Prénom</TableHeaderColumn>
                        <TableHeaderColumn style={{ width:"100px" }}>Age</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover>
                    {this.props.members.map((member) => {
                        return (
                            <TableRow key={member.id} style={{ cursor:"pointer" }}>
                                <TableRowColumn style={{ width: "100px" }}>{__this.getMeta(member, "licence")}</TableRowColumn>
                                <TableRowColumn>{member.last_name}</TableRowColumn>
                                <TableRowColumn>{member.first_name}</TableRowColumn>
                                <TableRowColumn style={{ width: "100px" }}>{moment(member.birthday).fromNow(true)}</TableRowColumn>
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
import { IMembers_Reducer } from "./../../reducer";
import { IApp_Reducer } from "applications/main/reducer";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../../constants";

interface IState extends IMembers_Reducer, IApp_Reducer { }

const mapStateToProps = (state: IState): IListProps => {
    return {
        members: state.route_Members.members
    };
}

const mapDispatchToProps = (dispatch): IListProps => {
    return {
        onInit: () => {
            dispatch(ApiActions.members.Search({
                request_id: Constants.search_members,
                Request: {
                    criteria: {},
                    limit: 20
                }
            }))
        },
        onSelectMember: (member: ApiModels.Member) => {
            dispatch(push("/members/" + member.id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);