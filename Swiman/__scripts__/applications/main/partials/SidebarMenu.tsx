import * as React from "react";
import * as ApiModels from "modules/api/models";
import { MenuItem, List, ListItem, Divider, Subheader } from "material-ui";
import { Link } from "react-router";
import { NavLink } from "modules/utils/router";




interface ISidebarMenuProps {

}

interface ISidebarMenuState {

}

class SidebarMenu extends React.Component<ISidebarMenuProps, ISidebarMenuState>
{
    constructor(props: ISidebarMenuProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <List>
                    <ListItem containerElement={<NavLink to="dashboard" />}>Dashboard</ListItem>
                    <ListItem containerElement={<NavLink to="members" />}>Adhérents</ListItem>
                </List>
                <Divider />
                <List>
                    <Subheader>Configuration</Subheader>
                    <ListItem containerElement={<NavLink to="seasons" />}>Saisons</ListItem>
                    <ListItem containerElement={<NavLink to="activities" />}>Activités</ListItem>
                </List>

            </div>
        );
    }
}

export default SidebarMenu;