import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router"
import { classNames } from "modules/classnames"
import { graphql, ChildProps } from "react-apollo"
import gql from "graphql-tag"

import {
    StyledComponentProps, withStyles,
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Button, IconButton
} from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"

import { PermissionChecked, PermissionUnchecked } from "./CheckButton"

// -- graphql datas
type PermissionsDatas = {
    users: {
        groups: {
            id: number
            nom: string
            permissions: { id: number }[]
        }[]
        permissions: {
            id: number
            name: string
            description: string
        }[]
    }
}

// -- styles
type TStyles = "center" | "groupCell" | "fullWidth" | "editCol" | "editButton"
const styles: StyleRulesCallback<TStyles> = theme => ({
    center: { textAlign: "center" },
    groupCell: { width: 100, paddingLeft:0, paddingRight:0 },
    fullWidth: { width: "100%" },
    editCol: { width: 10, paddingLeft:0, paddingRight:0  },
    editButton: { fontSize: "1rem", width: "3rem", height: "3rem" }
})

type IPermissionTableProps = {
    onEditPermission?: (permission: {id, name, description}) => void
} & StyledComponentProps<TStyles>

class PermissionTable extends React.PureComponent<ChildProps<IPermissionTableProps, PermissionsDatas>, any>{
    static defaultProps: IPermissionTableProps = {
        onEditPermission: () => {}
    }
    render() {
        let { data, classes } = this.props
        if(data.loading){
            return <div></div>
        }

        if(data.error){
            return <div>Error</div>
        }

        let _permissions = [...this.props.data.users.permissions].sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        })
        let _groups = [...this.props.data.users.groups].sort((a, b) => {
            if(a.nom < b.nom) return -1;
            if(a.nom > b.nom) return 1;
            return 0;
        })

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classNames(classes.editCol)}></TableCell>
                        <TableCell className={classNames(classes.editCol)}>ID</TableCell>
                        <TableCell>Action</TableCell>
                        {_groups.map(group => {
                            return (
                                <TableCell key={group.id} className={classNames(classes.center, classes.groupCell)}>
                                    {group.nom}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_permissions.map(permission => {
                        return (
                            <TableRow key={permission.id} hover>
                                <TableCell className={classNames(classes.editCol)}>
                                    <IconButton className={classNames(classes.editButton)}
                                        onClick={() => { this.props.onEditPermission(permission) }}>
                                        <i className="fa fa-pencil" />
                                    </IconButton>
                                </TableCell>
                                <TableCell className={classNames(classes.editCol)}>
                                    <Typography type="caption">{permission.id}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography type="body1">{permission.description}</Typography>
                                    <Typography type="caption">{permission.name}</Typography>
                                </TableCell>
                                {_groups.map(group => {
                                    return (
                                        <TableCell key={group.id} className={classNames(classes.center, classes.groupCell)}>
                                            {
                                                (group.permissions.map(x => x.id).indexOf(permission.id) > -1) ?
                                                    <PermissionChecked permission_id={permission.id} group_id={group.id} />
                                                    :
                                                    <PermissionUnchecked permission_id={permission.id} group_id={group.id} />
                                            }
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }
}

const permissionTableQuery = gql(`
query permissionTableQuery {
    users {
      groups {
        id
        nom
        permissions {
          id
        }
      }
      permissions {
        id
        name
        description
      }
    }
}
`);

export default graphql<any, IPermissionTableProps>(permissionTableQuery)(withStyles(styles)(PermissionTable))