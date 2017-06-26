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


interface IViewParams {
    id?: number
}

interface IViewProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    params?: IViewParams
    place?: ApiModels.Place

    onChangeParams?: (params: IViewParams) => void
    onUpdateMember?: (member: ApiModels.Member) => void

}

interface IViewState {
    selectedTab?: string
    editInfos?: boolean
}

class View extends React.PureComponent<IViewProps, IViewState>
{
    static defaultProps: IViewProps = {
        onChangeParams: () => { },
        onUpdateMember: () => { }
    }

    refs: {
        [key: string]: any,
        infos: any
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
    
    render() {
        let __this = this;
        if (!this.props.place) return <div>Chargement ...</div>
        return (
            <Container fluid>
                <Row>
                    <Col md={12}>

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

                        <Tabs
                            className="tabs-center"
                            tabItemContainerStyle={{ backgroundColor: "transparent" }}
                            inkBarStyle={{}}>
                            <Tab label="Lieu" value="infos" style={{ textTransform: "capitalize", color: this.props.muiTheme.palette.secondaryTextColor }}>
                                <br />
                                {this.renderInfos()}
                            </Tab>
                            <Tab label="Activités" value="adhesions" style={{ textTransform: "capitalize", color: this.props.muiTheme.palette.secondaryTextColor }}>
                                <br />
                            </Tab>
                        </Tabs>
                       

                    </Col>
                    
                </Row>
                
            </Container>
        );
    }

    renderInfos() {
        let _place = this.props.place;
        return (
            <div>
                <Paper zDepth={1}>
                    <List>
                        <ListItem>{_place.name}</ListItem>
                        <Subheader>Adresse</Subheader>
                        <ListItem leftIcon={<i className="fa fa-map-marker" />}>
                            {
                                (_place.adress) ?
                                    <span style={{ lineHeight: "1.5em" }}>
                                        <span dangerouslySetInnerHTML={{ __html: _place.adress.replace(/\n/g, "<br />") }} />
                                        <br />
                                        {_place.postalcode} - {_place.city}
                                    </span>
                                    : this.getNotInformed()
                            }
                        </ListItem>
                    </List>

                    {(() => { /* GOOGLE MAPS */ })()}

                    {(() => { /* ACTIONS */ })()}
                    <br />
                    <br />
                    <div style={{ textAlign: "right" }}>
                        <RaisedButton label="Modifier les informations" href={"#/places/add/" + this.props.place.id} />
                        <span>&nbsp;&nbsp;</span>
                    </div>
                    <br />

                </Paper>
            </div>
        );
    }

   
}


import { connect } from "react-redux";
import { IPlaces_Reducer } from "./../../reducer";
import { IApp_Reducer } from "applications/main/reducer";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../../constants";
import * as Notifications from "modules/notifications/actions";

interface IState extends IPlaces_Reducer, IApp_Reducer { }

const mapStateToProps = (state: IState): IViewProps => {
    return {
        place: state.route_Places.selectedPlace
    };
}

const mapDispatchToProps = (dispatch): IViewProps => {
    return {
        onChangeParams: (params: IViewParams) => {
            dispatch(ApiActions.activities.GetPlaceById({
                request_id: Constants.view_place,
                Request: {
                    id: params.id
                }
            }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(View));