import * as React from "react";
import * as ApiModels from "modules/api/models";
import {
    Tab, Tabs, Paper,
    Card, CardActions, CardHeader, CardMedia, CardText, CardTitle,
    Divider, Subheader, List, ListItem,
    RaisedButton, IconButton,
    BottomNavigation, BottomNavigationItem
} from "material-ui";
import { Picture } from "modules/components";
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Col, Row, Container } from "react-grid-system";
import * as moment from "moment";
import { PageTitle } from "applications/main/components"
import { hashHistory } from "react-router";

import Infos from "./../../components/Infos";

interface IViewParams {
    id?: number
}

interface IViewProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    params?: IViewParams
    member?: ApiModels.Member

    onChangeParams?: (params: IViewParams) => void
    onUpdateMember?: (member: ApiModels.Member) => void

}

interface IViewState {
    selectedTab?: string
    editInfos?: boolean

}

class View extends React.Component<IViewProps, IViewState>
{
    static defaultProps: IViewProps = {
        onChangeParams: () => { },
        onUpdateMember: () => { }
    }

    refs: {
        [key: string]: any,
        infos: Infos
    }

    constructor(props: IViewProps ) {
        super(props);
        this.state = {
            selectedTab: "infos",
            editInfos: false
        };
        this.handle_OnSelectTab = this.handle_OnSelectTab.bind(this);
    }
    componentWillMount() {
        this.props.onChangeParams(this.props.params);
    }
    componentWillReceiveProps(props: IViewProps) {
        if (this.props.params.id != props.params.id)
            props.onChangeParams(props.params);
    }

    handle_OnSelectTab(tab: string) {
        this.setState({
            ...this.state,
            selectedTab: (this.refs.infos.isEditMode()) ? "infos" : tab
        });
    }

    getNotInformed() {
        return (
            <span style={{ color: this.props.muiTheme.palette.disabledColor }}>non renseigné</span>
        );
    }

    getMeta(member: ApiModels.Member, col_key: string, defaut?: React.ReactNode): React.ReactNode {
        if (!member || !member.metas) return undefined;
        let _index = member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
        if (_index > -1 && member.metas[_index].col_value && member.metas[_index].col_value.trim() != "") {
            return member.metas[_index].col_value;
        } else {
            return defaut;
        }
    }
    
    render() {
        let __this = this;
        if (!this.props.member) return <div>Chargement ...</div>
        return (
            <Container fluid>
                <Row>
                    <Col md={3}>

                        {(() => { /* BARRE OUTILS : RETOUR - OPTIONS */ })()}
                        <div>
                            <Row>
                                <Col sm={3}>
                                    <IconButton iconClassName="fa fa-arrow-left" tooltip="retour"
                                        iconStyle={{ color: this.props.muiTheme.palette.secondaryTextColor }}
                                        onClick={() => { hashHistory.goBack(); }} />
                                </Col>
                            </Row>
                        </div>

                        {(() => { /* IMAGE */ })()}
                        <div style={{ textAlign: "center", marginBottom: "2em" }}>
                            <Picture circle content={<i className="fa fa-user-secret" style={{
                                position: "absolute", top: "50%", left: "50%",
                                marginLeft: "-0.5em", marginTop: "-0.5em",
                                fontSize: "4em", opacity: 0.5
                            }} />} />
                        </div>

                        {(() => { /* NOM PRENOM LICENCE */ })()}
                        <div style={{ textAlign: "center", lineHeight: "1.5em" }}>
                            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                                {(this.props.member.male) ? "Mr" : "Mme"} {this.props.member.first_name} {this.props.member.last_name}
                            </div>
                            <div>
                                <i className="fa fa-id-badge" /> Licence N° {this.getMeta(this.props.member, "licence", "----")}
                            </div>
                        </div>

                        {(() => { /* ACTIONS */ })()}
                        <br />
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <RaisedButton label="Editer le profil" href={"#/members/add/" + this.props.member.id} />
                        </div>

                    </Col>
                    <Col md={9}>

                        {(() => { /* TABS */ })()}
                        <Tabs
                            className="tabs-center"
                            tabItemContainerStyle={{ width: "50%", backgroundColor: "transparent" }}
                            inkBarStyle={{}}>
                            <Tab label="Informations personnelles" value="infos" style={{ textTransform: "capitalize", color: this.props.muiTheme.palette.secondaryTextColor }}>
                                <br />
                                {this.renderInfos()}
                            </Tab>
                            <Tab label="Adhésions" value="adhesions" style={{ textTransform: "capitalize", color: this.props.muiTheme.palette.secondaryTextColor }}>
                                <br />
                                {this.renderAdhesions()}
                            </Tab>
                            <Tab label="Factures" value="factures" style={{ textTransform: "capitalize", color: this.props.muiTheme.palette.secondaryTextColor }}>
                                <br />
                                {this.renderFactures()}
                            </Tab>
                        </Tabs>

                    </Col>
                </Row>
                
            </Container>
        );
    }

