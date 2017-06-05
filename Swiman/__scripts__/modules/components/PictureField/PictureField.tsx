import * as React from "react";
import * as ApiModels from "modules/api/models";

import { Picture, Crop } from "./../";
import {
    Dialog, RaisedButton,
    Step, StepButton, StepContent, StepLabel, Stepper
} from "material-ui";
import { Col, Row, Container } from "react-grid-system";


interface IPictureFieldProps {
    width?: number | string
    height?: number | string
    style?: React.CSSProperties
}

interface IPictureFieldState {
    mouseOver?: boolean
    dialogOpen?: boolean
    dialogStepIndex?: number
}

class PictureField extends React.PureComponent<IPictureFieldProps, IPictureFieldState>
{
    // set the default props for the class
    static defaultProps: IPictureFieldProps = { }

    constructor(props: IPictureFieldProps) {
        super(props);
        this.state = {
            dialogOpen: false,
            mouseOver: false,
            dialogStepIndex: 0
        };
        this.handle_dialog_close = this.handle_dialog_close.bind(this);
        this.handle_dialog_open = this.handle_dialog_open.bind(this);
        this.handle_onDownloadFile = this.handle_onDownloadFile.bind(this);
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IPictureFieldProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IPictureFieldProps, nextState: IPictureFieldState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IPictureFieldProps, prevState: IPictureFieldState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    handle_dialog_open() {
        console.log("click on picture")
        this.setState({
            ...this.state,
            dialogOpen: true
        });
    }

    handle_dialog_close() {
        this.setState({
            ...this.state,
            dialogOpen: false
        });
    }

    handle_onDownloadFile(e: React.ChangeEvent<HTMLInputElement>) {
        let _file = e.target.files[0];
        let imageType = /image.*/;
        if (!_file.type.match(imageType)) return;

        let _reader = new FileReader();
        _reader.onload = (e) => {
            let _src = (e.target as any).result;
            //création image
            //image onload
            //insertion canvas context
        };
        _reader.readAsDataURL(_file);
    }

    render() {
        let __this = this;
        let _style: React.CSSProperties = { cursor: "pointer" };
        let style_Icon: React.CSSProperties = {
            position: "absolute", top: "50%", left: "50%", marginLeft: "-.5em", marginTop: "-.5em",
            fontSize: "3em", opacity: 0.5,
            transition: "all ease .5s"
        };
        let style_IconOver: React.CSSProperties = { opacity: 1 };

        if (this.state.mouseOver) {
            style_Icon = { ...style_Icon, ...style_IconOver };
        }

        return (
            <div style={this.props.style}>
                <Picture
                    width={this.props.width}
                    height={this.props.height}
                    onMouseOver={() => { __this.setState({ ...__this.state, mouseOver: true }); }}
                    onMouseOut={() => { __this.setState({ ...__this.state, mouseOver: false }); }}
                    onClick={this.handle_dialog_open}
                    style={_style}
                    content={
                        <i className="fa fa-camera" style={style_Icon} />
                    } />
                <Dialog
                    open={this.state.dialogOpen}
                    modal={false}
                    onRequestClose={this.handle_dialog_close}>

                    <div>
                        <Stepper activeStep={this.state.dialogStepIndex} orientation="horizontal" >
                            <Step>
                                <StepLabel>Acquisition de la photo</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Recadrage de la photo</StepLabel>
                            </Step>
                        </Stepper>
                        <div>
                            {
                                (this.state.dialogStepIndex == 0) ?
                                this.renderGetImage()
                                    :
                                    this.renderCropImage()
                            }
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }

    renderGetImage() {
        return this.renderDownloadImage();
    }

    renderDownloadImage() {
        return (
            <div>
                <RaisedButton label="Télécharger un fichier image" primary containerElement="label">
                    <input type="file" accept="image/*"
                        onChange={this.handle_onDownloadFile}
                        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, width: "100%", opacity: 0 }} />
                </RaisedButton>
            </div>
        );
    }

    renderCropImage() {
        return (
            <div>
                Crop crop
            </div>
        );
    }
}

export default PictureField;