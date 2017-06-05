import * as React from "react";
import * as ApiModels from "modules/api/models";

interface IClearRendererProps {

}

interface IClearRendererState {

}

class ClearRenderer extends React.PureComponent<IClearRendererProps, IClearRendererState>
{
    constructor(props: IClearRendererProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <span className="select-clear" dangerouslySetInnerHTML={{ __html:"&times;" }} />
        );
    }
}

export default ClearRenderer;