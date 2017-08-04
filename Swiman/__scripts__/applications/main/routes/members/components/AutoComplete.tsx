import * as React from "react";
import * as ApiModels from "modules/api/models";

import { actionCreator, isType, IAction, getStore, injectAsyncReducer } from "modules/redux";
import * as ApiActions from "modules/api/actions";
import { connect } from "react-redux";

import { AutoComplete as MatAutoComplete, MenuItem } from "material-ui";

// --- SYNC
const Constants = {
    search_members: "routes/members/components/autocomplete/search_members"
}
const Actions = {
    init: actionCreator("membersAutoComplete/init"),
}
interface IState {
    members?: ApiModels.Member[]
}
const InitialState: IState = {
    members: []
}
const Reducer = (state: IState = InitialState, action: IAction<any>): IState => {
    if (isType(action, Actions.init)) return InitialState;
    //search
    if (isType(action, ApiActions.members.SearchSuccess) &&
        action.payload.request.request_id == Constants.search_members) {
        return {
            ...state,
            members: action.payload.response.members
        };
    }
    return state;
}
interface IMembersAutoCompleteReducer {
    MembersAutoComplete: IState
}
injectAsyncReducer(getStore(), "MembersAutoComplete", Reducer);

// --- COMPONENTS
interface IAutoCompleteViewProps {
    onSelect?: (member: ApiModels.Member) => void
}
interface IAutoCompleteProps extends IAutoCompleteViewProps {
    members?: ApiModels.Member[]
    onSearch?: (searchtext: string) => void
}

interface IAutoCompleteState {
}

class AutoComplete extends React.PureComponent<IAutoCompleteProps, IAutoCompleteState>
{
    // set the default props for the class
    static defaultProps: IAutoCompleteProps = {
        onSearch: () => { },
        onSelect: () => { }
    }

    constructor(props: IAutoCompleteProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IAutoCompleteProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IAutoCompleteProps, nextState: IAutoCompleteState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IAutoCompleteProps, prevState: IAutoCompleteState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        let _dataSources = this.props.members.map(member => {
            return {
                text: member.first_name + " " + member.last_name,
                value: (
                    <MenuItem
                        primaryText={member.first_name + " " + member.last_name} />
                ),
                item: member
            }
        });
        return (
            <MatAutoComplete
                fullWidth
                floatingLabelText="Nom de l'adhérent"
                dataSource={_dataSources}
                filter={MatAutoComplete.noFilter}
                onUpdateInput={function(searchtext, dataSources){
                    __this.props.onSearch(searchtext);
                }}
                onNewRequest={(value, index) => {
                    __this.props.onSelect(value.item);
                }} />
        );
    }
}

const mapStateToProps = (state: IMembersAutoCompleteReducer, props: IAutoCompleteViewProps): IAutoCompleteProps => {
    return {
        members: state.MembersAutoComplete.members
    };
}
const mapDispatchToProps = (dispatch): IAutoCompleteProps => {
    return {
        onSearch: (searchText) => {
            dispatch(ApiActions.members.Search({
                request_id: Constants.search_members,
                Request: {
                    criteria: {
                        last_name: searchText
                    },
                    limit: 10,
                    page: 1
                }
            }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);