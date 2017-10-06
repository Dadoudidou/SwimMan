import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router"
import Layout from "app/Scenes/Layouts/PageLayout"
import { classNames } from "modules/classnames"

import { Grid, Paper, withStyles, StyledComponentProps, TextField, Button, Typography } from "material-ui"

require("./Login.scss");
require("./reducer");
type LoginStyles = "paper" | "form" | "error"
const styles = theme => ({
    paper: {
        padding: 16
    },
    form: {
        paddingBottom: "1em"
    },
    error: {
        background: theme.palette.error["100"],
        padding: ".5em",
        marginBottom: "1em"
    }
})

interface ILoginProps extends RouteComponentProps<any>, StyledComponentProps<LoginStyles> {
    loading?: boolean
    connected?: boolean
    errorMessage?: string
    onSignIn?: (pseudo: string, password: string) => void
}

class Login extends React.PureComponent<ILoginProps, any>
{
    constructor(props){
        super(props);
        this.handle_onSubmit = this.handle_onSubmit.bind(this);
    }

    static defaulProps: Partial<ILoginProps> = {
        loading: false,
        connected: false,
        errorMessage: undefined,
        onSignIn: () => { }
    }

    handle_onSubmit(event: React.FormEvent<HTMLFormElement>){
        event.stopPropagation();
        event.preventDefault();
        let _pseudo = (document.getElementById("pseudo") as HTMLInputElement).value;
        let _pwd = (document.getElementById("pwd") as HTMLInputElement).value;
        this.props.onSignIn(_pseudo, _pwd);
    }

    render(){
        return(
            <Layout className="route-users-login">
                <Grid container justify="center">
                    <Grid item xs={3}>
                        <Paper className={classNames(
                                this.props.classes.paper, 
                                {
                                    "animated": this.props.errorMessage != undefined,
                                    "wobble": this.props.errorMessage != undefined
                                }
                            )}>
                            {/* LOGO */}

                            { /* ERREUR */ }
                            {
                                (this.props.errorMessage) ?
                                <Typography className={this.props.classes.error}>
                                    {this.props.errorMessage}
                                </Typography>
                                :undefined
                            }

                            { /* FORMULAIRE */ }
                            <form onSubmit={this.handle_onSubmit}>
                                <TextField id="pseudo" label="Pseudo" fullWidth autoFocus className={this.props.classes.form} />
                                <TextField id="pwd" label="Mot de passe" type="password" fullWidth className={this.props.classes.form} />
                                <Button raised color="primary" type="submit" className="full-width" >
                                    {(this.props.loading) ? <i className="fa fa-spin fa-refresh" /> : "S'identifier"}
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Layout>
        )
    }
}

import { connect } from "react-redux"
import { IUsersLogin, actions } from "./reducer"
import { ApiActions } from "app/Services/api"
import { set } from "app/Services/session"
import { getHistory } from "app/Services/router"
export default connect(
    (state: IUsersLogin): Partial<ILoginProps> => {
        return {
            connected: state.route_users_login.connected,
            errorMessage: state.route_users_login.errorMessage,
            loading: state.route_users_login.loading
        };
    },
    (dispatch): Partial<ILoginProps> => {
        return {
            onSignIn: (pseudo, password) => {
                (dispatch(ApiActions.Users.Login({
                    request_id: "signin",
                    request: {
                        user: pseudo,
                        password: password
                    }
                })) as any).then(data => {
                    if(data && data.token){
                        // authentifié
                        // -- stocke le token
                        set("user", data.user);
                        set("token", data.token);
                        localStorage.setItem("__token", data.token);
                        // -- redirection
                        getHistory().push("/dashboard");
                    }
                });
            }
        }
    }
)(withRouter(withStyles(styles)(Login as any)));