import * as React from "react";
import * as ApiModels from "modules/api/models";
import {
    Tab, Tabs, Paper,
    Card, CardActions, CardHeader, CardMedia, CardText, CardTitle,
    Divider, Subheader, List, ListItem,
    RaisedButton, FlatButton,
    BottomNavigation, BottomNavigationItem,
    TextField, SelectField, MenuItem, DatePicker
} from "material-ui";
import { PictureField } from "modules/components";
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Col, Row, Container } from "react-grid-system";

import { PageTitle } from "applications/main/components"
import EditInfos from "./../../components/Edit_Infos";

import * as areIntlLocalesSupported from 'intl-locales-supported';
let DateTimeFormat;
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/fr');
    require('intl/locale-data/jsonp/fa-IR');
}
import * as moment from "moment";

interface IAddParams {
    id?: number
}

interface IAddProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    params?: IAddParams
    onChangeParams?: (params: IAddParams) => void

    member?: ApiModels.Member
    onSave?: (member: ApiModels.Member) => void
}

interface IAddState {
    member?: ApiModels.Member
}

class Add extends React.PureComponent<IAddProps, IAddState>
{
    static defaultProps: IAddProps = {
        onSave: () => { }
    }

    constructor(props: IAddProps ) {
        super(props);
        this.state = {
            member: (props.params.id && props.member) ? { ...props.member } : new ApiModels.Member()
        };
        this.handle_onUpdate = this.handle_onUpdate.bind(this);
    }

    componentWillMount() {
        this.props.onChangeParams(this.props.params);
    }

    componentWillReceiveProps(props: IAddProps) {
        if (String(this.props.params.id) != String(props.params.id)) {
            props.onChangeParams(props.params);
            this.setState({
                ...this.state,
                member: (String(props.params.id) != (props.member ? String(props.member.id) : "0")) ? new ApiModels.Member() : { ...props.member }
            });
        }
    }

    getMeta(member: ApiModels.Member, col_key: string): string {
        let _index = member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
        if (_index > -1 && member.metas[_index].col_value && member.metas[_index].col_value.trim() != "") {
            return member.metas[_index].col_value;
        } else {
            return "";
        }
    }

    setMeta(member: ApiModels.Member, col_key: string, col_value: string) {
        let _index = member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
        let _member = { ...member };
        if (!_member.metas) _member.metas = [];
        if (_index > -1) {
            return {
                ...member,
                metas: member.metas.map((meta, index) => {
                    if (index == _index) {
                        return {
                            ...meta,
                            col_value: col_value
                        }
                    }
                    return meta;
                })
            };
        } else {
            return {
                ...member,
                metas: [
                    ...member.metas,
                    { col_key: col_key, col_value: col_value }
                ]
            };
        }
    }

    handle_onUpdate(member: ApiModels.Member) {
        this.setState({
            ...this.state,
            member: member
        });
    }


