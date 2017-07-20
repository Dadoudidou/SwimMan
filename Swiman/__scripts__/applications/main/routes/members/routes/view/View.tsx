import * as React from "react";
import * as ApiModels from "modules/api/models";

import { Paper, Tabs, Tab } from "material-ui";
import { Col, Row, Container } from "react-grid-system";
import * as moment from "moment";

import { Picture } from "modules/components";
import { PageTitle } from "applications/main/components"

import { getMeta } from "applications/main/helpers/members"
import Infos from "./Infos";
import Adhesions from "./Adhesions";

interface IViewParams {
    id?: number
}

interface IViewProps {
    params?: IViewParams
    onChangeParams?: (params: IViewParams) => void

    member?: ApiModels.Member
}

interface IViewState {
    tab?: string
}

class View extends React.PureComponent<IViewProps, IViewState>
{
    // set the default props for the class
    static defaultProps: IViewProps = {
        onChangeParams: () => { }
    }

    constructor(props: IViewProps) {
        super(props);
        this.state = {
            tab: "dashboard"
        };
    }

    tabs= {
        "dashboard": undefined,
        "infos": Infos,
        "adhesions": Adhesions,
        "factures": undefined
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onChangeParams(this.props.params);
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IViewProps) {
        if (this.props.params.id != nextProps.params.id) nextProps.onChangeParams(nextProps.params);
    }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IViewProps, nextState: IViewState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IViewProps, prevState: IViewState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        if (!this.props.member) return <div>Chargement ...</div>

        let _tabStyle: React.CSSProperties = {
            color: "#555"
        }
        let _licence = getMeta(this.props.member, "licence");
        return (
            <div>
                <Paper zDepth={1}>
                    <div style={{ padding: "1em 0 1em 3em" }}>
                        <Row>
                            <Col md={12}>
                                <div style={{ display: "inline-block", verticalAlign: "middle" }}>
                                    <Picture circle width={100} height={100} />
                                </div>
                                <div style={{ display: "inline-block", verticalAlign: "middle", padding: "1em 0 1em 3em" }}>
                                    <div style={{ fontSize: "1.2em" }}>
                                        {this.props.member.first_name} {this.props.member.last_name}
                                    </div>
                                    {
                                        _licence ?
                                        <div>
                                            <i className="fa fa-id-badge" /> Licence N° {_licence}
                                        </div>
                                        : undefined
                                    }
                                    <div>
                                        <small>
                                            {moment(this.props.member.birthday).fromNow(true)}
                                        </small>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <br />
                    <Tabs
                        value={this.state.tab}
                        onChange={(value) => { __this.setState({ ...__this.state, tab: value }) }}
                        tabItemContainerStyle={{
                            background: "transparent"
                        }}>
                        <Tab style={_tabStyle} value="dashboard" label="Tableau de bord" />
                        <Tab style={_tabStyle} value="infos"  label="Informations personnelles" />
                        <Tab style={_tabStyle} value="adhesions"  label="Adhésions" />
                        <Tab style={_tabStyle} value="factures"  label="Factures" />
                    </Tabs>
                </Paper>
                <div style={{ padding: "1em 0 1em 0" }}>
                    {
                        this.tabs[this.state.tab] ?
                            React.createElement(this.tabs[this.state.tab], { member: this.props.member })
                            : undefined
                    }
                </div>
            </div>
        );
    }
}


import { connect } from "react-redux";
import { IMembersViewReducer, Constants, Actions } from "./sync";
import { push, replace } from "react-router-redux"
import * as ApiActions from "modules/api/actions";

const mapStateToProps = (state: IMembersViewReducer): IViewProps => {
    return {
        member: state.MembersView.member
    };
}

const mapDispatchToProps = (dispatch): IViewProps => {
    return {
        onChangeParams: (params: IViewParams) => {
            if (params.id) {
                dispatch(ApiActions.members.GetMemberById({
                    request_id: Constants.view_member,
                    Request: { id: params.id }
                }))
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(View);