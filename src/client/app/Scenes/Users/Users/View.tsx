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

import { Button, withStyles, StyledComponentProps, Typography, Tab, Tabs } from "material-ui"
import { StyleRulesCallback } from "material-ui/styles/WithStyles"

import TabGroups from "./components/Groups"
import TabHistorics from "./components/Historic"

// ------------ STYLES
type TStyles = "root"
const styles:StyleRulesCallback<TStyles> = theme => ({
    root: {  }
})

// ------------ DATAS
type RouteParams = {
    id: number
}
type Data = {
    id: number
    first_name: string
    last_name: string
    last_connected: string
    groups: {
        id: number
        nom: string
    }[]
}
type ViewData = {
    users: {
        user: Data
    }
}

// ------------ COMPONENT
type ViewProps = {
} & StyledComponentProps<TStyles> & RouteComponentProps<RouteParams>

type ViewState = {
    tabValue: string
}

const TabContainer = (props) => (
    <div style={{ padding:20 }}>
        {props.children}
    </div>
)

class View extends React.PureComponent<ChildProps<ViewProps, ViewData>, ViewState>
{

    constructor(props){
        super(props);
        this.state = { tabValue: "infos" }
        this.handle_onChangeTab = this.handle_onChangeTab.bind(this);
    }

    handle_onChangeTab(event, value){
        this.setState({ ...this.state, tabValue: value});
    }

    render(){
        let { data } = this.props;
        if(this.props.data.loading) return <Layout>chargement</Layout>;
        if(this.props.data.error) return <Layout>error</Layout>;
        return (
            <Layout>
                <TitlePage 
                    titleName={this.props.data.users.user.first_name + " " + this.props.data.users.user.last_name}
                    subTitle={(data.users.user.last_connected) ? "Dernière activité le " + moment(data.users.user.last_connected).format("LLL") : undefined}
                />
                <Tabs 
                    value={this.state.tabValue} onChange={this.handle_onChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab value="infos" label="Informations" />
                    <Tab value="groups" label="Groupes" />
                    <Tab value="historic" label="Historique" />
                </Tabs>
                <TabContainer>
                    {(this.state.tabValue == "groups" && <TabGroups user_id={this.props.match.params.id} />)}
                    {(this.state.tabValue == "historic" && <TabHistorics user_id={this.props.match.params.id} />)}
                </TabContainer>
            </Layout>
        )
    }
}

// ------------ REQUEST
export default compose(
    graphql(gql(`query ($id: Int!) { users { user(id:$id) { id first_name last_name last_connected groups { id nom } } } }`),
    {
        options: (props: ViewProps) => {
            return {
                variables:{ id: props.match.params.id }
            };
        }
    }),
)(withStyles(styles)(View));