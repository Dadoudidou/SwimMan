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
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Col, Row, Container } from "react-grid-system";

import { PageTitle } from "applications/main/components"

import * as moment from "moment";

interface IAddParams {
    id?: number
}

interface IAddProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    params?: IAddParams
    onChangeParams?: (params: IAddParams) => void

    place?: ApiModels.Place
    onSave?: (place: ApiModels.Place) => void
}

interface IAddState {
    place?: ApiModels.Place
}

class Add extends React.PureComponent<IAddProps, IAddState>
{
    static defaultProps: IAddProps = {
        onSave: () => { }
    }

    constructor(props: IAddProps ) {
        super(props);
        this.state = {
            place: (props.params.id && props.place) ? { ...props.place } : new ApiModels.Place()
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
                place: (String(props.params.id) != (props.place ? String(props.place.id) : "0")) ? new ApiModels.Place() : { ...props.place }
            });
        }
    }

    

    handle_onUpdate(place: ApiModels.Place) {
        this.setState({
            ...this.state,
            place: place
        });
    }


    render() {
        let __this = this;
        let _label = (
            <span>
                <i className="fa fa-map-marker" /> {
                    (this.state.place.name) ?
                        <span>{this.state.place.name}</span> :
                        <span>Nouveau lieu</span>
                }
            </span>
        );
        if (this.props.params.id) {
            _label = (this.props.place && String(this.state.place.id) == String(this.props.params.id)) ?
                <span><i className="fa fa-map-marker" /> {this.state.place.name}</span>
                :
                <span><i className="fa fa-spin fa-refresh" /> Chargement...</span>
        }
        return (
            <div>
                <PageTitle label={_label} backButton
                    actions={
                        <div style={{ textAlign: "right" }}>
                            <FlatButton label="Enregistrer" primary onClick={() => { __this.props.onSave(__this.state.place); }} />
                        </div>
                    } />


                {(() => { /* Lieu */ })()}
                <Card>
                    <CardText>
                        <Row>
                            <Col md={12}>
                                {(() => { /* NOM */ })()}
                                <TextField floatingLabelText="Nom" fullWidth
                                    value={__this.state.place.name}
                                    onChange={(value) => { __this.handle_onUpdate({ ...__this.state.place, name: (value.target as HTMLInputElement).value }); }} />
                            </Col>
                            <Col md={12}>
                                {(() => { /* ADRESSE */ })()}
                                <TextField floatingLabelText="Adresse" multiLine rows={2} fullWidth
                                    value={__this.state.place.adress}
                                    onChange={(value) => { __this.handle_onUpdate({ ...__this.state.place, adress: (value.target as HTMLInputElement).value }); }} />
                            </Col>
                            <Col md={4}>
                                {(() => { /* CODE POSTAL */ })()}
                                <TextField floatingLabelText="Code Postal" fullWidth
                                    value={__this.state.place.postalcode}
                                    onChange={(value) => { __this.handle_onUpdate({ ...__this.state.place, postalcode: (value.target as HTMLInputElement).value }); }} />
                            </Col>
                            <Col md={8}>
                                {(() => { /* VILLE */ })()}
                                <TextField floatingLabelText="Ville" fullWidth
                                    value={__this.state.place.city}
                                    onChange={(value) => { __this.handle_onUpdate({ ...__this.state.place, city: (value.target as HTMLInputElement).value }); }} />
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
import { IPlaces_Reducer } from "./../../reducer";
import { IApp_Reducer } from "applications/main/reducer";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../../constants";
import * as Notifications from "modules/notifications/actions";
import { push, replace } from "react-router-redux"

interface IState extends IPlaces_Reducer, IApp_Reducer { }

const mapStateToProps = (state: IState): IAddProps => {
    return {
        place: state.route_Places.selectedPlace
    };
}

const mapDispatchToProps = (dispatch): IAddProps => {
    return {
        onChangeParams: (params: IAddParams) => {
            if (params.id) {
                dispatch(ApiActions.activities.GetPlaceById({
                    request_id: Constants.view_place,
                    Request: { id: params.id }
                }))
            }
        },
        onSave: (place) => {
            if (place.id == 0) {
                dispatch(ApiActions.activities.AddPlace({
                    request_id: Constants.edit_place,
                    Request: {
                        place: place
                    }
                })).then((place: ApiModels.Place) => {
                    dispatch(replace("/places/" + place.id));
                });
            } else {
                dispatch(ApiActions.activities.UpdatePlace({
                    request_id: Constants.edit_place,
                    Request: {
                        place: place
                    }
                })).then((place: ApiModels.Place) => {
                    dispatch(replace("/places/" + place.id));
                });
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(Add));