import * as React from "react";
import { connect } from "react-redux";

import { actionCreator, actionAsyncCreator, IAction, isType } from "modules/redux-actions"
import { getStore } from "./../../store"

import Layout from "app/Scenes/Layouts/AppLayout"
import { ApiActions } from "./../../Services/api"


// -- actions
const changeValue = actionCreator<boolean>("changevalue");
const test = actionAsyncCreator<boolean>("petit test", (dispatch, event) => {
    setTimeout(function() {
        dispatch(changeValue(event));
    }, 1000);
    
})

// --- reducer
interface IState {
    value?: boolean
}
const reducer = (state: IState = {}, action: IAction<any>): IState => {
    if(isType(action, changeValue)){
        return {
            ...state,
            value: action.payload
        }
    }
    if(isType(action, ApiActions.Campaigns.CampaignsSuccess)){
        console.log(action.payload.response.campaigns);
    }
    return state;
}
interface IMainReducer { 
    main: IState
 }
 getStore().injectAsyncReducer("main",reducer);

// --- view

interface IMainProps {
    value?: boolean
    onChangeValue?: (value: boolean) => void
}

class Main extends React.PureComponent<IMainProps, any>
{
    render(){
        let __this = this;
        return (
            <Layout>
                value is {(this.props.value) ? "true" : "false"}
                <br />
                <button onClick={() => {
                    if(__this.props.value)
                        __this.props.onChangeValue(false);
                    else
                        __this.props.onChangeValue(true);
                }}>
                    Change
                </button>
            </Layout>
        )
    }
}

import * as Session from "app/Services/session"

export default connect(
    (state: IMainReducer): IMainProps => {
        return {
            value: state.main.value
        };
    },
    (dispatch): IMainProps => {
        return {
            onChangeValue: (value) => { 
                dispatch(changeValue(value));
                dispatch(ApiActions.Campaigns.Campaigns({
                    request_id: "",
                    request:{},
                    response:{
                        id: null, name: null, start: null
                    }
                }))
            }
        };
    },
    undefined,
    { pure: true }
)(Main);

