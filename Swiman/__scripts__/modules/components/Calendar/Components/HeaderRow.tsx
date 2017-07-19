import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment";

interface IHeaderRowProps {
    range: Date[]
    format?: string
    resourceColumn?: React.ReactNode
    resourceColumnStyle?: React.CSSProperties
    styleColumn?: React.CSSProperties
    style?: React.CSSProperties
}

interface IHeaderRowState {
}

class HeaderRow extends React.PureComponent<IHeaderRowProps, IHeaderRowState>
{
    // set the default props for the class
    static defaultProps: IHeaderRowProps = {
        range: [],
        format: "ll"
    }

    constructor(props: IHeaderRowProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IHeaderRowProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IHeaderRowProps, nextState: IHeaderRowState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IHeaderRowProps, prevState: IHeaderRowState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        let _rowStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: "row",
            ...this.props.style
        }

        let _colStyle: React.CSSProperties = {
            display: "flex",
            borderLeft: "1px solid #aaa",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexBasis: (100 / this.props.range.length) + "%",
            maxWidth: (100 / this.props.range.length) + "%",
            ...this.props.styleColumn
        }

        let _resourceColumnStyle: React.CSSProperties = {
            display: "flex",
            flex: "none",
            width: 100,
            ...this.props.resourceColumnStyle
        }

        return (
            <div style={_rowStyle}>
                {
                    (this.props.resourceColumn) ?
                        <div style={_resourceColumnStyle}>{this.props.resourceColumn}</div>
                    : undefined
                }
                {this.props.range.map((date, index) => {
                    return (
                        <div key={index} style={_colStyle}>
                            {moment(date).format(__this.props.format)}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default HeaderRow;