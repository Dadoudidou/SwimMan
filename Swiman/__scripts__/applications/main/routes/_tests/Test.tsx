import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Select } from "modules/components";

interface ITestProps {

}

interface ITestState {

}

class Test extends React.PureComponent<ITestProps, ITestState>
{
    constructor(props: ITestProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                Test
            </div>
        );
    }
}

export default Test;