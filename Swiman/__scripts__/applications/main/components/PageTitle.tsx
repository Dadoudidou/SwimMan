import * as React from "react";
import * as ApiModels from "modules/api/models";
import muiThemeable from 'material-ui/styles/muiThemeable';
import { IconButton } from "material-ui"
import { Col, Row, Container } from "react-grid-system";
import { hashHistory } from "react-router";

interface IPageTitleProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    label?: React.ReactNode
    secondaryLabel?: React.ReactNode
    actions?: React.ReactNode
    backButton?: boolean
}

interface IPageTitleState {

}

class _PageTitle extends React.PureComponent<IPageTitleProps, IPageTitleState>
{
    constructor(props: IPageTitleProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row>
                <Col md={6}>
                    <div style={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        color: this.props.muiTheme.baseTheme.palette.secondaryTextColor,
                        marginBottom: "0.7em",
                        padding: "0.3em 0.5em"
                    }}>
                        {(this.props.backButton) ?
                            <IconButton iconClassName="fa fa-arrow-left" tooltip="retour"
                                style={{ padding: 0, height: "auto" }}
                                iconStyle={{ color: this.props.muiTheme.palette.secondaryTextColor }}
                                onClick={() => { hashHistory.goBack(); }} />
                            : undefined}
                        {this.props.label}
                        {(this.props.secondaryLabel) ? <br /> : undefined}
                        {(this.props.secondaryLabel) ? <small>{this.props.secondaryLabel}</small> : undefined}
                    </div>
                </Col>
                <Col md={6}>
                    {this.props.actions}
                </Col>
            </Row>
        );
    }
}

let PageTitle = muiThemeable()(_PageTitle);

export { PageTitle };