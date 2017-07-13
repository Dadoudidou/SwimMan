import * as React from "react";
import * as ApiModels from "modules/api/models";
import { Select, PlanningTimeLine } from "modules/components";

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
                <PlanningTimeLine
                    title="Titre"
                    resources={[
                        {
                            id: 1, title: "groupe A", children: [
                                {
                                    id: 1, title: "groupe AA", children: [
                                        { id: 1, title: "groupe AAA" },
                                        { id: 2, title: "groupe AAB" },
                                        { id: 3, title: "groupe AAC" }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 2, title: "groupe B", children: [
                                {
                                    id: 2, title: "groupe BA", children: [
                                        { id: 4, title: "groupe BAA" }
                                    ]
                                }
                            ]
                        }
                    ]} />
            </div>
        );
    }
}

export default Test;