    render() {
        let __this = this;
        let _label = (
            <span>
                <i className="fa fa-user-plus" /> {
                    (this.state.member.first_name || this.state.member.last_name) ?
                    <span>{this.state.member.first_name} {this.state.member.last_name}</span> :
                    <span>Nouvel Adhérent</span>
                }
            </span>
        );
        if (this.props.params.id) {
            _label = (this.props.member && String(this.state.member.id) == String(this.props.params.id)) ?
                <span><i className="fa fa-user" /> {this.state.member.first_name} {this.state.member.last_name}</span>
                :
                <span><i className="fa fa-spin fa-refresh" /> Chargement...</span>
        }
        return (
            <div>
                <PageTitle label={_label} backButton
                    actions={
                        <div style={{ textAlign: "right" }}>
                            <FlatButton label="Enregistrer" primary onClick={() => { __this.props.onSave(__this.state.member); }} />
                        </div>
                    } />

                {(() => { /* Informations personnelles */ })()}
                <Card>
                    <CardHeader title="Informations Personnelles" />
                    <CardText>
                        <Row>
                            <Col md={2}>
                                {(() => { /* PHOTO */ })()}
                                <PictureField width="100%"  style={{ marginTop: 14 }} />
                            </Col>
                            <Col md={10}>
                                <Row>
                                    <Col md={2}>
                                        {(() => { /* GENRE */ })()}
                                        <SelectField fullWidth floatingLabelText="Genre"
                                            value={(__this.state.member.male == undefined) ? true : __this.state.member.male}
                                            onChange={(event, index, value) => { __this.handle_onUpdate({ ...__this.state.member, male: value }); }}>
                                            <MenuItem value={true} primaryText="Mr" />
                                            <MenuItem value={false} primaryText="Mme" />
                                        </SelectField>
                                    </Col>
                                    <Col md={5}>
                                        {(() => { /* NOM */ })()}
                                        <TextField floatingLabelText="Nom" fullWidth
                                            value={__this.state.member.last_name}
                                            onChange={(value) => { __this.handle_onUpdate({ ...__this.state.member, last_name: (value.target as HTMLInputElement).value }); }} />
                                    </Col>
                                    <Col md={5}>
                                        {(() => { /* PRENOM */ })()}
                                        <TextField floatingLabelText="Prénom" fullWidth
                                            value={__this.state.member.first_name}
                                            onChange={(value) => { __this.handle_onUpdate({ ...__this.state.member, first_name: (value.target as HTMLInputElement).value }); }} />
                                    </Col>
                                    <Col md={12}>
                                        {(() => { /* DATE DE NAISSANCE */ })()}
                                        <DatePicker floatingLabelText="Date de naissance" fullWidth maxDate={new Date()}
                                            locale="fr"
                                            formatDate={new DateTimeFormat('fr', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            }).format}
                                            DateTimeFormat={DateTimeFormat}
                                            value={moment(__this.state.member.birthday).toDate()}
                                            onChange={(event, date) => { __this.handle_onUpdate({ ...__this.state.member, birthday: date }) }} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}>
                                {(() => { /* LICENCE */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-id-badge" /> Licence</span>} fullWidth
                                        value={__this.getMeta(__this.state.member, "licence")}
                                        onChange={(value) => { __this.handle_onUpdate(__this.setMeta(__this.state.member, "licence", (value.target as HTMLInputElement).value)); }} />
                            
                            </Col>
                        </Row>
                    </CardText>
                </Card>
                <br />

                {(() => { /* Contacts */ })()}
                <Card>
                    <CardHeader title="Contacts" />
                    <CardText>
                        <Row>
                            <Col md={12}>
                                {(() => { /* ADRESSE */ })()}
                                <TextField floatingLabelText="Adresse" multiLine rows={2} fullWidth
                                    value={__this.state.member.adress}
                                    onChange={(value) => { __this.handle_onUpdate({ ...__this.state.member, adress: (value.target as HTMLInputElement).value }); }} />
                            </Col>
                            <Col md={4}>
                                {(() => { /* CODE POSTAL */ })()}
                                <TextField floatingLabelText="Code Postal" fullWidth
                                    value={__this.state.member.postalcode}
                                    onChange={(value) => { __this.handle_onUpdate({ ...__this.state.member, postalcode: (value.target as HTMLInputElement).value }); }} />
                            </Col>
                            <Col md={8}>
                                {(() => { /* VILLE */ })()}
                                <TextField floatingLabelText="Ville" fullWidth
                                    value={__this.state.member.city}
                                    onChange={(value) => { __this.handle_onUpdate({ ...__this.state.member, city: (value.target as HTMLInputElement).value }); }} />
                            </Col>
                            <Col md={12}>
                                {(() => { /* TELEPHONE DOMICILE */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-phone" /> Téléphone</span>} fullWidth
                                    value={__this.getMeta(this.state.member, "phone_first")}
                                    onChange={(value) => { __this.handle_onUpdate(__this.setMeta(this.state.member, "phone_first", (value.target as HTMLInputElement).value)); }} />
                                {(() => { /* TELEPHONE MOBILE */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-mobile" /> Téléphone Mobile</span>} fullWidth
                                    value={__this.getMeta(this.state.member, "phone_second")}
                                    onChange={(value) => { __this.handle_onUpdate(__this.setMeta(this.state.member, "phone_second", (value.target as HTMLInputElement).value)); }} />
                                {(() => { /* EMAIL */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-envelope" /> E-mail</span>} fullWidth
                                    value={__this.getMeta(this.state.member, "email")}
                                    onChange={(value) => { __this.handle_onUpdate(__this.setMeta(this.state.member, "email", (value.target as HTMLInputElement).value)); }} />
                            </Col>
                        </Row>
                    </CardText>
                </Card>
                <br />

                {(() => { /* Autres */ })()}
                <Card>
                    <CardHeader title="Autres" />
                    <CardText>
                        <Row>
                            <Col md={12}>
                                {(() => { /* EMPLOI */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-briefcase" /> Emploi</span>} fullWidth
                                    value={__this.getMeta(this.state.member, "job")}
                                    onChange={(value) => { __this.handle_onUpdate(__this.setMeta(this.state.member, "job", (value.target as HTMLInputElement).value)); }} />
                                {(() => { /* SOCIETE */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-building" /> Société</span>} fullWidth
                                    value={__this.getMeta(this.state.member, "job_company")}
                                    onChange={(value) => { __this.handle_onUpdate(__this.setMeta(this.state.member, "job_company", (value.target as HTMLInputElement).value)); }} />
                                {(() => { /* COMMENTAIRES */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-comments" /> Commentaires</span>} fullWidth multiLine rows={4}
                                    value={__this.getMeta(this.state.member, "comments")}
                                    onChange={(value) => { __this.handle_onUpdate(__this.setMeta(this.state.member, "comments", (value.target as HTMLInputElement).value)); }} />
                            </Col>
                        </Row>
                    </CardText>
                </Card>
                <br />


            </div>
        );
    }



}

import { connect } from "react-redux";
import { IMembers_Reducer } from "./../../reducer";
import { IApp_Reducer } from "applications/main/reducer";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../../constants";
import * as Notifications from "modules/notifications/actions";
import { push, replace } from "react-router-redux"

interface IState extends IMembers_Reducer, IApp_Reducer { }

const mapStateToProps = (state: IState): IAddProps => {
    return {
        member: state.route_Members.memberSelected
    };
}

const mapDispatchToProps = (dispatch): IAddProps => {
    return {
        onChangeParams: (params: IAddParams) => {
            if (params.id) {
                dispatch(ApiActions.members.GetMemberById({
                    request_id: Constants.view_member,
                    Request: { id: params.id }
                }))
            }
        },
        onSave: (member) => {
            if (member.id == 0) {
                dispatch(ApiActions.members.AddMember({
                    request_id: Constants.edit_member,
                    Request: {
                        member: member
                    }
                })).then((member: ApiModels.Member) => {
                    dispatch(replace("/members/" + member.id));
                });
            } else {
                dispatch(ApiActions.members.UpdateMember({
                    request_id: Constants.edit_member,
                    Request: {
                        member: member
                    }
                })).then((member: ApiModels.Member) => {
                    dispatch(replace("/members/" + member.id));
                });
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(Add));