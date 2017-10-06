import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router"
import { classNames } from "modules/classnames"
import { graphql, ChildProps } from "react-apollo"
import gql from "graphql-tag"

import {
    StyledComponentProps, withStyles,
    Typography, Button
} from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"


type TStyles = "root"
const styles: StyleRulesCallback<TStyles> = theme => ({
    root: {
        textAlign: "center",
        width: "100%"
    }
})

type CheckButtonComponentData = {}

type CheckButtonComponentProps = {
    checked?: boolean,
    group_id: number
    permission_id: number
    className?: string
} & StyledComponentProps<TStyles> 

const CheckButtonComponent = withStyles(styles)((props: ChildProps<CheckButtonComponentProps, CheckButtonComponentData> ) => (
    <Button 
        className={classNames(props.classes.root)}
        onClick={() => {
            props.mutate({
                variables: {
                    permission_id: props.permission_id,
                    group_id: props.group_id
                }
            })
        }}>
        {
            (props.data && props.data.loading) ?
                <i className="fa fa-spin fa-circle-o-notch" />
            : (props.checked) ?
                <i className="fa fa-check" />
            : ""
        }
    </Button>
))


export const PermissionUnchecked = graphql<CheckButtonComponentData, CheckButtonComponentProps>(gql(`
    mutation addPermissionToGroup ($permission_id: Int!, $group_id: Int! ){
        users {
            addPermissionToGroup(permission_id:$permission_id, group_id:$group_id) {
                id
                permissions {
                    id
                }
            }
        }
    }
`), {
    props: (props) => ({
        data: props.data,
        mutate: props.mutate,
        ...props.ownProps,
        checked: false
    })
})(CheckButtonComponent);


export const PermissionChecked = graphql<any, CheckButtonComponentProps>(gql(`
    mutation removePermissionToGroup ($permission_id: Int!, $group_id: Int! ) {
        users {
            removePermissionToGroup(permission_id:$permission_id, group_id:$group_id) {
                id
                permissions {
                    id
                }
            }
        }
    }
`), {
    props: (props) => ({
        data: props.data,
        mutate: props.mutate,
        ...props.ownProps,
        checked: true
    })
})(CheckButtonComponent);

