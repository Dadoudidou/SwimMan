import * as React from "react";
import * as ApiModels from "modules/api/models";

import SelectionSaison from "./CurrentSeason";

interface IHeaderBarRightProps {

}

interface IHeaderBarRightState {

}

class HeaderBarRight extends React.Component<IHeaderBarRightProps, IHeaderBarRightState>
{
    constructor(props: IHeaderBarRightProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <SelectionSaison />
            </div>
        );
    }
}


export default HeaderBarRight;