import * as React from "react";
import * as ApiModels from "modules/api/models";

interface IGridColumnProps {
    range: Date[]
    style?: React.CSSProperties
    cellStyle?: React.CSSProperties
    cell?: (date: Date, index: number) => React.ReactNode
}

interface IGridColumnState {
}

class GridColumn extends React.PureComponent<IGridColumnProps, IGridColumnState>
{
    // set the default props for the class
    static defaultProps: IGridColumnProps = {
        range: [],
        cell: () => { return ""; }
    }

    constructor(props: IGridColumnProps) {
        super(props);
        this.state = {};
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() { }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IGridColumnProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IGridColumnProps, nextState: IGridColumnState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IGridColumnProps, prevState: IGridColumnState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() { }

    //#endregion

    render() {
        let __this = this;
        let _rootStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            ...this.props.style
        }

        let _cellStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: "column",
            ...this.props.cellStyle
        }

        return (
            <div style={_rootStyle}>
                {this.props.range.map((date, index) => {
                    return (
                        <div key={index} style={_cellStyle}>
                            {__this.props.cell(date, index)}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default GridColumn;