import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment";

import {
    Paper, List, ListItem, Subheader, Divider,
    Step, StepButton, StepContent, StepLabel, Stepper
} from "material-ui";
import { PageTitle } from "applications/main/components/PageTitle";
import { Col, Row, Container } from "react-grid-system";
import { getMeta } from "applications/main/helpers/members"
import MemberAutoComplete from "applications/main/routes/members/components/AutoComplete";
import FormOrder from "applications/main/routes/adhesions/components/FormOrder";

interface IAddParams {
    id?: number
}

interface IAddProps {
    params?: IAddParams
    onChangeParams?: (params: IAddParams) => void
    onMount?: () => void

    season?: ApiModels.Season
    adhesion?: ApiModels.Adhesion
}

interface IAddState {
    adhesion: ApiModels.Adhesion
}

class Add extends React.PureComponent<IAddProps, IAddState>
{
    // set the default props for the class
    static defaultProps: IAddProps = {
        onChangeParams: () => { },
        onMount: () => { }
    }

    constructor(props: IAddProps) {
        super(props);
        this.state = {
            adhesion: (props.adhesion) ? JSON.parse(JSON.stringify(props.adhesion)) : this.NewAdhesion()
        };
    }

    NewAdhesion(): ApiModels.Adhesion {
        return new ApiModels.Adhesion({
            created: moment().toDate()
        })
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onMount();
        this.props.onChangeParams(this.props.params);
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IAddProps) {
        if (this.props.params.id != nextProps.params.id) nextProps.onChangeParams(nextProps.params);

        let _state = this.state;

        if (this.props.adhesion != nextProps.adhesion)
            _state = {
                ..._state,
                adhesion: (nextProps.adhesion) ? JSON.parse(JSON.stringify(nextProps.adhesion)) : this.NewAdhesion()
            }


        if (this.state != _state) {
            this.setState(_state);
        }
    }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IAddProps, nextState: IAddState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IAddProps, prevState: IAddState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    handle_update(adhesion: ApiModels.Adhesion) {
        this.setState({
            ...this.state,
            adhesion: adhesion
        });
    }

    render() {
        let __this = this;

        let adhesion = this.state.adhesion;

        return (
            <div>
                <PageTitle
                    label={(adhesion.id == 0) ? "Nouvelle adhésion" : "Adhésion N° " + adhesion.id}
                    backButton />

                <Row>
                    <Col md={4}>
                        <Paper zDepth={1}>
                            <List>
                                <Subheader>Adhérent</Subheader>
                                <ListItem disableKeyboardFocus disabled>
                                    <MemberAutoComplete onSelect={(member) => { __this.handle_update({ ...__this.state.adhesion, member: member }) }} />
                                </ListItem>
                            </List>                            
                        </Paper>
                    </Col>
                    <Col md={8}>
                        <Paper zDepth={1}>
                            <Subheader>Section</Subheader>
                            <FormOrder season={this.props.season} />
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }

    renderMember() {
        if (!this.state.adhesion.member) return <div></div>

    }
}

import { actionCreator, isType, IAction, getStore, injectAsyncReducer } from "modules/redux";
import * as ApiActions from "modules/api/actions";
import { connect } from "react-redux";
import { IApp_Reducer } from "applications/main/reducer";

const mapStateToProps = (state: IApp_Reducer): IAddProps => {
    return {
        season: state.application.seasonSelected
    }
}

export default connect(mapStateToProps)(Add);