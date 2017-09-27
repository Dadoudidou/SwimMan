import * as React from "react"

import { withStyles, StyledComponentProps, Typography, AppBar, Toolbar, Button, Menu, MenuItem } from "material-ui"
import { Theme } from "material-ui/styles/createMuiTheme"
import { classNames } from "modules/classnames"

import AppBarUser from "./AppBarUser"

// -- styles
interface IStyles {
}

const styles = (theme: Theme ) => ({
    
})

interface IPartialAppBarProps extends StyledComponentProps<IStyles> {}

class PartialAppBar extends React.PureComponent<IPartialAppBarProps, any>
{
    render(){
        return (
            <AppBar position="static">
                <Toolbar>

                    <div style={{ flex: 1 }}></div>
                    <AppBarUser />
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(PartialAppBar as any);