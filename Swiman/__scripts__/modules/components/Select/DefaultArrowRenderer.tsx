import * as React from "react";
import * as ApiModels from "modules/api/models";

interface IDefaultArrowRendererProps {
    onMouseDown?: (event: React.MouseEvent<HTMLSpanElement>) => void
}

interface IDefaultArrowRendererState {

}

class DefaultArrowRenderer extends React.PureComponent<IDefaultArrowRendererProps, IDefaultArrowRendererState>
{
    constructor(props: IDefaultArrowRendererProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <span className="select-arrow" onMouseDown={this.props.onMouseDown} />
        );
    }
}

export default DefaultArrowRenderer;