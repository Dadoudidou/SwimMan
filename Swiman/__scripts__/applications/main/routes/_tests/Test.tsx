import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Select, PlanningTimeLine } from "modules/components";
import Calendar from "modules/components/Calendar";

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
            <div style={{ padding: "2em" }}>
                <Calendar />
            </div>
        );
    }
}

export default Test;