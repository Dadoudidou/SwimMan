import * as React from "react";
import * as ApiModels from "modules/api/models";

require("font-awesome/scss/font-awesome.scss");
require("./Application.scss");


interface IApplicationProps {
    onInit?: () => void
}

interface IApplicationState {

}

class Application extends React.PureComponent<IApplicationProps, IApplicationState>
{
    static defaultProps: IApplicationProps = {
        onInit: () => { }
    }
    constructor(props: IApplicationProps ) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.onInit();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

import { connect } from "react-redux";
import { IApp_Reducer } from "./reducer";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./constants";

const mapStateToProps = (state: IApp_Reducer): IApplicationProps => {
    return {};
}

const mapDispatchToProps = (dispatch): IApplicationProps => {
    return {
        onInit: () => {
            dispatch(ApiActions.seasons.Gets({
                request_id: Constants.init,
                Request: { }
            }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);