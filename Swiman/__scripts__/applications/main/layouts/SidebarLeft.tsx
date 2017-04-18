import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Drawer, AppBar, FlatButton } from "material-ui";
import muiThemeable from 'material-ui/styles/muiThemeable';


interface ISidebarLeftProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    sidebarContent?: React.ReactNode
    headerBar_right?: React.ReactElement<any>
}

interface ISidebarLeftState {

}

class SidebarLeft extends React.Component<ISidebarLeftProps, ISidebarLeftState>
{
    constructor(props: ISidebarLeftProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{
                fontFamily: this.props.muiTheme.fontFamily
            }}>
                <AppBar
                    title="Swiman"
                    iconElementRight={this.props.headerBar_right}
                    style={{ position: "fixed", top: 0, zIndex: 1310 }} />

                <div style={{ paddingLeft: 256, paddingTop: this.props.muiTheme.appBar.height }}>
                    <div style={{ margin:"2rem" }}>
                        {this.props.children}
                    </div>
                </div>

                <Drawer docked={true}
                    containerStyle={{
                        top: this.props.muiTheme.appBar.height,
                        bottom: 0,
                        height: "auto"
                    }}>
                    {this.props.sidebarContent}
                </Drawer>
            </div>
        );
    }
}

export default muiThemeable()(SidebarLeft);