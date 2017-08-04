import * as React from "react";
import * as ApiModels from "modules/api/models";

import * as moment from "moment";
import { Paper, Subheader, RaisedButton, Toggle, List, ListItem, Card, CardHeader, CardText, CardActions, FlatButton, Dialog } from "material-ui";
import ExpandTransition from "material-ui/internal/ExpandTransition"
import { Col, Row, Container } from "react-grid-system";

import { OrderToNode } from "applications/main/helpers/orders";

import FormAdhesion from "applications/main/routes/adhesions/components/FormOrder";

interface IStepAdhesionsProps {
    gotoStep?: (index: number) => void
    gotoNextStep?: () => void
    gotoPreviousStep?: () => void

    onInit?: () => void

    member?: ApiModels.Member
    adhesions?: ApiModels.Adhesion[]
    season?: ApiModels.Season
    onUpdateAdhesion?: (adhesion: ApiModels.Adhesion) => void
    onRemoveAdhesion?: (adhesion: ApiModels.Adhesion) => void
}

interface IStepAdhesionsState {
    adhesionEdit?: ApiModels.Adhesion
    showNext?: boolean
}

class StepAdhesions extends React.PureComponent<IStepAdhesionsProps, IStepAdhesionsState>
{
    // set the default props for the class
    static defaultProps: IStepAdhesionsProps = {
        gotoStep: () => { },
        gotoNextStep: () => { },
        gotoPreviousStep: () => { },
        adhesions: [],
        onUpdateAdhesion: () => { },
        onRemoveAdhesion: () => { }
    }

