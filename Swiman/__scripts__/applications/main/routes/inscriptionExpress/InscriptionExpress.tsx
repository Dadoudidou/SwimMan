import * as React from "react";
import * as ApiModels from "modules/api/models";

import Layout from "applications/main/layouts/SidebarLeft";
import HeaderBarRight from "applications/main/partials/HeaderBarRight";
import SideBar from "applications/main/partials/SidebarMenu";

import { Stepper, Step, StepLabel, StepButton, StepContent } from "material-ui";

import StepMembers from "./Steps/Step_Members/StepMembers";
import StepAdhesions from "./Steps/Step_Adhesions/StepAdhesions";

interface IInscriptionExpressProps {
    season?: ApiModels.Season
    onMount?: () => void
}

interface IInscriptionExpressState {
    stepIndex: number
}

class InscriptionExpress extends React.PureComponent<IInscriptionExpressProps, IInscriptionExpressState>
{
    // set the default props for the class
    static defaultProps: IInscriptionExpressProps = {
        onMount: () => { }
    }

    constructor(props: IInscriptionExpressProps) {
        super(props);
        this.state = {
            stepIndex: 0
        };
        this.gotoStep = this.gotoStep.bind(this);
        this.gotoNextStep = this.gotoNextStep.bind(this);
        this.gotoPreviousStep = this.gotoPreviousStep.bind(this);
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() {
        this.props.onMount();
    }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IInscriptionExpressProps) {
        if (this.props.season != nextProps.season) nextProps.onMount();
    }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IInscriptionExpressProps, nextState: IInscriptionExpressState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IInscriptionExpressProps, prevState: IInscriptionExpressState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    gotoStep(index: number) {
        this.setState({
            ...this.state,
            stepIndex: index
        })
    }

    gotoNextStep() {
        this.gotoStep(this.state.stepIndex + 1);
    }

    gotoPreviousStep() {
        this.gotoStep(this.state.stepIndex - 1);
    }

    render() {
        return (
            <Layout sidebarContent={<SideBar />} headerBar_right={<HeaderBarRight />}>

                <Stepper activeStep={this.state.stepIndex}>
                    <Step>
                        <StepLabel>Sélectionner un adhérent</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Attribuer les activités</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Effectuer les règlements</StepLabel>
                    </Step>
                </Stepper>
                <div>
                    {
                        (this.state.stepIndex == 0) ?
                            <StepMembers
                                gotoStep={this.gotoStep} gotoNextStep={this.gotoNextStep} gotoPreviousStep={this.gotoPreviousStep} />
                            : (this.state.stepIndex == 1) ?
                                <StepAdhesions
                                    gotoStep={this.gotoStep} gotoNextStep={this.gotoNextStep} gotoPreviousStep={this.gotoPreviousStep} />
                                : undefined
                    }
                </div>
            </Layout>
        );
    }
}


import { connect } from "react-redux";
import * as ApiActions from "modules/api/actions";
import { getStore } from "modules/redux";
import { IApp_Reducer } from "applications/main/reducer";

const mapStateToProps = (state: IApp_Reducer): IInscriptionExpressProps => {
    return {
        season: state.application.seasonSelected
    };
}

const mapDispatchToProps = (dispatch): IInscriptionExpressProps => {
    return {
        onMount: () => {
            let _state: IApp_Reducer = getStore().getState();
            if (_state.application.seasonSelected) {
            }
        }
    };
}

export default InscriptionExpress;