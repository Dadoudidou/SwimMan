import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router"
import Layout from "app/Scenes/Layouts/PageLayout"

interface ILoginProps extends RouteComponentProps<any> {}

class Login extends React.PureComponent<ILoginProps, any>
{
    render(){
        return(
            <Layout>
                <div>
                    <h2>Login Page</h2>
                    <button>
                        Submit
                    </button>
                </div>
            </Layout>
        )
    }
}

export default withRouter(Login);