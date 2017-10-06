import * as React from "react";
import { classNames } from "modules/classnames"
import { RouteComponentProps, withRouter } from "react-router"
import { graphql, ChildProps, compose, MutationFunc } from "react-apollo"
import gql from "graphql-tag"
import * as moment from "moment"

import DataTable from "app/Components/Table/DataTable";
import AlertDialog from "app/Components/AlertDialog";

import { Button, withStyles, StyledComponentProps, Typography, Tab, Tabs } from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"
type GroupsDatas = {
    users: {
        user: { id:number, groups: { id: number }[] }
        groups: { id: number, nom: string }[]
    }
}
type GroupsProps = {
    user_id: number
    addUserToGroup?: MutationFunc<any, { user_id: number, group_id: number }>
    removeUserFromGroup?: MutationFunc<any, { user_id: number, group_id: number }>
}

class Groups extends React.PureComponent<ChildProps<GroupsProps, GroupsDatas>, any>
{
    render(){
        if(this.props.data.loading) return <div>chargement</div>;
        if(this.props.data.error) {
            console.log(this.props.data.error);
            return <div>error</div>;
        }
        let _groups = [...this.props.data.users.groups].sort((a,b) => {
            if(a.nom < b.nom) return -1;
            if(a.nom > b.nom) return 1;
            return 0;
        })
        return (
            <div>
                <DataTable 
                    hoverable
                    data={_groups}
                    columns={[
                        {
                            id: "nom",
                            Header: "Groupe",
                            Data: (data) => data.nom
                        },
                        {
                            id: "checked",
                            Header: "Appartient au groupe",
                            width: 100,
                            Data: (data) => {
                                let _index = this.props.data.users.user.groups.map(x => x.id).indexOf(data.id);
                                return (
                                    <Button style={{ width:"100%" }}
                                        onClick={() => {
                                            let _varaibales = { 
                                                user_id:  this.props.data.users.user.id,
                                                group_id: data.id
                                            }
                                            if(_index > -1)
                                                this.props.removeUserFromGroup({ variables: _varaibales })
                                            else
                                                this.props.addUserToGroup({ variables: _varaibales })
                                        }}>
                                        {
                                            (_index > -1) ?
                                            <i className="fa fa-check" />
                                            : ""
                                        }
                                    </Button>
                                )
                            }
                        }
                    ]}/>
            </div>
        )
    }
}

export default compose(
    // liste des groupes de l'utilisateur
    graphql(gql(`query ($id: Int!) { users { user(id:$id) { id groups { id nom } } groups { id nom } } }`),
    {
        options: (props: GroupsProps) => {
            return {

                variables: { id: props.user_id }
            }
        }
    }),
    // ajoute un utilisateur dans un groupe
    graphql(gql(`mutation ($user_id: Int!, $group_id: Int!){ users { addUserToGroup(user_id:$user_id, group_id:$group_id){ id groups { id } } } }`),
    {
        name: "addUserToGroup"
    }),
    // enlève un utilisateur d'un groupe
    graphql(gql(`mutation ($user_id: Int!, $group_id: Int!){ users { removeUserFromGroup(user_id:$user_id, group_id:$group_id){ id groups { id } } } }`),
    {
        name: "removeUserFromGroup"
    })
)(Groups);