import * as React from "react"
import { Link } from "react-router-dom"

interface IAppLayoutProps {}

class AppLayout extends React.PureComponent<IAppLayoutProps, any>
{
    render(){
        return (
            <div className="layout-app">
                <div style={{ width: 250, background: "#eee", position: "absolute" }}>
                    <li><Link to="/main" >main</Link></li>
                    <li><Link to="/login" >login</Link></li>
                    <li><Link to="/users/login" >users/login</Link></li>
                </div>
                <div style={{ marginLeft: 250 }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default AppLayout;