import * as React from "react";

import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Button
} from "material-ui"

type AlertDialogProps = {
    fullwidth?: boolean
    ignoreBackdropClick?: boolean
    ignoreEscapeKeyUp?: boolean
    onRequestClose?: () => void
}

type AlertDialogState = {
    open: boolean
    options?: AlertDialogShowOptions
}

type AlertDialogShowOptions = {
    title?: React.ReactNode
    message?: React.ReactNode
    actions?: React.ReactNode
    onRequestClose?: () => void
}

class AlertDialog extends React.PureComponent<AlertDialogProps, AlertDialogState>
{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            options: {}
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handle_onRequestClose = this.handle_onRequestClose.bind(this);
    }

    show(options: AlertDialogShowOptions | string){
        let _options: AlertDialogShowOptions = {};
        if(typeof(options) == "string"){
            _options.message = options;
        } else {
            _options = options;
        }
        if(_options == undefined) _options = {};
        this.setState({
            ...this.state,
            open: true,
            options: _options
        })
    }

    hide(){
        this.setState({
            ...this.state,
            open: false
        })
    }

    handle_onRequestClose(){
        this.hide();
        if(this.state.options.onRequestClose)
            this.state.options.onRequestClose();
        if(this.props.onRequestClose) 
            this.props.onRequestClose();
    }

    render(){
        return (
            <Dialog 
                open={this.state.open}
                fullWidth={this.props.fullwidth}
                ignoreBackdropClick={this.props.ignoreBackdropClick}
                ignoreEscapeKeyUp={this.props.ignoreEscapeKeyUp}
                onRequestClose={this.handle_onRequestClose}>
                {(this.state.options.title) ?
                    <DialogTitle>{this.state.options.title}</DialogTitle>
                :undefined}
                <DialogContent>
                    <DialogContentText>
                        {this.state.options.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        (this.state.options.actions) ?
                            this.state.options.actions
                        :
                            <Button onClick={this.hide}>
                                Fermer
                            </Button>
                    }
                </DialogActions>
            </Dialog>
        )
    }
}

export default AlertDialog;