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
import { Col, Row, Container } from "react-grid-system";
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
import { getMeta, setMeta } from "applications/main/helpers/members"

export interface IFormErrors {
    sexe?: string
    last_name?: string
    first_name?: string
    birthday?: string
    licence?: string
    adress?: string
    postalcode?: string
    city?: string
    phone_first?: string
    phone_second?: string
    email?: string
    job?: string
    job_company?: string
    comments?: string
}

interface IFormProps {
    member?: ApiModels.Member
    onUpdate?: (member?: ApiModels.Member) => void
    errors?: IFormErrors
}

interface IFormState {
}

class Form extends React.PureComponent<IFormProps, IFormState>
{
    // set the default props for the class
    static defaultProps: IFormProps = {
        onUpdate: () => { },
        errors: {}
    }

    constructor(props: IFormProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IFormProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IFormProps, nextState: IFormState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IFormProps, prevState: IFormState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        return (
            <div>
                {(() => { /* Informations personnelles */ })()}
                <Card>
                    <CardHeader title="Informations Personnelles" />
                    <CardText>
                        <Row>
                            <Col md={2}>
                                {(() => { /* PHOTO */ })()}
                                <PictureField width="100%" style={{ marginTop: 14 }} />
                            </Col>
                            <Col md={10}>
                                <Row>
                                    <Col md={2}>
                                        {(() => { /* GENRE */ })()}
                                        <SelectField fullWidth floatingLabelText="Genre"
                                            errorText={this.props.errors.sexe}
                                            value={(__this.props.member.male == undefined) ? false : __this.props.member.male}
                                            onChange={(event, index, value) => {__this.props.onUpdate({ ...__this.props.member, male: value }); }}>
                                            <MenuItem value={true} primaryText="Mr" />
                                            <MenuItem value={false} primaryText="Mme" />
                                        </SelectField>
                                    </Col>
                                    <Col md={5}>
                                        {(() => { /* NOM */ })()}
                                        <TextField floatingLabelText="Nom" fullWidth
                                            errorText={this.props.errors.last_name}
                                            value={__this.props.member.last_name}
                                            onChange={(value) => {__this.props.onUpdate({ ...__this.props.member, last_name: (value.target as HTMLInputElement).value }); }} />
                                    </Col>
                                    <Col md={5}>
                                        {(() => { /* PRENOM */ })()}
                                        <TextField floatingLabelText="Prénom" fullWidth
                                            errorText={this.props.errors.first_name}
                                            value={__this.props.member.first_name}
                                            onChange={(value) => {__this.props.onUpdate({ ...__this.props.member, first_name: (value.target as HTMLInputElement).value }); }} />
                                    </Col>
                                    <Col md={12}>
                                        {(() => { /* DATE DE NAISSANCE */ })()}
                                        <DatePicker floatingLabelText="Date de naissance" fullWidth maxDate={new Date()}
                                            locale="fr"
                                            errorText={this.props.errors["birthday"]}
                                            formatDate={new DateTimeFormat('fr', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            }).format}
                                            DateTimeFormat={DateTimeFormat}
                                            value={moment(__this.props.member.birthday).toDate()}
                                            onChange={(event, date) => {__this.props.onUpdate({ ...__this.props.member, birthday: date }) }} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}>
                                {(() => { /* LICENCE */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-id-badge" /> Licence</span>} fullWidth
                                    errorText={this.props.errors["licence"]}
                                    value={getMeta(__this.props.member, "licence") as string}
                                    onChange={(value) => {__this.props.onUpdate(setMeta(__this.props.member, "licence", (value.target as HTMLInputElement).value)); }} />

                            </Col>
                        </Row>
                    </CardText>
                </Card>
                <br />

                {(() => { /* Contacts */ })()}
                <Card >
                    <CardHeader title="Contacts" actAsExpander={true} showExpandableButton={true} />
                    <CardText expandable>
                        <Row>
                            <Col md={12}>
                                {(() => { /* ADRESSE */ })()}
                                <TextField floatingLabelText="Adresse" multiLine rows={2} fullWidth
                                    errorText={this.props.errors["adress"]}
                                    value={__this.props.member.adress}
                                    onChange={(value) => {__this.props.onUpdate({ ...__this.props.member, adress: (value.target as HTMLInputElement).value }); }} />
                            </Col>
                            <Col md={4}>
                                {(() => { /* CODE POSTAL */ })()}
                                <TextField floatingLabelText="Code Postal" fullWidth
                                    errorText={this.props.errors["postalcode"]}
                                    value={__this.props.member.postalcode}
                                    onChange={(value) => {__this.props.onUpdate({ ...__this.props.member, postalcode: (value.target as HTMLInputElement).value }); }} />
                            </Col>
                            <Col md={8}>
                                {(() => { /* VILLE */ })()}
                                <TextField floatingLabelText="Ville" fullWidth
                                    errorText={this.props.errors["city"]}
                                    value={__this.props.member.city}
                                    onChange={(value) => {__this.props.onUpdate({ ...__this.props.member, city: (value.target as HTMLInputElement).value }); }} />
                            </Col>
                            <Col md={12}>
                                {(() => { /* TELEPHONE DOMICILE */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-phone" /> Téléphone</span>} fullWidth
                                    errorText={this.props.errors["phone_first"]}
                                    value={getMeta(__this.props.member, "phone_first") as string}
                                    onChange={(value) => {__this.props.onUpdate(setMeta(__this.props.member, "phone_first", (value.target as HTMLInputElement).value)); }} />
                                {(() => { /* TELEPHONE MOBILE */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-mobile" /> Téléphone Mobile</span>} fullWidth
                                    errorText={this.props.errors["phone_second"]}
                                    value={getMeta(__this.props.member, "phone_second") as string}
                                    onChange={(value) => {__this.props.onUpdate(setMeta(__this.props.member, "phone_second", (value.target as HTMLInputElement).value)); }} />
                                {(() => { /* EMAIL */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-envelope" /> E-mail</span>} fullWidth
                                    errorText={this.props.errors["email"]}
                                    value={getMeta(__this.props.member, "email") as string}
                                    onChange={(value) => {__this.props.onUpdate(setMeta(__this.props.member, "email", (value.target as HTMLInputElement).value)); }} />
                            </Col>
                        </Row>
                    </CardText>
                </Card>
                <br />

                {(() => { /* Autres */ })()}
                <Card>
                    <CardHeader title="Autres" actAsExpander={true} showExpandableButton={true} />
                    <CardText expandable>
                        <Row>
                            <Col md={12}>
                                {(() => { /* EMPLOI */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-briefcase" /> Emploi</span>} fullWidth
                                    errorText={this.props.errors["job"]}
                                    value={getMeta(__this.props.member, "job") as string}
                                    onChange={(value) => {__this.props.onUpdate(setMeta(__this.props.member, "job", (value.target as HTMLInputElement).value)); }} />
                                {(() => { /* SOCIETE */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-building" /> Société</span>} fullWidth
                                    errorText={this.props.errors["job_company"]}
                                    value={getMeta(__this.props.member, "job_company") as string}
                                    onChange={(value) => {__this.props.onUpdate(setMeta(__this.props.member, "job_company", (value.target as HTMLInputElement).value)); }} />
                                {(() => { /* COMMENTAIRES */ })()}
                                <TextField floatingLabelText={<span><i className="fa fa-comments" /> Commentaires</span>} fullWidth multiLine rows={4}
                                    errorText={this.props.errors["comments"]}
                                    value={getMeta(__this.props.member, "comments") as string}
                                    onChange={(value) => {__this.props.onUpdate(setMeta(__this.props.member, "comments", (value.target as HTMLInputElement).value)); }} />
                            </Col>
                        </Row>
                    </CardText>
                </Card>
                <br />
            </div>
        );
    }
}

export default Form;