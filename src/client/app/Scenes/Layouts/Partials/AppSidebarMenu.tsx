import * as React from "react";
import { classNames } from "modules/classnames"
import { graphql, ChildProps, compose, MutationFunc } from "react-apollo"
import gql from "graphql-tag"
import * as moment from "moment"

import { 
    List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader,
 } from "material-ui"
 import Collapse from 'material-ui/transitions/Collapse';
import { StyleRulesCallback } from "material-ui/styles/WithStyles"

import { getHistory } from "app/Services/router"

type AppSidebarMenuProps = {}

type Data = {
    id: string
    text: string
    link?: string
    children?: Data[]
}

type AppSidebarMenuState = {
    datas: Data[]
    datasOpened: { [key: string]: boolean }
}

class AppSidebarMenu extends React.PureComponent<AppSidebarMenuProps, AppSidebarMenuState>
{
    constructor(props){
        super(props);
        this.state = {
            datasOpened: {},
            datas: [
                {
                    id: "dashboard",
                    text: "Tableau de bord",
                    link: "/dashboard"
                },
                {
                    id: "users",
                    text: "Utilisateurs",
                    children: [
                        { id:"users/users", text: "Utilisateurs", link: "/users/users" },
                        { id:"users/groups", text: "Groupes", link: "/users/groups" },
                        { id:"users/permissions", text: "Droits", link: "/users/permissions" }
                    ]
                }
            ]
        };
        this.handle_onClick = this.handle_onClick.bind(this);
    }

    handle_onClick(data: Data){
        return () => {
            if(data.link){
                getHistory().push(data.link);
                return;
            }
            if(data.children && data.children.length > 0){
                this.setState({
                    ...this.state,
                    datasOpened: {
                        ...this.state.datasOpened,
                        [data.id]: (this.state.datasOpened[data.id]) ? !this.state.datasOpened[data.id] : true
                    }
                })
            }
        }
    }

    renderData(data: Data){
        let _hasChildren = data.children && data.children.length > 0;

        let _return = [];

        _return.push(
            <ListItem 
                key={data.id}
                button 
                onClick={this.handle_onClick(data)}>
                <ListItemText 
                    
                    primary={data.text}
                />
                {(_hasChildren) ? 
                    (this.state.datasOpened[data.id]) ? 
                        <i className="fa fa-chevron-up" />
                    :   <i className="fa fa-chevron-down" />
                : undefined}
            </ListItem>
        );

        if(_hasChildren){
            _return.push(
                <Collapse in={this.state.datasOpened[data.id]} transitionDuration="auto" unmountOnExit>
                    <List >
                        {data.children.map(subdata => {
                            return this.renderData(subdata);
                        })}
                    </List>
                </Collapse>
            )
        }

        return _return;
    }
    render(){
        return (
            <List>
                {this.state.datas.map(data => {
                    return this.renderData(data);
                })}
            </List>
        )
    }
}

export default AppSidebarMenu;