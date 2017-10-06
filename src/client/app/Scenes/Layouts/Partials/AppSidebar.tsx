import * as React from "react";
import { classNames } from "modules/classnames"
import { graphql, ChildProps, compose, MutationFunc } from "react-apollo"
import gql from "graphql-tag"
import * as moment from "moment"

import { List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader } from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"

import SidebarMenu from "./AppSidebarMenu"

type AppSidebarProps = {}

class AppSidebar extends React.PureComponent<AppSidebarProps, any>
{
    render(){
        return (
            <div>

                {/* MENU */}
                <SidebarMenu />

            </div>
        )
    }
}

export default AppSidebar;