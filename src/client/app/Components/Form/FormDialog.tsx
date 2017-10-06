import * as React from "react";

import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "material-ui"

import FormBase, { FormBaseProps } from "./FormBase"

type FormDialogProps = {
    open?: boolean
    onRequestClose?: () => void
    fullwidth?: boolean
    ignoreBackdropClick?: boolean
    ignoreEscapeKeyUp?: boolean
} & FormBaseProps

export default function(){
    return class extends FormBase<FormDialogProps> {
        componentWillReceiveProps(nextProps: FormDialogProps){
            if(nextProps.open && !this.props.open){
                this.reset(nextProps.attrs);
            }
        }

        getTitle(){
            return undefined;
        }

        getActions(){
            return undefined;
        }

        render(){
            let _dialogTitle = this.getTitle();
            let _dialogAtions = this.getActions();
            return (
                <Dialog 
                    open={this.props.open} 
                    onRequestClose={this.props.onRequestClose}
                    fullWidth={this.props.fullwidth}
                    ignoreBackdropClick={this.props.ignoreBackdropClick}
                    ignoreEscapeKeyUp={this.props.ignoreEscapeKeyUp}>
                    {
                        (_dialogTitle) ?
                        <DialogTitle>{_dialogTitle}</DialogTitle>
                        : undefined
                    }
                    <DialogContent>
                        {super.render()}
                    </DialogContent>
                    {
                        (_dialogAtions) ?
                        <DialogActions>
                            {_dialogAtions}
                        </DialogActions>
                        : undefined
                    }
                </Dialog>
            )
        }
    }
}