    renderInfos() {
        let _member = this.props.member;
        return (
            <div>
                <Paper zDepth={1}>

                    <List>
                        <ListItem leftIcon={<i className="fa fa-birthday-cake" />}>{moment(this.props.member.birthday).format("LL")} - <small><i>{moment(this.props.member.birthday).fromNow(true)}</i></small></ListItem>

                        <Subheader>Adresse</Subheader>
                        <ListItem leftIcon={<i className="fa fa-map-marker" />}>
                            {
                                (_member.adress) ?
                                    <span>
                                        <span dangerouslySetInnerHTML={{ __html: _member.adress.replace(/\n/g, "<br />") }} />
                                        <br />
                                        {_member.postalcode} - {_member.city}
                                    </span>
                                    : this.getNotInformed()
                            }
                        </ListItem>

                        <Subheader>Contact</Subheader>
                        <ListItem leftIcon={<i className="fa fa-phone" />}>{this.getMeta(_member, "phone_first", this.getNotInformed())}</ListItem>
                        <ListItem leftIcon={<i className="fa fa-mobile" />}>{this.getMeta(_member, "phone_second", this.getNotInformed())}</ListItem>
                        <ListItem leftIcon={<i className="fa fa-envelope" />}>{this.getMeta(_member, "email", this.getNotInformed())}</ListItem>

                        <Subheader>Emploi</Subheader>
                        <ListItem leftIcon={<i className="fa fa-briefcase" />}>{this.getMeta(_member, "job", this.getNotInformed())}</ListItem>
                        <ListItem leftIcon={<i className="fa fa-building" />}>{this.getMeta(_member, "job_company", this.getNotInformed())}</ListItem>
                        <Subheader>Commentaires</Subheader>
                        <ListItem leftIcon={<i className="fa fa-comments" />}>{this.getMeta(_member, "comments", this.getNotInformed())}</ListItem>

                    </List>

                </Paper>
            </div>
        );
    }

    renderFactures() {
        return (
            <Card>
                <CardHeader
                    title="Factures"
                    showExpandableButton
                    actAsExpander/>
                <Divider />
                <CardText expandable>

                </CardText>
            </Card>
        );
    }

    renderAdhesions() {
        return (
            <Card>
                <CardHeader
                    title="Adhésions"
                    showExpandableButton
                    actAsExpander/>
                <Divider />
                <CardText expandable>

                </CardText>
            </Card>
        );
    }

    renderPayments() {
        return (
            <Card>
                <CardHeader
                    title="Paiements"
                    showExpandableButton
                    actAsExpander />
                <Divider />
                <CardText expandable>

                </CardText>
            </Card>
        );
    }
}





import { connect } from "react-redux";
import { IMembers_Reducer } from "./../../reducer";
import { IApp_Reducer } from "applications/main/reducer";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../../constants";
import * as Notifications from "modules/notifications/actions";

interface IState extends IMembers_Reducer, IApp_Reducer { }

const mapStateToProps = (state: IState): IViewProps => {
    return {
        member: state.route_Members.memberSelected
    };
}

const mapDispatchToProps = (dispatch): IViewProps => {
    return {
        onChangeParams: (params: IViewParams) => {
            dispatch(ApiActions.members.GetMemberById({
                request_id: Constants.view_member,
                Request: { id: params.id }
            }))
        },
        onUpdateMember: (member) => {
            dispatch(ApiActions.members.UpdateMember({
                request_id: Constants.edit_member,
                Request: {
                    member: member
                }
            })).then(member => {
                dispatch(Notifications.Send({
                    message: "Enregistrement effectué.",
                    kind: "success",
                    dismissAfter: 1000
                }));
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(View));