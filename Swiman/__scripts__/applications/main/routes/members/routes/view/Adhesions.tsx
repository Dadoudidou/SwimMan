import * as React from "react";
import * as ApiModels from "modules/api/models";
import AdhesionsList from "applications/main/routes/adhesions/components/List";

import { RaisedButton } from "material-ui"

interface IAdhesionsProps {
    member: ApiModels.Member
    adhesions?: ApiModels.Adhesion[]

    onMount?: () => void
    onSelect?: (adhesion: ApiModels.Adhesion) => void
}

interface IAdhesionsState {
}

class Adhesions extends React.PureComponent<IAdhesionsProps, IAdhesionsState>
{
    // set the default props for the class
    static defaultProps: IAdhesionsProps = {
        member: undefined,
        onMount: () => { }
    }

    constructor(props: IAdhesionsProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onMount();
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IAdhesionsProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IAdhesionsProps, nextState: IAdhesionsState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IAdhesionsProps, prevState: IAdhesionsState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        if (!this.props.member) return <div></div>
        return (
            <div>
                <AdhesionsList
                    adhesions={this.props.adhesions}
                    countPage={1}
                    currentPage={1}
                    elementsPerPage={9999999}
                    hideNavigation hideChooseColumn hideFilter
                    hideColumns={["member"]}
                    onSelect={this.props.onSelect} />
            </div>
        );
    }
}


import { connect } from "react-redux";
import { Constants, Actions, IMembersViewReducer } from "./sync";
import * as ApiActions from "modules/api/actions";
import { getStore } from "modules/redux";
import { push } from "react-router-redux"

const mapStateToProps = (state: IMembersViewReducer, props: IAdhesionsProps): Partial<IAdhesionsProps> => {
    return {
        adhesions: state.MembersView.adhesions
    };
}

const mapDispatchToProps = (dispatch, props: IAdhesionsProps): Partial<IAdhesionsProps> => {
    return {
        onMount: () => {
            let _state: IMembersViewReducer = getStore().getState();
            dispatch(Actions.initAdhesions());
            dispatch(ApiActions.members.SearchAdhesions({
                request_id: Constants.search_adhesions,
                Request: { criteria: { member: props.member }, limit: 999999, page: 1 }
            }))
        },
        onSelect: (adhesion) => {
            dispatch(push("/adhesions/" + adhesion.id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Adhesions);