import * as React from "react";
import { Link, LinkProps } from "react-router";

interface INavLinkProps extends LinkProps {

}

export class NavLink extends React.PureComponent<INavLinkProps, any>{
    render() {
        return (
            <Link {...this.props} activeClassName="active" />
        );
    }
}