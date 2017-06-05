import * as React from "react";
import * as ApiModels from "modules/api/models";
import {
    Divider, Subheader, List, ListItem,
    BottomNavigation, BottomNavigationItem
} from "material-ui";
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Col, Row, Container } from "react-grid-system";
import * as moment from "moment";

interface IShow_InfosProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    member: ApiModels.Member
}

interface IShow_InfosState {
    
}

class Show_Infos extends React.PureComponent<IShow_InfosProps, IShow_InfosState>
{
    constructor(props: IShow_InfosProps ) {
        super(props);
        this.state = {};
    }

    getNotInformed() {
        return (
            <span style={{ color: this.props.muiTheme.palette.disabledColor }}>non renseigné</span>
        );
    }

    getMeta(col_key: string): React.ReactNode {
        if (!this.props.member) return <span></span>;

        let _index = this.props.member.metas.map(x => x.col_key.toLowerCase()).indexOf(col_key.toLowerCase());
        if (_index > -1 && this.props.member.metas[_index].col_value && this.props.member.metas[_index].col_value.trim() != "") {
            return (
                <span dangerouslySetInnerHTML={{ __html: this.props.member.metas[_index].col_value.replace(/\n/g, "<br />") }} />
            );
        } else {
            return this.getNotInformed();
        }
    }

    render() {
        let _member = this.props.member;
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
                                    <ListItem leftIcon={<i className="fa fa-phone" />}>{this.getMeta("phone_first")}</ListItem>
                                    <ListItem leftIcon={<i className="fa fa-mobile" />}>{this.getMeta("phone_second")}</ListItem>
                                    <ListItem leftIcon={<i className="fa fa-envelope" />}>{this.getMeta("email")}</ListItem>
                                </List>
                            </Col>
                            <Col md={6}>
                                <List>
                                    <Subheader>Emploi</Subheader>
                                    <ListItem leftIcon={<i className="fa fa-briefcase" />}>{this.getMeta("job")}</ListItem>
                                    <ListItem leftIcon={<i className="fa fa-building" />}>{this.getMeta("job_company")}</ListItem>
                                    <Subheader>Commentaires</Subheader>
                                    <ListItem leftIcon={<i className="fa fa-comments" />}>{this.getMeta("comments")}</ListItem>
                                </List>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default muiThemeable()(Show_Infos);