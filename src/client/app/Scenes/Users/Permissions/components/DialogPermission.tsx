import * as React from "react";
import { classNames } from "modules/classnames"

import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Button, TextField
} from "material-ui"

import FormDialog from "app/Components/Form/FormDialog"
import FormPermission from "./FormPermission"

type DialogPermissionProps = {
    permission?: { name: string, description: string }
}

type DialogPermissionState = { 
}

class DialogPermission extends FormDialog() {

    getTitle(){
        return (this.get("id")) ? "Editer un droit" : "Ajouter un droit"
    }

    getActions(){
        return (
            <div>
                <Button onClick={this.props.onRequestClose}>Annuler</Button>
                <Button 
                    color="accent" 
                    onClick={() => {
                        this.save();
                        this.props.onRequestClose();
                    }}>
                    {this.get("id") ? "Modifier" : "Ajouter"}
                </Button>
            </div>
        )
    }

    $render($){
        return (
            <div>
                <TextField
                    {...$("name")}
                    autoFocus
                    margin="dense"
                    label="Nom"
                    type="text"
                    fullWidth />
                <TextField
                    {...$("description")}
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth />
            </div>
        )
    }
}

export default DialogPermission;
