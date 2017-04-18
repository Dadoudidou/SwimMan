import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment";

import {
    Divider, Subheader, List, ListItem,
    BottomNavigation, BottomNavigationItem,
    TextField, SelectField, MenuItem, DatePicker
} from "material-ui";
import muiThemeable from 'material-ui/styles/muiThemeable';
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

interface IEdit_InfosProps {
    member: ApiModels.Member
    onUpdate?: (member?: ApiModels.Member) => void
}

interface IEdit_InfosState {

}

class Edit_Infos extends React.Component<IEdit_InfosProps, IEdit_InfosState>
{
    static defaultProps: Partial<IEdit_InfosProps> = {
        onUpdate: (member) => { }
    }
    constructor(props: IEdit_InfosProps ) {
        super(props);
        this.state = {};
    }

    getMeta(col_key: string): string {
        let _index = this.props.member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
        if (_index > -1 && this.props.member.metas[_index].col_value && this.props.member.metas[_index].col_value.trim() != "") {
            return this.props.member.metas[_index].col_value;
        } else {
            return "";
        }
    }

    setMeta(col_key: string, col_value: string) {
        let _index = this.props.member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
        let _member = { ...this.props.member };
        if (!_member.metas) _member.metas = [];
        if (_index > -1) {
            this.props.onUpdate({
                ...this.props.member,
                metas: this.props.member.metas.map((meta, index) => {
                    if (index == _index) {
                        return {
                            ...meta,
                            col_value: col_value
                        }
                    }
                    return meta;
                })
            })
        } else {
            this.props.onUpdate({
                ...this.props.member,
                metas: [
                    ...this.props.member.metas,
                    { col_key: col_key, col_value: col_value }
                ]
            })
        }
    }

    render() {
        let _member = this.props.member;
        let __this = this;
        return (
            <div style={{ padding: "1em" }}>
                <Row>
                    <Col md={2}>
                        <div style={{ width: "100%", height: 300, backgroundColor: "#aaa", color: "#fff", position: "relative" }}>
                            <i className="fa fa-camera" style={{ position: "absolute", top: "50%", left: "50%", fontSize: "2em", marginLeft: "-0.5em", marginTop: "-0.5em", opacity: 0.5 }} />
                        </div>
                    </Col>
                    <Col md={10}>
                        <Row>
                            <Col md={6}>
                                <Row>
                                    <Col md={2}>
                                        <SelectField fullWidth floatingLabelText="Genre"
                                            value={__this.props.member.male}
                                            onChange={(event, index, value) => { __this.props.onUpdate({ ...__this.props.member, male: value }); }}>
                                            <MenuItem value={true} primaryText="Mr" />
                                            <MenuItem value={false} primaryText="Mme" />
                                        </SelectField>
                                    </Col>
                                    <Col md={5}>
                                        <TextField floatingLabelText="Nom" fullWidth
                                            value={__this.props.member.last_name}
                                            onChange={(value) => { __this.props.onUpdate({ ...__this.props.member, last_name: (value.target as HTMLInputElement).value }); }} />
                                    </Col>
                                    <Col md={5}>
                                        <TextField floatingLabelText="Prénom" fullWidth
                                            value={__this.props.member.first_name}
                                            onChange={(value) => { __this.props.onUpdate({ ...__this.props.member, first_name: (value.target as HTMLInputElement).value }); }} />
                                    </Col>
                                    <Col md={12}>
                                        <DatePicker floatingLabelText="Date de naissance" fullWidth maxDate={new Date()}
                                            locale="fr"
                                            formatDate={new DateTimeFormat('fr', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            }).format}
                                            DateTimeFormat={DateTimeFormat}
                                            value={moment(__this.props.member.birthday).toDate()}
                                            onChange={(event, date) => { __this.props.onUpdate({ ...__this.props.member, birthday: date }) }} />
                                    </Col>
                                </Row>
                                <TextField floatingLabelText={<span><i className="fa fa-id-badge" /> Licence</span>} fullWidth
                                    value={__this.getMeta("licence")}
                                    onChange={(value) => { __this.setMeta("licence", (value.target as HTMLInputElement).value); }} />
                                <TextField floatingLabelText="Adresse" multiLine rows={2} fullWidth
                                    value={__this.props.member.adress}
                                    onChange={(value) => { __this.props.onUpdate({ ...__this.props.member, adress: (value.target as HTMLInputElement).value }); }} />
                                <Row>
                                    <Col md={4}>
                                        <TextField floatingLabelText="Code Postal" fullWidth
                                            value={__this.props.member.postalcode}
                                            onChange={(value) => { __this.props.onUpdate({ ...__this.props.member, postalcode: (value.target as HTMLInputElement).value }); }} />
                                    </Col>
                                    <Col md={8}>
                                        <TextField floatingLabelText="Ville" fullWidth
                                            value={__this.props.member.city}
                                            onChange={(value) => { __this.props.onUpdate({ ...__this.props.member, city: (value.target as HTMLInputElement).value }); }}/>
                                    </Col>
                                </Row>

                                <TextField floatingLabelText={<span><i className="fa fa-phone" /> Téléphone</span>} fullWidth
                                    value={__this.getMeta("phone_first")}
                                    onChange={(value) => { __this.setMeta("phone_first", (value.target as HTMLInputElement).value); }} />
                                <TextField floatingLabelText={<span><i className="fa fa-mobile" /> Téléphone Mobile</span>} fullWidth
                                    value={__this.getMeta("phone_second")}
                                    onChange={(value) => { __this.setMeta("phone_second", (value.target as HTMLInputElement).value); }}/>
                                <TextField floatingLabelText={<span><i className="fa fa-envelope" /> E-mail</span>} fullWidth
                                    value={__this.getMeta("email")}
                                    onChange={(value) => { __this.setMeta("email", (value.target as HTMLInputElement).value); }}/>

                            </Col>
                            <Col md={6}>
                                <TextField floatingLabelText={<span><i className="fa fa-briefcase" /> Emploi</span>} fullWidth
                                    value={__this.getMeta("job")}
                                    onChange={(value) => { __this.setMeta("job", (value.target as HTMLInputElement).value); }}/>
                                <TextField floatingLabelText={<span><i className="fa fa-building" /> Société</span>} fullWidth
                                    value={__this.getMeta("job_company")}
                                    onChange={(value) => { __this.setMeta("job_company", (value.target as HTMLInputElement).value); }} />
                                <TextField floatingLabelText={<span><i className="fa fa-comments" /> Commentaires</span>} fullWidth multiLine rows={4}
                                    value={__this.getMeta("comments")}
                                    onChange={(value) => { __this.setMeta("comments", (value.target as HTMLInputElement).value); }} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Edit_Infos;