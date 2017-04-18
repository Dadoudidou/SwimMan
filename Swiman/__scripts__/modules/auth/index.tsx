import * as React from "react";
import * as ReactRouter from "react-router";
import { getStore } from "modules/redux";

interface IAuthorizationState {
    roles: any[]
}

interface IAuthorizationProps {
    router: any
}

export const Authorization = (allowedRoles: any[], notAuthorizedPath: string) => {
    return (Component) => {
        return class Authorization extends React.Component<IAuthorizationProps, IAuthorizationState>{

            constructor(props) {
                super(props);

                //récupération infos utilisateur
                let _store = getStore();
                let _roles = [];
                let _state = _store.getState();
                if (_state.application && _state.application.user) {
                    _roles = (_state.application.user.permissions) ? _state.application.user.permissions : [];
                }
                this.state = {
                    roles: _roles
                }

            }

            componentWillMount() {
                //test
                let _i = 0;
                let _auth = false;
                while (_auth == false && _i < allowedRoles.length) {
                    let _index = this.state.roles.indexOf(allowedRoles[_i]);
                    if (_index > -1)
                        _auth = true;
                    _i++;
                }

                if (!_auth) {
                    //redirection
                    (this.props.router as any).push(notAuthorizedPath);
                }
            }

            render() {
                return React.createElement(Component, this.props, this.props.children);
            }
        }
    }
}