import * as React from "react";
import { classNames } from "modules/classnames"
import { graphql, ChildProps, compose, MutationFunc } from "react-apollo"
import gql from "graphql-tag"
import * as moment from "moment"

import { 
    List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader,
    Typography
 } from "material-ui"
 import Collapse from 'material-ui/transitions/Collapse';
import { StyleRulesCallback } from "material-ui/styles/WithStyles"

import { getHistory } from "app/Services/router"
import { get } from "app/Services/session"
import { testDroits } from "app/Services/auth/authorize"

type AppSidebarMenuProps = {}

type Data = {
    id: string
    text: string
    droits?: number[]
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
                    link: "/dashboard",
                    droits: [1]
                },
                {
                    id: "users",
                    text: "Utilisateurs",
                    children: [
                        { id:"users/users", text: "Utilisateurs", link: "/users/users", droits:[1, 3] },
                        { id:"users/groups", text: "Groupes", link: "/users/groups", droits:[1, 11, 12, 13, 14] },
                        { id:"users/permissions", text: "Droits", link: "/users/permissions", droits:[1, 4, 5, 7, 6] }
                    ]
                },
                {
                    id: "system",
                    text: "Système",
                    children: [
                        { id: "system/logs", text: "Logs", link:"/system/logs", droits:[1, 15] }
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

    renderData(data: Data, level: number){
        let _hasChildren = data.children && data.children.length > 0;

        let _return = [];

        let _user = get("user");
        if(!_user) return _return;
        if(!_user.droits) return _return;

        // -- droits d'afficher ?
        let _canAccess = false;
        if(data.droits) {
            _canAccess = testDroits(_user, data.droits);
        } else {
            // -- droits des enfants
            if(_hasChildren){
                let _droits: number[][] = [];
                for(let i=0; i<data.children.length; i++){
                    _droits.push(data.children[i].droits);
                }
                _canAccess = testDroits(_user, _droits);
            } else {
                _canAccess = true;
            }
        }
        if(!_canAccess) return _return;

        // -- menu item
        _return.push(
            <ListItem 
                key={data.id}
                button 
                onClick={this.handle_onClick(data)}>
                <ListItemText 
                    primary={data.text}
                    style={{ paddingLeft: (level-1) * 1 + "em" }}
                />
                {(_hasChildren) ? 
                    (this.state.datasOpened[data.id]) ? 
                        <Typography type="caption"><i className="fa fa-chevron-up" /></Typography>
                    :   <Typography type="caption"><i className="fa fa-chevron-down" /></Typography>
                : undefined}
            </ListItem>
        );

        // -- children ?
        if(_hasChildren){
            _return.push(
                <Collapse in={this.state.datasOpened[data.id]} transitionDuration="auto" unmountOnExit>
                    <List >
                        {data.children.map(subdata => {
                            return this.renderData(subdata, level + 1);
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
                    return this.renderData(data, 1);
                })}
            </List>
        )
    }
}

export default AppSidebarMenu;