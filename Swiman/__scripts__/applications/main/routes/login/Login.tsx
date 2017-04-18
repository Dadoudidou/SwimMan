import * as React from "react";
import * as ApiModels from "modules/api/models";
import { TextField, RaisedButton, Paper } from "material-ui";
import { Col, Row, Container } from "react-grid-system";

interface ILoginProps {
    errorLogin?: boolean
    onLogin?: (username: string, password: string) => void
}

interface ILoginState {
    username?: string
    password?: string
}

class Login extends React.Component<ILoginProps, ILoginState>
{
    static defaultProps: ILoginProps = {
        onLogin: () => { }
    }
    constructor(props: ILoginProps ) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handle_onLogin = this.handle_onLogin.bind(this);
        this.handle_onUpdatePassword = this.handle_onUpdatePassword.bind(this);
        this.handle_onUpdateUsername = this.handle_onUpdateUsername.bind(this);
    }

    handle_onLogin() {
        this.props.onLogin(this.state.username, this.state.password);
    }

    handle_onUpdateUsername(event, newValue: string) {
        this.setState({
            ...this.state,
            username: newValue
        });
    }

    handle_onUpdatePassword(event, newValue: string) {
        this.setState({
            ...this.state,
            password: newValue
        });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={4} offset={{ md: 4 }}>

                        <Paper zDepth={1} style={{ marginTop:"3em" }}>
                            <div style={{ padding: 10 }}>
                                <TextField floatingLabelText="Identifiant" fullWidth value={this.state.username} onChange={this.handle_onUpdateUsername} />
                                <TextField floatingLabelText="Mot de passe" fullWidth type="password" value={this.state.password} onChange={this.handle_onUpdatePassword} />
                                <div style={{ textAlign: "right" }}>
                                    <RaisedButton label="Se connecter" onClick={this.handle_onLogin} />
                                </div>
                            </div>
                        </Paper>

                    </Col>
                </Row>
            </Container>
        );
    }
}

import { connect } from "react-redux";
import { ILogin_Reducer } from "./reducer";
import * as Constants from "./constants";
import * as ApiActions from "modules/api/actions";

const mapStateToProps = (state: ILogin_Reducer): ILoginProps => {
    return {
        errorLogin: state.route_Login.loginError
    };
}

const mapDispatchToProps = (dispatch): ILoginProps => {
    return {
        onLogin: (username, password) => {
            dispatch(ApiActions.users.Login({
                request_id: Constants.login,
                Request: {
                    username: username,
                    password: password
                }
            }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);