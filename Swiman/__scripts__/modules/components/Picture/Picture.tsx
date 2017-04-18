import * as React from "react";
import * as ApiModels from "modules/api/models";
import muiThemeable from 'material-ui/styles/muiThemeable';

interface IPictureProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    url?: string
    width?: number | string
    height?: number | string
    backgroundColor?: string
    color?: string,
    content?: React.ReactNode
    circle?: boolean
    style?: React.CSSProperties
    className?: string

    onMouseOver?: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseOut?: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface IPictureState {

}

class Picture extends React.Component<IPictureProps, IPictureState>
{
    static defaultProps: IPictureProps = {
        width: 200,
        height: 200,
        backgroundColor: "#aaa",
        color: "#fff"
    }
    constructor(props: IPictureProps ) {
        super(props);
        this.state = {};
    }

    render() {
        let _radius = undefined;
        if (this.props.circle) _radius = "50%";
        let _imgStyle: React.CSSProperties = {
            display: "inline-block",
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.backgroundColor,
            color: this.props.color,
            position: "relative",
            backgroundImage: (this.props.url) ? "url(" + this.props.url + ")" : undefined,
            borderBottomLeftRadius: _radius,
            borderBottomRightRadius: _radius,
            borderTopLeftRadius: _radius,
            borderTopRightRadius: _radius,
            ...this.props.style
        };
        return (
            <div className={this.props.className} style={_imgStyle}
                onMouseOver={this.props.onMouseOver}
                onMouseOut={this.props.onMouseOut}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}>
                {this.props.content}
            </div>
        );
    }
}

export default muiThemeable()(Picture);