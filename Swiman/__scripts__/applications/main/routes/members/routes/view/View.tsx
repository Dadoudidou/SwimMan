import * as React from "react";
import * as ApiModels from "modules/api/models";

import { Paper } from "material-ui";
import { Col, Row, Container } from "react-grid-system";
import * as moment from "moment";

import { Picture } from "modules/components";
import { PageTitle } from "applications/main/components"

import Infos from "./Infos";

interface IViewParams {
    id?: number
}

interface IViewProps {
    params?: IViewParams
    onChangeParams?: (params: IViewParams) => void

    member?: ApiModels.Member
}

interface IViewState {
}

class View extends React.PureComponent<IViewProps, IViewState>
{
    // set the default props for the class
    static defaultProps: IViewProps = {
        onChangeParams: () => { }
    }

    constructor(props: IViewProps) {
        super(props);
        this.state = {};
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

        return (
            <Row>
                <Col md={3}>
                </Col>
                <Col md={9}>
                    <Paper zDepth={1}>
                        <Infos member={this.props.member} />
                    </Paper>
                </Col>
            </Row>
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