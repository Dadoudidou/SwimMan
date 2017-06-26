import * as React from "react";
import * as ApiModels from "modules/api/models";
import Layout from "applications/main/layouts/SidebarLeft";
import HeaderBarRight from "applications/main/partials/HeaderBarRight";
import SideBar from "applications/main/partials/SidebarMenu";
import { Paper, List, ListItem, makeSelectable, FontIcon, Subheader, IconButton, Dialog, FlatButton, RaisedButton, TextField } from "material-ui"
import { Col, Row, Container } from "react-grid-system";
import { PageTitle } from "applications/main/components"

let SelectableList = makeSelectable(List);

type __editingObjectType = ApiModels.ActivityTree | ApiModels.CategoryTree | ApiModels.SectionTree;
type __editingObjectStringType = "activity" | "category" | "section";

interface IActivitiesProps {
    onInit?: () => void
    categories?: ApiModels.CategoryTree[]
    seasonSelected?: ApiModels.Season

    onUpdateCategory?: (category: ApiModels.Category) => void
    onUpdateActivity?: (activity: ApiModels.Activity) => void
    onUpdateSection?: (section: ApiModels.Section) => void
}

interface IActivitiesState {
    editingObject?: __editingObjectType
    editingObjectType?: __editingObjectStringType
    editingObjectParent?: any
}

class Activities extends React.PureComponent<IActivitiesProps, IActivitiesState>
{

    static defaultProps: IActivitiesProps = {
        onInit: () => { },
        onUpdateActivity: () => { },
        onUpdateCategory: () => { },
        onUpdateSection: () => { },
        categories: []
    }

    constructor(props: IActivitiesProps ) {
        super(props);
        this.state = { editingObject: undefined };
        this.handle_onClose = this.handle_onClose.bind(this);
        this.handle_onSave = this.handle_onSave.bind(this);
        this.handle_onEdit = this.handle_onEdit.bind(this);
    }

    componentDidMount() {
        this.props.onInit();
    }

    componentWillReceiveProps(nextProps: IActivitiesProps) {
        if (this.props.seasonSelected != nextProps.seasonSelected) {
            this.props.onInit();
        }
    }

    handle_onChange(obj: __editingObjectType) {
        this.setState({
            ...this.state,
            editingObject: obj
        });
    }

    handle_onEdit(obj: __editingObjectType, type: __editingObjectStringType, parent: any) {
        this.setState({
            ...this.state,
            editingObject: obj,
            editingObjectType: type,
            editingObjectParent: parent
        });
    }

    handle_onClose() {
        this.setState({
            ...this.state,
            editingObject: undefined,
            editingObjectParent: undefined,
            editingObjectType: undefined
        });
    }

    handle_onSave() {
        let _retour: __editingObjectType = undefined;
        switch (this.state.editingObjectType) {
            case "category":
                _retour = new ApiModels.Category({
                    id: this.state.editingObject.id,
                    name: this.state.editingObject.name,
                    season: this.state.editingObjectParent
                });
                this.props.onUpdateCategory(_retour as any);
                break;
            case "activity":
                _retour = new ApiModels.Activity({
                    id: this.state.editingObject.id,
                    name: this.state.editingObject.name,
                    category: this.state.editingObjectParent
                });
                this.props.onUpdateActivity(_retour as any);
                break;
            case "section":
                _retour = new ApiModels.Section({
                    id: this.state.editingObject.id,
                    name: this.state.editingObject.name,
                    activity: this.state.editingObjectParent
                });
                this.props.onUpdateSection(_retour as any)
                break;
        }
        this.handle_onClose();
    }

    renderCategories() {
        let __this = this;
        return [
            ...this.props.categories.map(category => {
                return (
                    <ListItem
                        key={category.id}
                        leftIcon={<FontIcon className="fa fa-folder-o" style={{ fontSize: 18, top: 3 }} />}
                        rightIconButton={
                            <IconButton
                                tooltip="Modifier la catégorie"
                                iconClassName="fa fa-pencil"
                                iconStyle={{ fontSize: 18 }}
                                onTouchTap={() => { __this.handle_onEdit(category, "category", __this.props.seasonSelected) }} />
                        }
                        primaryText={category.name}
                        primaryTogglesNestedList
                        nestedItems={__this.renderActivities(category)} />
                );
            }),
            (
                <ListItem
                    key="add"
                    style={{ fontSize: 12 }}
                    leftIcon={<FontIcon className="fa fa-plus" style={{ fontSize: 12, top: 6 }} />}
                    primaryText="Ajouter une catégorie"
                    onTouchTap={() => { __this.handle_onEdit(new ApiModels.Category(), "category", __this.props.seasonSelected) }} />
            )
        ];
    }

