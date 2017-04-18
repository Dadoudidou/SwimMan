import * as React from "react";
import * as ApiModels from "modules/api/models";

interface ISelectProps {

}

interface ISelectState {

}

class Select extends React.Component<ISelectProps, ISelectState>
{
    constructor(props: ISelectProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                Select
            </div>
        );
    }
}

export default Select;