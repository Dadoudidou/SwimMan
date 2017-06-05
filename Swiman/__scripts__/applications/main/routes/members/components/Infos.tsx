import * as React from "react";
import * as ApiModels from "modules/api/models";

import {
    RaisedButton
} from "material-ui";
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Col, Row, Container } from "react-grid-system";

import ShowInfos from "./Show_Infos";
import EditInfos from "./Edit_Infos";

interface IInfosProps {
    member?: ApiModels.Member

    showEditButton?: boolean

    onEditMode?: () => void
    onEditSave?: (member: ApiModels.Member) => void
    onCancel?: () => void
}

interface IInfosState {
    edit?: boolean
    edit_member?: ApiModels.Member
}

class Infos extends React.PureComponent<IInfosProps, IInfosState>
{
    static defaultProps: IInfosProps = {
        onCancel: () => { },
        onEditSave: () => { },
        onEditMode: () => { }
    }
    constructor(props: IInfosProps ) {
        super(props);
        this.state = {};
        this.handle_onEditClick = this.handle_onEditClick.bind(this);
        this.handle_onEditCancel = this.handle_onEditCancel.bind(this);
        this.handle_onEditSave = this.handle_onEditSave.bind(this);
        this.handle_onEditUpdate = this.handle_onEditUpdate.bind(this);
    }

    isEditMode() {
        return this.state.edit;
    }

    handle_onEditClick() {
        this.setState({
            ...this.state,
            edit: true,
            edit_member: (this.props.member) ? JSON.parse(JSON.stringify(this.props.member)) : new ApiModels.Member()
        });
        this.props.onEditMode();
    }

    handle_onEditSave() {
        this.props.onEditSave(this.state.edit_member);
        this.setState({
            ...this.state,
            edit: false,
            edit_member: undefined
        })
    }

    handle_onEditCancel() {
        this.setState({
            ...this.state,
            edit: false,
            edit_member: undefined
        })
        this.props.onCancel();
    }

    handle_onEditUpdate(member: ApiModels.Member) {
        this.setState({
            ...this.state,
            edit_member: member
        });
    }

    render() {
        return (
            <div>
                {(!this.state.edit) ? this.renderShow() : this.renderEdit()}
            </div>
        );
    }

    renderEdit() {
        return (
            <div>
                <EditInfos member={this.state.edit_member} onUpdate={this.handle_onEditUpdate} />
                <div style={{ textAlign: "right", padding: "1em" }}>
                    <RaisedButton label="Annuler" onClick={this.handle_onEditCancel} />
                    <span>  </span>
                    <RaisedButton label="Enregistrer" onClick={this.handle_onEditSave} />
                </div>
            </div>
        );
    }

    renderShow() {
        return (
            <div>
                <ShowInfos member={this.props.member} />
                {
                    (this.props.showEditButton) ?
                        <div style={{ textAlign: "right", padding: "1em" }}>
                            <RaisedButton label="Modifier" onClick={this.handle_onEditClick} />
                        </div>
                        : undefined
                }
            </div>
        );
    }
}

export default Infos;