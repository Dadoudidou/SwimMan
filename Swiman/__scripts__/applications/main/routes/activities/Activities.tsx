import * as React from "react";
import * as ApiModels from "modules/api/models";
import Layout from "applications/main/layouts/SidebarLeft";
import HeaderBarRight from "applications/main/partials/HeaderBarRight";
import SideBar from "applications/main/partials/SidebarMenu";
import { Paper } from "material-ui"
import { Col, Row, Container } from "react-grid-system";
import { PageTitle } from "applications/main/components"

import Form_Categories from "./components/Categories";
import Form_Activities from "./components/Activities";
import Form_Sections from "./components/Sections";

interface IActivitiesProps {
    onInit?: () => void
}

interface IActivitiesState {

}

class Activities extends React.PureComponent<IActivitiesProps, IActivitiesState>
{

    static defaultProps: IActivitiesProps = {
        onInit: () => { }
    }

    constructor(props: IActivitiesProps ) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.onInit();
    }

    render() {
        return (
            <Layout
                sidebarContent={<SideBar />}
                headerBar_right={<HeaderBarRight />}>
                <PageTitle label="Activités" />
                <Row>
                    <Col md={4}>
                        <Paper zDepth={1} style={{ height: 300, overflow:"auto" }}><Form_Categories /></Paper>
                    </Col>
                    <Col md={4}>
                        <Paper zDepth={1} style={{ height: 300, overflow:"auto" }}><Form_Activities /></Paper>
                    </Col>
                    <Col md={4}>
                        <Paper zDepth={1} style={{ height: 300, overflow: "auto" }}><Form_Sections /></Paper>
                    </Col>
                </Row>
            </Layout>
        );
    }
}


import { connect } from "react-redux";
import { IActivities_Reducer } from "./reducer";
import * as Constants from "./constants";
import * as ApiActions from "modules/api/actions";

const mapStateToProps = (state: IActivities_Reducer): IActivitiesProps => {
    return {};
}

const mapDispatchToProps = (dispatch): IActivitiesProps => {
    return {
        onInit: () => {
            dispatch(ApiActions.activities.GetCategories({
                request_id: Constants.get_categories,
                Request: { }
            }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities);