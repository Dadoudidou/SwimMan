import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment"

import { Dialog, TimePicker, TextField, FlatButton, SelectField, MenuItem } from "material-ui";
import { Col, Row, Container } from "react-grid-system";
import SelectSection from "./SelectSection";
import SelectPlace from "./SelectPlace"
import NumberField from "applications/main/components/NumberField"

interface IFormProps {
    session: ApiModels.Session
    onSave?: (session: ApiModels.Session) => void
    onCancel?: () => void
    onRemove?: (session: ApiModels.Session) => void
}

interface IFormState {
    session: ApiModels.Session
    errors: { [x: string]: string }
}

class Form extends React.PureComponent<IFormProps, IFormState>
{
    // set the default props for the class
    static defaultProps: IFormProps = {
        session: undefined,
        onCancel: () => { },
        onSave: () => { },
        onRemove: () => { }
    }

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            session: props.session ? JSON.parse(JSON.stringify(props.session)) : undefined,
            errors: {}
        };
        this.handle_onCancel = this.handle_onCancel.bind(this);
        this.handle_onSave = this.handle_onSave.bind(this);
        this.handle_update = this.handle_update.bind(this);
        this.handle_onRemove = this.handle_onRemove.bind(this);
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IFormProps) {
        this.setState({
            ...this.state,
            session: nextProps.session ? JSON.parse(JSON.stringify(nextProps.session)) : undefined,
            errors: {}
        })
    }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IFormProps, nextState: IFormState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IFormProps, prevState: IFormState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    handle_update(session: ApiModels.Session) {
        this.setState({
            ...this.state,
            session: session,
            errors: {}
        });
    }

    handle_onSave() {
        let _errors = {};
        //check
        if (!this.state.session.section)
            _errors["section"] = "La session doit avoir une section renseignée.";
        if (!this.state.session.place)
            _errors["place"] = "La session doit avoir un lieu renseigné.";
        if (!this.state.session.day)
            _errors["day"] = "Veuillez renseigner le jour.";
        if (!this.state.session.start)
            _errors["start"] = "Veuillez renseigner l'heure de début.";
        if (!this.state.session.end)
            _errors["end"] = "Veuillez renseigner l'heure de fin.";
        if (!this.state.session.nbSlots || this.state.session.nbSlots <= 0)
            _errors["slots"] = "Le nombre de places disponibles pour cette session doit être supérieur à 0.";

        if (!_errors["start"] && !_errors["end"]) {
            let _start = moment().startOf('day').add(moment.duration(this.state.session.start));
            let _end = moment().startOf('day').add(moment.duration(this.state.session.end));
            if (_start.isSameOrAfter(_end)) {
                _errors["start"] = "L'heure de début doit être inférieur à l'heure de fin";
            }
        }

        //save
        let _length = 0;
        for (let _key in _errors) { _length++; }
        if (_length == 0)
            this.props.onSave(this.state.session);
        else
            this.setState({ ...this.state, errors: _errors });
    }

    handle_onCancel() {
        this.props.onCancel();
    }

    handle_onRemove() {
        this.props.onRemove(this.state.session);
    }

    render() {
        let __this = this;
        return (
            <div>
                <Dialog
                    open={this.state.session != undefined}
                    onRequestClose={this.handle_onCancel}
                    title={(this.state.session && this.state.session.id > 0) ? "Modifier une session" : "Nouvelle session"}
                    actions={[
                        <FlatButton key="remove" label="Supprimer" onClick={this.handle_onRemove} />,
                        <FlatButton key="cancel" label="Annuler" onClick={this.handle_onCancel} />,
                        <FlatButton key="save" label="Enregistrer" onClick={this.handle_onSave} />
                    ]}>
                    {this.renderForm()}
                </Dialog>
            </div>
        );
    }

    renderForm() {
        if (!this.state.session) return <div></div>
        let __this = this;
        return (
            <Row>
                <Col md={12}>
                    <SelectSection
                        errorText={this.state.errors["section"]}
                        value={this.state.session.section}
                        onChange={(event, inde, section) => {
                            __this.handle_update({
                                ...__this.state.session,
                                section: section
                            })
                        }} />
                </Col>
                <Col md={12}>
                    <SelectPlace
                        errorText={this.state.errors["place"]}
                        value={this.state.session.place}
                        onChange={(event, inde, place) => {
                            __this.handle_update({
                                ...__this.state.session,
                                place: place
                            })
                        }} />
                </Col>
                <Col md={12}>
                    <SelectField
                        fullWidth
                        errorText={this.state.errors["day"]}
                        floatingLabelText="Jour"
                        value={this.state.session.day}
                        onChange={(event, inde, value) => {
                            __this.handle_update({ ...__this.state.session, day: value})
                        }}>
                        <MenuItem primaryText="Lundi" value={1} />
                        <MenuItem primaryText="Mardi" value={2} />
                        <MenuItem primaryText="Mercredi" value={3} />
                        <MenuItem primaryText="Jeudi" value={4} />
                        <MenuItem primaryText="Vendredi" value={5} />
                        <MenuItem primaryText="Samedi" value={6} />
                    </SelectField>
                </Col>
                <Col md={6}>
                    <TimePicker fullWidth
                        errorText={this.state.errors["start"]}
                        cancelLabel="Annuler"
                        okLabel="Ok"
                        floatingLabelText="Heure de début"
                        format="24hr"
                        value={moment().startOf('day').add(moment.duration(this.state.session.start)).toDate()}
                        onChange={(event, time) => {
                            __this.handle_update({ ...__this.state.session, start: moment(time).format("HH:mm:ss") })
                        }} />
                </Col>
                <Col md={6}>
                    <TimePicker fullWidth
                        errorText={this.state.errors["end"]}
                        cancelLabel="Annuler"
                        okLabel="Ok"
                        floatingLabelText="Heure de fin"
                        format="24hr"
                        value={moment().startOf('day').add(moment.duration(this.state.session.end)).toDate()}
                        onChange={(event, time) => {
                            __this.handle_update({ ...__this.state.session, end: moment(time).format("HH:mm:ss") })
                        }} />
                </Col>
                <Col md={12}>
                    <NumberField
                        errorText={this.state.errors["slots"]}
                        fullWidth
                        floatingLabelText="Nombre de places"
                        decimal={false}
                        value={this.state.session.nbSlots}
                        onChange={(event, value) => {
                            __this.handle_update({
                                ...__this.state.session,
                                nbSlots: value
                            })
                        }} />
                </Col>
            </Row>
        )
    }
}

export default Form;