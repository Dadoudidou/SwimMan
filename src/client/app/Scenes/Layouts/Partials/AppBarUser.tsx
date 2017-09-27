import * as React from "react"

import { withStyles, StyledComponentProps, Typography, Button, Menu, MenuItem } from "material-ui"
import { Theme } from "material-ui/styles/createMuiTheme"
import { classNames } from "modules/classnames"


// -- styles
interface IStyles {
}

const styles = (theme: Theme ) => ({
    
})

interface IPartialAppBarUserProps extends StyledComponentProps<IStyles> {}

interface IPartialAppBarUserState {
    open: boolean
    anchorElement: HTMLElement & object
}

class PartialAppBarUser extends React.PureComponent<IPartialAppBarUserProps, IPartialAppBarUserState>
{
    constructor(props){
        super(props);
        this.state = { open: false, anchorElement: undefined };
        this.handle_click = this.handle_click.bind(this);
        this.handle_requestClose = this.handle_requestClose.bind(this);
        this.handle_select = this.handle_select.bind(this);
    }

    handle_click(event: React.MouseEvent<any>){
        this.setState({ ...this.state, open: true, anchorElement: event.currentTarget })
    }

    handle_requestClose(){
        this.setState({ ...this.state, open: false })
    }

    handle_select(){
        this.handle_requestClose();
    }

    render(){
        return (
            <div>
                <Button color="contrast" onClick={this.handle_click}>
                    texte
                </Button>
                <Menu 
                    anchorEl={this.state.anchorElement}
                    open={this.state.open}
                    onRequestClose={this.handle_requestClose}>
                    <MenuItem divider onClick={this.handle_select}>Profil</MenuItem>
                    <MenuItem onClick={this.handle_select}>Se déconnecter</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(PartialAppBarUser as any);