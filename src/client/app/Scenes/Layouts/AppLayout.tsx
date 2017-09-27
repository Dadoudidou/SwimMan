import * as React from "react"
import { Link } from "react-router-dom"

import { Drawer, withStyles, StyledComponentProps, Typography, AppBar, Toolbar, Button } from "material-ui"
import { Theme } from "material-ui/styles/createMuiTheme"
import { classNames } from "modules/classnames"

import PartialAppBar from "./Partials/AppBar"

// -- styles
const drawerWidth = 240;

interface IStyles {
    root: string
    drawer: string
    drawerContent: string
    drawerContentShift: string
    content: string
}

const styles = (theme: Theme ) => ({
    root: {
    } as React.CSSProperties,

    drawer: {
        width: drawerWidth
    } as React.CSSProperties,

    drawerContent: {
        marginLeft: drawerWidth,
        flexGrow: 1,
    } as React.CSSProperties,

    drawerContentShift: {
        marginLeft: 0,
    } as React.CSSProperties,

    content: {
        padding: theme.spacing.unit * 3
    } as React.CSSProperties,

})

interface IAppLayoutProps extends StyledComponentProps<IStyles> {}

class AppLayout extends React.PureComponent<IAppLayoutProps, any>
{
    render(){
        return (
            <div className={classNames("layout-app", this.props.classes.root)}>
                
                <div className={classNames({
                    [this.props.classes.drawerContent]: true,
                    [this.props.classes.drawerContentShift]: false
                })}>

                    {/* APPBAR */}
                    <PartialAppBar />

                    {/* MAIN */}
                    <main 
                        className={classNames(this.props.classes.content)}>

                        {/* CONTENT */}
                        <Typography type="body1" noWrap>
                            {this.props.children}
                        </Typography>
                    </main>

                </div>

                {/* DRAWER */}
                <Drawer 
                    type="persistent" 
                    open={true}
                    classes={{
                        paper: this.props.classes.drawer
                    }}>
                    test
                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(AppLayout as any);