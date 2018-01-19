import * as React from "react";
import { classNames } from "modules/classnames"
import { RouteComponentProps, withRouter } from "react-router"
import { graphql, ChildProps, compose, MutationFunc } from "react-apollo"
import gql from "graphql-tag"
import * as moment from "moment"

import Layout from "./../../Layouts/AppLayout";
import TitlePage from "app/Components/TitlePage";
import DataTable from "app/Components/Table/DataTable";
import AlertDialog from "app/Components/AlertDialog";

import { Button, IconButton, withStyles, WithStyles, StyledComponentProps } from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"
import GroupDialog from "./components/GroupDialog"

type TStyles = "iconButton"
const styles:StyleRulesCallback<TStyles> = theme => ({
    iconButton: { fontSize: "1rem", width: "3rem", height: "3rem" }
})

type ListData = {
    users: {
        groups: {
            id: number
            nom: string
            users: {
                id
            }[]
        }[]
    }
    
}

type ListProps = {

    addGroup: MutationFunc<any, { name: string }>
    updateGroup: MutationFunc<any, { id: number, name?: string }>
    removeGroup: MutationFunc<any, { id: number }>

}

type ListState = {
    editGroup?: { nom?: string }
}

class List extends React.PureComponent<ChildProps<ListProps & WithStyles<TStyles>, ListData>, ListState>
{
    state: ListState = { editGroup: undefined }
    removeGroupAlert: AlertDialog
    render(){
        if(this.props.data.loading) return <div>chargement</div>;
        if(this.props.data.error) return <div>error</div>;
        return (
            <Layout>
                <TitlePage 
                    titleName="Liste des groupes"
                    actions={
                        <div>
                            <Button onClick={() => { this.setState({ ...this.state, editGroup: {} }); }}>Ajouter un groupe</Button>
                        </div>
                    } />
                <DataTable 
                    hoverable
                    columns={[
                        { 
                            id: "id",
                            Header:"ID",
                            Data: (data) => data.id,
                            width: 10
                        },
                        { 
                            id: "nom",
                            Header:"Nom",
                            Data: (data) => data.nom,
                        },
                        {
                            id: "users",
                            Header: "Utilisateurs",
                            Data: (data) => data.users.length
                        },
                        { 
                            id: "actions",
                            Header:"",
                            Data: (data) => (
                                <div>
                                    <IconButton
                                        className={classNames(this.props.classes.iconButton)}
                                        onClick={() => { this.setState({ ...this.state, editGroup: data }); }}>
                                        <i className="fa fa-pencil" />
                                    </IconButton>
                                    <IconButton
                                        className={classNames(this.props.classes.iconButton)}
                                        onClick={() => { 
                                            this.removeGroupAlert.show({
                                                message: "Etes-vous sûr de supprimer ce groupe ?",
                                                actions: (
                                                    <div>
                                                        <Button onClick={() => { this.removeGroupAlert.hide(); }}>Annuler</Button>
                                                        <Button color="accent" 
                                                            onClick={() => {
                                                                this.removeGroupAlert.hide();
                                                                this.props.removeGroup({
                                                                    variables: { id: data.id }
                                                                })
                                                            }}>Supprimer le groupe</Button>
                                                    </div>
                                                )
                                            });
                                         }}>
                                        <i className="fa fa-trash-o" />
                                    </IconButton>
                                </div>
                            ),
                            width: 10
                        },
                    ]}
                    data={this.props.data.users.groups}/>
                <GroupDialog 
                    fullwidth
                    attrs={this.state.editGroup}
                    open={this.state.editGroup != undefined}
                    onRequestClose={() => {
                        this.setState({ ...this.state, editGroup: undefined });
                    }}
                    onRequestSave={(group) => {
                        this.setState({ ...this.state, editGroup: undefined });
                        if(group.id == undefined){
                            this.props.addGroup({
                                variables: {
                                    name: group.nom
                                }
                            })
                        } else {
                            this.props.updateGroup({
                                variables: {
                                    id: group.id,
                                    name: group.nom
                                }
                            })
                        }
                        
                    }} />
                <AlertDialog ref={a => this.removeGroupAlert = a} fullwidth  />
            </Layout>
        )
    }
}

export default compose(
    graphql(gql(`query { users { groups { id nom users { id } } } }`)),
    graphql(gql(`mutation ($name: String!){ users { addGroup(name:$name){ id nom } } }`), 
    { name: "addGroup", options: { refetchQueries: [
        { query: gql(`query { users { groups { id nom users { id } } } }`) }
    ]}}),
    graphql(gql(`mutation ($id: Int!, $name: String){ users { updateGroup(id:$id, name:$name){ id nom } } }`), 
    { name: "updateGroup" }),
    graphql(gql(`mutation ($id: Int!){ users { removeGroup(id:$id) } }`), 
    { name: "removeGroup" , options: { refetchQueries: [
        { query: gql(`query { users { groups { id nom users { id } } } }`) }
    ]}})
)(withStyles(styles)<ListProps>(List));