import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment";

import { Paper, List, ListItem, Subheader, Divider } from "material-ui";
import { PageTitle } from "applications/main/components/PageTitle";
import { Col, Row, Container } from "react-grid-system";
import { getMeta } from "applications/main/helpers/members"

interface IViewParams {
    id?: number
}

interface IViewProps {
    params?: IViewParams
    onChangeParams?: (params: IViewParams) => void
    onMount?: () => void

    adhesion?: ApiModels.Adhesion
}

interface IViewState {
}

class View extends React.PureComponent<IViewProps, IViewState>
{
    // set the default props for the class
    static defaultProps: IViewProps = {
        onChangeParams: () => { },
        onMount: () => { }
    }

    constructor(props: IViewProps) {
        super(props);
        this.state = {};
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
        if (!this.props.adhesion) return <div>Chargement ...</div>
        let adhesion = this.props.adhesion;

        let order = adhesion.order;
        let _sessionsText = (
            <p>
                {
                    (order.is_card) ?
                        <span>Carte de {order.card_nb_session} session{(order.card_nb_session > 1) ? "s" : ""}</span>
                        :
                        (order.restriction_session_min == undefined || order.restriction_session_max == undefined) ?
                            <span>Toutes sessions</span>
                            :
                            (order.restriction_session_max == order.restriction_session_min) ?
                                <span>{order.restriction_session_min} session{(order.restriction_session_min > 1) ? "s" : ""}</span>
                                :
                                <span>{order.restriction_session_min} à {order.restriction_session_max} sessions</span>
                }
            </p>
        )

        return (
            <div>
                <PageTitle
                    label={"Adhésion N° " + adhesion.id}
                    backButton />
                <Row>
                    <Col md={4}>
                        <Paper zDepth={1}>
                            <List>
                                <Subheader>Adhérent</Subheader>
                                <ListItem
                                    primaryText="Nom Prénom"
                                    secondaryText={adhesion.member.first_name + " " + adhesion.member.last_name} />
                                <ListItem
                                    primaryText="N° de licence"
                                    secondaryText={getMeta(adhesion.member, "licence", "Non renseigné")} />
                                <ListItem
                                    primaryText="Age"
                                    secondaryText={moment(adhesion.member.birthday).fromNow(true)} />
                            </List>
                        </Paper>
                        <br />
                        <Paper zDepth={1}>
                            <List>
                                <Subheader>Section</Subheader>
                                <ListItem
                                    primaryText={adhesion.section.name}
                                    secondaryText={adhesion.section.activity.category.name + "/" + adhesion.section.activity.name} />
                                {
                                    (adhesion.sessions.length > 0) ?
                                        <div>
                                            <Divider />
                                            <Subheader>Sessions par semaine</Subheader>
                                            {adhesion.sessions.map(session => {
                                                let _start = moment().startOf("day").add(moment.duration(session.start));
                                                let _end = moment().startOf("day").add(moment.duration(session.end));
                                                return (
                                                    <ListItem
                                                        key={session.id}
                                                        secondaryTextLines={2}
                                                        primaryText={moment().day(session.day).format("dddd")}
                                                        secondaryText={
                                                            <p>
                                                                de {_start.format("LT")} à {_end.format("LT")}
                                                                <br />
                                                                {session.place.name}
                                                            </p>
                                                        } />
                                                );
                                            })}
                                        </div>
                                        :undefined
                                }
                            </List>
                        </Paper>
                    </Col>
                    <Col md={8}>
                        <Paper zDepth={1}>
                            <List>
                                <Subheader>Tarif</Subheader>
                                <ListItem primaryText={adhesion.order.amount + " €"} />
                                <ListItem
                                    primaryText="Sessions"
                                    secondaryText={_sessionsText} />
                                <ListItem
                                    primaryText="Valididté"
                                    secondaryText={<p>du {moment(order.date_from).format("LL")} au {moment(order.date_to).format("LL")}</p>} />
                                <Divider />
                                <Subheader>Règlement de l'adhésion</Subheader>
                                <ListItem primaryText="Numéro de la commande" />
                                <ListItem primaryText="Commande payée - en partie payée - non payée" />
                                <ListItem primaryText="Afficher la commande" />
                            </List>
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}

import { connect } from "react-redux";
import { IAdhesionsViewReducer, Constants, Actions } from "./sync";
import { push, replace } from "react-router-redux"
import * as ApiActions from "modules/api/actions";

const mapStateToProps = (state: IAdhesionsViewReducer): IViewProps => {
    return {
        adhesion: state.AdhesionsView.adhesion
    };
}

const mapDispatchToProps = (dispatch): IViewProps => {
    return {
        onChangeParams: (params: IViewParams) => {
            if (params.id) {
                dispatch(ApiActions.members.GetAdhesionById({
                    request_id: Constants.view_adhesion,
                    Request: { id: params.id }
                }))
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(View);