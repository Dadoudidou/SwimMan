import * as React from "react";
import * as ApiModels from "modules/api/models";
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Col, Row, Container } from "react-grid-system";

interface IPageTitleProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    label?: React.ReactNode
    secondaryLabel?: React.ReactNode
    actions?: React.ReactNode
}

interface IPageTitleState {

}

class _PageTitle extends React.Component<IPageTitleProps, IPageTitleState>
{
    constructor(props: IPageTitleProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row>
                <Col md={3}>
                    <div style={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        color: this.props.muiTheme.baseTheme.palette.secondaryTextColor,
                        marginBottom: "0.7em",
                        padding: "0.3em 0.5em"
                    }}>
                        {this.props.label}
                        {(this.props.secondaryLabel) ? <br /> : undefined}
                        {(this.props.secondaryLabel) ? <small>{this.props.secondaryLabel}</small> : undefined}
                    </div>
                </Col>
                <Col md={9}>
                    {this.props.actions}
                </Col>
            </Row>
        );
    }
}

let PageTitle = muiThemeable()(_PageTitle);

export { PageTitle };