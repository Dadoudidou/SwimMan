import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router"

import Layout from "./../../Layouts/AppLayout";
import TitlePage from "app/Components/TitlePage"

import { Button } from "material-ui"

import PermissionsTable from "./components/Table"
import PermissionDialog from "./components/DialogPermission"

import { graphql, ChildProps, compose, MutationFunc } from "react-apollo"
import gql from "graphql-tag"

type IPermissionsProps = {
    addPermission: MutationFunc<any>
    updatePermission: MutationFunc<any>
    removePermission: MutationFunc<any>
}

type PermissionsState = {
    editPermission?: any
}

class Permissions extends React.PureComponent<ChildProps<IPermissionsProps, any>, PermissionsState>
{
    state: PermissionsState = {
        editPermission: undefined
    }
    render(){
        
        return (
            <Layout>
                <TitlePage 
                    titleName="Gestion des droits"
                    actions={(
                        <div>
                            <Button onClick={() => {
                                this.setState({
                                    ...this.state,
                                    editPermission: {}
                                })
                            }}>Ajouter un droit</Button>
                        </div>
                    )} />
                <PermissionsTable 
                   onEditPermission={permission => {
                       this.setState({
                           ...this.state,
                           editPermission: permission
                       })
                   }} />
                <PermissionDialog 
                    attrs={this.state.editPermission}
                    open={this.state.editPermission != undefined} 
                    onRequestClose={() => {
                        this.setState({
                            ...this.state,
                            editPermission: undefined
                        })
                    }}
                    onRequestSave={(permission) => {
                        if(permission.id == undefined){
                            this.props.addPermission({ 
                                variables:{  
                                    name: permission.name,
                                    description: permission.description
                                }
                            })
                        } else {
                            this.props.updatePermission({ variables:{  
                                id: permission.id,
                                name: permission.name,
                                description: permission.description
                            }})
                        }
                    }} />
            </Layout>
        )
    }
}



export default compose(
    graphql(gql(`mutation ($name: String!, $description: String) {
        users {
            addPermission(name:$name, description:$description){
                id, name, description
            }
        }
    }`), 
    { 
        name:"addPermission", 
        options: { 
            refetchQueries: [
                { query: gql(`query { users { permissions { id } } }`) }
            ]
        } 
    }),
    graphql(gql(`mutation ($id: Int!, $name: String, $description: String) {
        users {
            updatePermission(id:$id, name:$name, description:$description){
                id, name, description
            }
        }
    }`), { name:"updatePermission" }),
    graphql(gql(`mutation ($id: Int!) {
        users {
            removePermission(id:$id)
        }
    }`), { name:"removePermission" }),
)(Permissions);