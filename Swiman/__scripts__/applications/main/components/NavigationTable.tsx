import * as React from "react";
import { IconButton } from "material-ui";


export interface INavigationTableProps {
    currentPage?: number
    countPages?: number
    ElementsPerPage?: number
    onChangePage?: (page: number) => void
}

interface INavigationTableState {
}

class NavigationTable extends React.PureComponent<INavigationTableProps, INavigationTableState>
{
    constructor(props: INavigationTableProps) {
        super(props);
        this.state = { };
    }

    render() {
        let __this = this;
        if (this.props.currentPage == undefined || this.props.countPages == undefined) return <span></span>;

        return (
            <div style={{ verticalAlign: "top", display: "inline-block", height: "48px" }}>
                <span>
                    &nbsp;&nbsp;
                    {(this.props.currentPage - 1) * this.props.ElementsPerPage + 1}
                    <span> - </span>
                    {(this.props.countPages < this.props.currentPage * this.props.ElementsPerPage) ? this.props.countPages : this.props.currentPage * this.props.ElementsPerPage}
                    <span> de </span>
                    {this.props.countPages}
                </span>
                <IconButton
                    iconClassName="fa fa-chevron-left"
                    disabled={this.props.currentPage == 1}
                    onClick={() => { __this.props.onChangePage(__this.props.currentPage - 1); }} />
                <IconButton
                    iconClassName="fa fa-chevron-right"
                    disabled={(this.props.currentPage) >= (this.props.countPages / this.props.ElementsPerPage)}
                    onClick={() => { __this.props.onChangePage(__this.props.currentPage + 1); }} />
            </div>
        );
    }
}

export default NavigationTable;