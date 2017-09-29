import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router"

import Layout from "./../../Layouts/AppLayout";

require("./reducer");

interface IGroupsProps extends RouteComponentProps<any> {
    
    onMount: (props: IGroupsProps) => void

    loading?: boolean
    error?: any
}

class Groups extends React.PureComponent<IGroupsProps, any>
{
    static defaultProps: Partial<IGroupsProps> = {
        onMount: () => {}
    }

    componentDidMount(){
        this.props.onMount(this.props);
    }

    render(){
        let __this = this;
        return (
            <Layout>
                Groups
            </Layout>
        )
    }
}

import { connect } from "react-redux"
import { actions, IUsersGroups } from "./reducer"
import { ApiActions, combineGraphqlAction } from "app/Services/api"

export default connect(
    (state: IUsersGroups): Partial<IGroupsProps> => {
        return {

        };
    },
    (dispatch): Partial<IGroupsProps> => {
        return {
            onMount(props){
                dispatch(combineGraphqlAction([
                    { 
                        actionCreator: ApiActions.Users.Groups({
                            request_id: "",
                            request: {},
                            response: {
                                id: null, 
                                nom: null,
                                permissions: { 
                                    id: null 
                                }
                            }
                        }
                    ) } as any,
                    {
                        actionCreator: ApiActions.Users.Permissions({
                            request_id: "",
                            request: {},
                            response: {
                                id: null, 
                                name: null, 
                                description: null
                            }
                        })
                    }
                ]))
            }
        };
    }
)(withRouter(Groups));