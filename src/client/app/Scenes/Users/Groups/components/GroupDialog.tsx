import * as React from "react";

import FormDialog from "app/Components/Form/FormDialog";
import { TextField, Button } from "material-ui"

type GroupDialogProps = {
}

class GroupDialog extends FormDialog() {

    getTitle(){
        return (this.get('id') ? "Editer un groupe" : "Ajouter un groupe");
    }

    getActions(){
        return (
            <div>
                <Button onClick={this.props.onRequestClose}>
                    Annuler
                </Button>
                <Button color="primary" onClick={this.save}>
                    {(this.get('id') ? "Modifier" : "Ajouter")}
                </Button>
            </div>
        )
    }

    $render($){
        return (
            <div>
                <TextField 
                    {...$("nom")}
                    fullWidth
                    autoFocus
                    label="Nom du groupe" />
            </div>
        )
    }

}

export default GroupDialog