import * as React from "react";
import { classNames } from "modules/classnames"
import { RouteComponentProps, withRouter } from "react-router"
import { graphql, ChildProps, compose, MutationFunc } from "react-apollo"
import gql from "graphql-tag"
import * as moment from "moment"

import DataTable from "app/Components/Table/DataTable";
import AlertDialog from "app/Components/AlertDialog";

import { Button, withStyles, StyledComponentProps, Typography, Tab, Tabs } from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"

type HistoricDatas = {
    users: {
        user: {
            id: number
            historics: {
                id: number
                timestamp: string
                message: string
                meta: any
            }[]
        }
    }
}
type HistoricProps = {
    user_id: number
}

class Historic extends React.PureComponent<ChildProps<HistoricProps, HistoricDatas>, any>
{

    render(){
        if(this.props.data.loading) return <div>chargement</div>;
        if(this.props.data.error) {
            console.log(this.props.data.error);
            return <div>error</div>;
        }
        let _historics = [...this.props.data.users.user.historics];
        return (
            <div>
                <DataTable 
                    dense
                    hoverable
                    data={_historics}
                    columns={[
                        {
                            id: "timestamp",
                            Header: "Date",
                            Data: (data) => moment(data.timestamp).format("LLL"),
                            width: 200
                        },
                        {
                            id: "ip",
                            Header: "Adresse IP",
                            Data: (data) => (data.meta && data.meta.ip) ? data.meta.ip : "",
                            width: 100
                        },
                        {
                            id: "message",
                            Header: "Message",
                            Data: (data) => data.message
                        }
                    ]}/>
            </div>
        )
    }
}

export default compose(
    // historique de l'utilisateur
    graphql(gql(`query ($id: Int!) { users { user(id:$id) { id historics { id timestamp message meta } } } }`),
    {
        options: (props: HistoricProps) => {
            return {
                variables: { id: props.user_id },
                fetchPolicy: "network-only"
            }
        }
    })
)(Historic);