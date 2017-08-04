import * as React from "react";
import * as ApiModels from "modules/api/models";

import * as moment from "moment";
import { Paper, Subheader, RaisedButton, Toggle } from "material-ui";
import ExpandTransition from "material-ui/internal/ExpandTransition"
import { Col, Row, Container } from "react-grid-system";

import SelectionMember from "applications/main/routes/members/components/AutoComplete";
import { default as FormMember, IFormErrors } from "applications/main/routes/members/components/Form";

interface IStepMembersProps {
    gotoStep?: (index: number) => void
    gotoNextStep?: () => void
    gotoPreviousStep?: () => void
    onSelectMember?: (member: ApiModels.Member) => void

    member?: ApiModels.Member
}

interface IStepMembersState {
    member?: ApiModels.Member
    errors?: IFormErrors
    showNext?: boolean
}

class StepMembers extends React.PureComponent<IStepMembersProps, IStepMembersState>
{
    // set the default props for the class
    static defaultProps: IStepMembersProps = {
        gotoStep: () => { },
        gotoNextStep: () => { },
        gotoPreviousStep: () => { },
        onSelectMember: () => { }
    }

    constructor(props: IStepMembersProps) {
        super(props);
        this.state = {
            member: (props.member) ? JSON.parse(JSON.stringify(props.member)) : new ApiModels.Member(),
            errors: {},
            showNext: false
        };
        this.handle_NewMember = this.handle_NewMember.bind(this);
        this.handle_UpdateMember = this.handle_UpdateMember.bind(this);
        this.handle_onNext = this.handle_onNext.bind(this);
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IStepMembersProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IStepMembersProps, nextState: IStepMembersState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IStepMembersProps, prevState: IStepMembersState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    validate(model: ApiModels.Member): { errors: IFormErrors, nbErrors: number } {
        let _errors: IFormErrors = {};

        //validate
        if (model.first_name == undefined || model.first_name.trim() == "")
            _errors.first_name = "Champs invalide";
        if (model.last_name == undefined || model.last_name.trim() == "")
            _errors.last_name = "Champs invalide";

        let _length = 0; for (let i in _errors) { _length++; }

        return {
            errors: _errors,
            nbErrors: _length
        };
    }

    handle_NewMember() {
        this.setState({
            ...this.state,
            member: new ApiModels.Member(),
            errors: {},
            showNext: false
        })
    }

    handle_UpdateMember(value: ApiModels.Member) {

        let _showActivities = true;
        let _err = this.validate(value);
        if (_err.nbErrors > 0) _showActivities = false;

        this.setState({
            ...this.state,
            member: value,
            errors: {},
            showNext: _showActivities
        })
    }

    handle_onNext() {
        let _err = this.validate(this.state.member);
        if (_err.nbErrors > 0) {
            this.setState({ ...this.state, errors: _err.errors });
        } else {
            this.props.onSelectMember(this.state.member);
            this.props.gotoNextStep();
        }
    }

    render() {
        let __this = this;
        let _validate = this.validate(this.state.member);
        return (
            <div>
                <Row>
                    <Col md={3}>
                        <Paper zDepth={1}>
                            <Subheader>Rechercher un adhérent</Subheader>
                            <div style={{ padding: "0 1em 1em 1em" }}>
                                <SelectionMember onSelect={this.handle_UpdateMember} />
                            </div>
                            <RaisedButton fullWidth primary label="Nouvel adhérent" onClick={this.handle_NewMember} />
                        </Paper>
                    </Col>
                    <Col md={9}>
                        <FormMember key={this.state.member.id}
                            errors={_validate.errors}
                            member={this.state.member} onUpdate={this.handle_UpdateMember} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div style={{ textAlign: "right" }}>
                            <br />
                            <ExpandTransition open={_validate.nbErrors == 0}>
                                <RaisedButton primary label="Attribuer des activités" onClick={this.handle_onNext} />
                            </ExpandTransition>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

import { connect } from "react-redux";
import { Actions, Constants, IInscriptionExpressReducer } from "./../../sync";

const mapStateToProps = (state: IInscriptionExpressReducer, props: IStepMembersProps): IStepMembersProps => {
    return {
        member: state.InscriptionExpress.member
    }
}

const mapDispatchToprops = (dispatch): IStepMembersProps => {
    return {
        onSelectMember: (member) => {
            dispatch(Actions.setMember(member));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(StepMembers);