    renderActivities(category: ApiModels.CategoryTree) {
        let __this = this;
        return [
            ...(!category.activities) ? [] : category.activities.map(activity => {
                return (
                    <ListItem
                        key={activity.id}
                        leftIcon={<FontIcon className="fa fa-futbol-o" style={{ fontSize: 18, top: 3 }} />}
                        rightIconButton={
                            <IconButton
                                tooltip="Modifier l'activité"
                                iconClassName="fa fa-pencil"
                                iconStyle={{ fontSize: 18 }}
                                onTouchTap={() => { __this.handle_onEdit(activity, "activity", category) }} />
                        }
                        primaryText={activity.name}
                        primaryTogglesNestedList
                        nestedItems={__this.renderSections(activity)} />
                );
            }),
            (
                <ListItem
                    key="add"
                    style={{ fontSize: 12 }}
                    leftIcon={<FontIcon className="fa fa-plus" style={{ fontSize:12, top: 6 }} />}
                    primaryText="Ajouter une activité"
                    onTouchTap={() => { __this.handle_onEdit(new ApiModels.Activity(), "activity", category) }} />
            )
        ];

    }

    renderSections(activity: ApiModels.ActivityTree) {
        let __this = this;
        return [
            ...(!activity.sections) ? [] : activity.sections.map(section => {
                return (
                    <ListItem
                        key={section.id}
                        leftIcon={<FontIcon className="fa fa-tag" style={{ fontSize: 18, top: 3 }} />}
                        rightIconButton={
                            <IconButton
                                tooltip="Modifier la section"
                                iconClassName="fa fa-pencil"
                                iconStyle={{ fontSize: 18 }}
                                onTouchTap={() => { __this.handle_onEdit(section, "section", activity) }} />
                        }
                        primaryText={section.name} />
                );
            }),
            (
                <ListItem
                    key="add"
                    style={{ fontSize: 12 }}
                    leftIcon={<FontIcon className="fa fa-plus" style={{ fontSize: 12, top: 6 }} />}
                    primaryText="Ajouter une section"
                    onTouchTap={() => { __this.handle_onEdit(new ApiModels.Section(), "section", activity) }} />
            )
        ];
    }

    renderDialog() {

        if (!this.state.editingObject) return <div></div>;

        let __this = this;

        let _actions = [
            <FlatButton label="Annuler" primary={true} onTouchTap={this.handle_onClose} />,
            <FlatButton label="Enregistrer" primary={true} keyboardFocused={true} onTouchTap={this.handle_onSave} />
        ];

        return (
            <Dialog
                open={this.state.editingObject != undefined}
                actions={_actions}
                modal={false}
                onRequestClose={this.handle_onClose}
                title={(this.state.editingObject.id == 0) ? "Ajouter" : "Editer"}>

                <TextField floatingLabelText="Nom"
                    fullWidth
                    value={this.state.editingObject.name}
                    onChange={(event) => { __this.handle_onChange({ ...__this.state.editingObject, name: (event.target as  any).value }) }} />

            </Dialog>
        );
    }

    render() {
        let _label = "Activités ";
        if (this.props.seasonSelected) {
            _label += this.props.seasonSelected.name;
        }
        return (
            <Layout
                sidebarContent={<SideBar />}
                headerBar_right={<HeaderBarRight />}>
                <PageTitle label={_label} />
                <Row>
                    <Col md={12}>
                        {
                            (this.props.seasonSelected) ?
                                <Paper zDepth={1} >
                                    <List>
                                        {this.renderCategories()}
                                    </List>
                                </Paper>
                                :
                                <div>
                                    Chargement ...
                                </div>
                        }
                        
                    </Col>
                </Row>
                {this.renderDialog()}
            </Layout>
        );
    }
}


import { connect } from "react-redux";
import { IActivities_Reducer } from "./reducer";
import { IApp_Reducer } from "./../../reducer";
import * as Constants from "./constants";
import * as ApiActions from "modules/api/actions";

interface IState extends IActivities_Reducer, IApp_Reducer { }
import { getStore } from "modules/redux";

const mapStateToProps = (state: IState): IActivitiesProps => {
    return {
        categories: state.route_Activities.categories,
        seasonSelected: state.application.seasonSelected
    };
}

let _init = (dispatch) => {
    let store = getStore();
    let state: IState = store.getState();
    let season = state.application.seasonSelected;
    if (season != undefined) {
        dispatch(ApiActions.activities.GetTree({
            request_id: Constants.get_categories,
            Request: {
                season: season
            }
        }));
    }
}

const mapDispatchToProps = (dispatch): IActivitiesProps => {
    return {
        onInit: () => {
            _init(dispatch);
        },

        onUpdateActivity: (activity) => {
            dispatch(ApiActions.activities.UpdateActivity({
                request_id: Constants.update_activity,
                Request: { activity: activity }
            })).then(() => {
                _init(dispatch);
            });
        },
        onUpdateCategory: (category) => {
            dispatch(ApiActions.activities.UpdateCategory({
                request_id: Constants.update_category,
                Request: { category: category }
            })).then(() => {
                _init(dispatch);
            });
        },
        onUpdateSection: (section) => {
            dispatch(ApiActions.activities.UpdateSection({
                request_id: Constants.update_section,
                Request: { section: section }
            })).then(() => {
                _init(dispatch);
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities);