import * as React from "react";
import { classNames } from "modules/classnames"
import { RouteComponentProps, withRouter } from "react-router"
import { graphql, ChildProps, compose, MutationFunc } from "react-apollo"
import gql from "graphql-tag"
import * as moment from "moment"

import Layout from "./../../Layouts/AppLayout";
import TitlePage from "app/Components/TitlePage";
import DataTable from "app/Components/Table/DataTable";
import AlertDialog from "app/Components/AlertDialog";

import { Button, IconButton, withStyles, WithStyles, Typography } from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"


type ListData = {
    system: {
        logs: {
            count: number
            page: number
            countPerPage: number
            datas: {
                id: number
                timestamp: string
                level: string
                message: string
                type: string
                user?: {
                    id: string
                    fisrt_name: string
                    last_name: string
                }
            }[]
        }
    }
}

type ListProps = {
}

type ListState = {
}

class List extends React.PureComponent<ChildProps<ListProps, ListData>, ListState>
{
    state: ListState = { editGroup: undefined }
    removeGroupAlert: AlertDialog
    render() {
        if (this.props.data.loading) return <div>chargement</div>;
        if (this.props.data.error) return <div>error</div>;
        return (
            <Layout>
                <TitlePage titleName="Logs" />
                <DataTable
                    dense
                    columns={[
                        {
                            id: "id",
                            Header: "ID",
                            Data: (data) => <Typography type="caption">{data.id}</Typography>,
                            width: 10,
                        },
                        {
                            id: "date",
                            Header: "Date",
                            Data: (data) => moment(data.timestamp).format("LLL"),
                            width: 200,
                        },
                        {
                            id: "level",
                            Header: "Level",
                            Data: (data) => data.level,
                            width: 100,
                        },
                        {
                            id: "type",
                            Header: "Type",
                            Data: (data) => data.type,
                            width: 100,
                        },
                        {
                            id: "ip",
                            Header: "IP",
                            Data: (data) => (data.meta && data.meta.ip) ? data.meta.ip : ``,
                            width: 100,
                        },
                        {
                            id: "user",
                            Header: "User",
                            Data: (data) => (data.user) ? `${data.user.first_name} ${data.user.last_name}` : ``,
                            width: 200,
                        },
                        {
                            id: "message",
                            Header: "Message",
                            Data: (data) => data.message
                        },
                    ]}
                    data={this.props.data.system.logs.datas} />

            </Layout>
        )
    }
}

export default compose(
    graphql(gql(`query ($countPerPage: Int, $page: Int) {
        system {
          logs (countPerPage: $countPerPage, page: $page) {
            count
            page
            countPerPage
            datas {
              id
              timestamp
              level
              message
              meta
              type
              user {
                id
                first_name
                last_name
              }
            }
          }
        }
      }`), {  
          options: {
              fetchPolicy: "network-only",
              variables: {
                  countPerPage: 20,
                  page: 1
              }
          }
      }),
)(List);