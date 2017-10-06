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

import { Button, IconButton, withStyles, StyledComponentProps, Typography } from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"


// ------------ STYLES
type TStyles = "iconButton"
const styles:StyleRulesCallback<TStyles> = theme => ({
    iconButton: { fontSize: "1rem", width: "3rem", height: "3rem" }
})

// ------------ DATAS
type Data = {
    id: number
    pseudo: string
    first_name: string
    last_name: string
    last_connected: string
    groups: {
        id: number
        nom: string
    }[]
}
type ListData = {
    users: {
        users: Data[]
    }
}

// ------------ COMPONENT
type ListProps = {
} & StyledComponentProps<TStyles> & RouteComponentProps<any>

type ListState = {
}

class List extends React.PureComponent<ChildProps<ListProps, ListData>, ListState>
{

    constructor(props){
        super(props);
        this.handle_onRowClick = this.handle_onRowClick.bind(this);
    }

    handle_onRowClick(event, data: Data){
        this.props.history.push("/users/users/" + data.id);
    }

    render(){
        if(this.props.data.loading) return <Layout>chargement</Layout>;
        if(this.props.data.error) return <Layout>error</Layout>;
        return (
            <Layout>
                <TitlePage 
                    titleName="Liste des utilisateurs"
                    actions={
                        <div>
                            <Button>Ajouter un utilisateur</Button>
                        </div>
                    } 
                />
                <DataTable 
                    hoverable
                    data={this.props.data.users.users}
                    columns={[
                        {
                            id: "id",
                            Header: "ID",
                            Data: (data) => <Typography type="caption">{data.id}</Typography>,
                            width: 10
                        },
                        {
                            id: "nom",
                            Header: "Nom",
                            Data: (data) => data.first_name + " " + data.last_name,
                        },
                        {
                            id: "groups",
                            Header: "Groupes",
                            Data: (data) => {
                                let _groups: string[] = data.groups.map(x => x.nom);
                                return _groups.join(", ")
                            },
                        },
                        {
                            id: "last_connected",
                            Header: "Dernière connexion",
                            Data: (data) => (data.last_connected) ? moment(data.last_connected).format("LLL") : "",
                        }
                    ]}
                    onRowClick={this.handle_onRowClick}
                />
            </Layout>
        )
    }
}

// ------------ REQUEST
export default compose(
    graphql(gql(`query { users { users { id pseudo first_name last_name last_connected groups { id nom } } } }`)),
)(withStyles(styles)(List));