    constructor(props: IStepAdhesionsProps) {
        super(props);
        this.state = {};
        this.handle_EditAdhesion = this.handle_EditAdhesion.bind(this);
        this.handle_NewAdhesion = this.handle_NewAdhesion.bind(this);
        this.handle_CancelDialog = this.handle_CancelDialog.bind(this);
        this.handle_SaveDialog = this.handle_SaveDialog.bind(this);
        this.handle_onUpdateAdhesion = this.handle_onUpdateAdhesion.bind(this);
        this.handle_removeAdhesion = this.handle_removeAdhesion.bind(this);
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onInit();
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IStepAdhesionsProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IStepAdhesionsProps, nextState: IStepAdhesionsState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IStepAdhesionsProps, prevState: IStepAdhesionsState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    validateDialog(adhesion: ApiModels.Adhesion) {
        return this.state.adhesionEdit && this.state.adhesionEdit.order != undefined;
    }

    handle_EditAdhesion(adhesion: ApiModels.Adhesion) {
        this.setState({
            ...this.state,
            adhesionEdit: JSON.parse(JSON.stringify(adhesion))
        })
    }

    handle_removeAdhesion(adhesion: ApiModels.Adhesion) {
        this.props.onRemoveAdhesion(adhesion);
    }

    handle_NewAdhesion() {
        this.setState({
            ...this.state,
            adhesionEdit: new ApiModels.Adhesion({
                created: moment().toDate(),
                member: this.props.member,
                id: -1 * Date.now()
            })
        })
    }

    handle_CancelDialog() {
        this.setState({
            ...this.state,
            adhesionEdit: undefined
        })
    }

    handle_SaveDialog() {
        //validation

        //save
        this.props.onUpdateAdhesion(this.state.adhesionEdit);
        this.handle_CancelDialog();
    }

    handle_onUpdateAdhesion(adhesion: ApiModels.Adhesion) {
        this.setState({
            ...this.state,
            adhesionEdit: adhesion
        })
    }

    render() {
        let __this = this;
        if (!this.props.member) return <div>Chargement ...</div>

        let _adhesionsMember = this.props.adhesions.filter(x => x.member.id == this.props.member.id);

        let _actions = [];
        _actions.push(<FlatButton key="cancel" label="Annuler" onClick={this.handle_CancelDialog} />);
        if (this.validateDialog(this.state.adhesionEdit)) {
            _actions.push(<FlatButton key="save" label="Valider" onClick={this.handle_SaveDialog} />);
        }

        return (
            <div>
                {/* HEADER ACTIONS */}
                <Row>
                    <Col md={12}>
                        <div style={{ textAlign: "right" }}>
                            <RaisedButton secondary label="Ajouter une activité" onClick={this.handle_NewAdhesion} />
                        </div>
                    </Col>
                </Row>
                <Row>

                    {/* MEMBERS */}
                    <Col md={3}>
                        <Subheader>Adhérents</Subheader>
                        <Paper zDepth={1}>
                            <List>
                                <ListItem primaryText={this.props.member.first_name + " " + this.props.member.last_name} selected />
                            </List>
                        </Paper>
                    </Col>

                    {/* ADHESIONS */}
                    <Col md={9}>
                        <div>
                            <Subheader>Activités en cours</Subheader>
                            {
                                (_adhesionsMember.length == 0) ?
                                    <Paper zDepth={1} style={{ padding: "1em" }}>
                                        Aucune activité en cours
                                    </Paper>
                                    :
                                    _adhesionsMember.map((adhesion, index) => {
                                        return (
                                            <div key={index}>
                                                <Card>
                                                    <CardHeader
                                                        title={adhesion.section.name}
                                                        subtitle={adhesion.section.activity.category.name + "/" + adhesion.section.activity.name}
                                                        actAsExpander showExpandableButton />
                                                    <CardText expandable>
                                                        <Row>
                                                            <Col md={6}>
                                                                <List>
                                                                    <Subheader>Sessions</Subheader>
                                                                    {adhesion.sessions.map(session => {
                                                                        let _day = moment().day(session.day).format("dddd");
                                                                        let _start = moment().startOf("day").add(moment.duration(session.start)).format("HH:mm");
                                                                        let _end = moment().startOf("day").add(moment.duration(session.end)).format("HH:mm");
                                                                        return (
                                                                            <ListItem
                                                                                disabled
                                                                                key={session.id}
                                                                                value={session.id}
                                                                                primaryText={<span>{_day} de {_start} à {_end}</span>}
                                                                                secondaryText={session.place.name} />
                                                                        );
                                                                    })}
                                                                </List>
                                                            </Col>
                                                            <Col md={6}>
                                                                <List>
                                                                    <Subheader>Tarif</Subheader>
                                                                    <ListItem disabled
                                                                        primaryText={<OrderToNode order={adhesion.order} hidePeriodicity hideSessions />}
                                                                        secondaryText={<p><OrderToNode order={adhesion.order} hideAmount /></p>}
                                                                        secondaryTextLines={2} />
                                                                </List>
                                                            </Col>
                                                        </Row>
                                                    </CardText>
                                                    <CardActions style={{ textAlign: "right" }} expandable>
                                                        <FlatButton label="Retirer" onClick={() => { __this.handle_removeAdhesion(adhesion) }} />
                                                        <FlatButton label="Editer" onClick={() => { __this.handle_EditAdhesion(adhesion) }} />
                                                    </CardActions>
                                                </Card>
                                                <br />
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </Col>
                </Row>

                {/* FOOTER ACTIONS */}
                <Row>
                    <Col md={6}>
                        <br />
                        <RaisedButton label="Retour" onClick={this.props.gotoPreviousStep} />
                    </Col>
                    <Col md={6}>
                        <div style={{ textAlign: "right" }}>
                            <br />
                            <RaisedButton label="Enregistrer sans effectuer les règlements" />
                            <span> </span>
                            <RaisedButton primary label="Effectuer les règlements" />
                        </div>
                    </Col>
                </Row>

                {/* DIALOG */}
                <Dialog
                    autoDetectWindowHeight={false}
                    repositionOnUpdate={false}
                    style={{ paddingTop: "3%" }}
                    open={this.state.adhesionEdit != undefined}
                    onRequestClose={this.handle_CancelDialog}
                    actions={_actions}>
                    {
                        (this.state.adhesionEdit) ?
                            <FormAdhesion
                                season={this.props.season}
                                adhesion={this.state.adhesionEdit}
                                onUpdate={this.handle_onUpdateAdhesion} />
                            : undefined
                    }
                </Dialog>

            </div>
        );
    }
}


import { connect } from "react-redux";
import { Actions, Constants, IInscriptionExpressReducer } from "./../../sync";
import { IApp_Reducer } from "applications/main/reducer";
import { getStore } from "modules/redux"
import * as ApiActions from "modules/api/actions";

interface IState extends IApp_Reducer, IInscriptionExpressReducer { }

const mapStateToProps = (state: IState, props: IStepAdhesionsProps): IStepAdhesionsProps => {
    return {
        season: state.application.seasonSelected,
        member: state.InscriptionExpress.member,
        adhesions: state.InscriptionExpress.adhesions
    }
}

const mapDispatchToprops = (dispatch): IStepAdhesionsProps => {
    return {
        onInit: () => {
            let _state: IState = getStore().getState();
            if (_state.InscriptionExpress.member) {
                dispatch(Actions.initAdhesions());
                dispatch(ApiActions.members.SearchAdhesions({
                    request_id: Constants.search_adhesions,
                    Request: {
                        criteria: {
                            member: _state.InscriptionExpress.member,
                            season: _state.application.seasonSelected
                        },
                        limit: 9999, page: 1
                    }
                }))
            }
        },
        onUpdateAdhesion: (adhesion) => {
            dispatch(Actions.setAdhesion(adhesion));
        },
        onRemoveAdhesion: (adhesion) => {
            dispatch(Actions.removeAdhesion(adhesion));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(StepAdhesions);