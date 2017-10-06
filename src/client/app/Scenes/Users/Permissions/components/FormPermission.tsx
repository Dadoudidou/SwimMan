import * as React from "react";
import { classNames } from "modules/classnames"

import {
    TextField, DialogContentText
} from "material-ui"

type FormPermissionProps = {
    permission?: {
        name: string
        description: string
    }
    onUpdate?:(permission: { name?: string, description?: string }) => void
}

type FormPermissionState = { }

class FormPermission extends React.PureComponent<FormPermissionProps, FormPermissionState> {

    static defaultProps: FormPermissionProps = {
        permission: { name: "", description: "" },
        onUpdate: () => {}
    }

    handle_onChange = name => (event) => {
        this.props.onUpdate({
            ...this.props.permission,
            [name]: event.target.value
        })
    }

    render(){
        return (
            <div>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nom"
                    type="text"
                    fullWidth
                    value={this.props.permission.name}
                    onChange={this.handle_onChange("name")} />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    value={this.props.permission.description}
                    onChange={this.handle_onChange("description")} />
            </div>
        )
    }
}

export default FormPermission;
