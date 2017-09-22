import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router"

interface IErr404Props extends RouteComponentProps<any> {}

class Err404 extends React.PureComponent<IErr404Props, any>
{
    render(){
        return(
            <div>
                <h2>Error 404 Page</h2>
            </div>
        )
    }
}

export default withRouter(Err404);