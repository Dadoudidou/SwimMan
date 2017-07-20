import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment";

import { Paper, List, ListItem, Subheader } from "material-ui";
import muiThemeable from 'material-ui/styles/muiThemeable';

interface IInfosProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    member: ApiModels.Member
}

interface IInfosState {
}

class Infos extends React.PureComponent<IInfosProps, IInfosState>
{
    // set the default props for the class
    static defaultProps: IInfosProps = {
        member: undefined
    }

    constructor(props: IInfosProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IInfosProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IInfosProps, nextState: IInfosState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IInfosProps, prevState: IInfosState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

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
        if (!this.props.member) return <div></div>
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
}

export default muiThemeable()(Infos);