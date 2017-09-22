import * as React from "react";

interface IComponentProps {}

class Component extends React.PureComponent<IComponentProps, any>
{
    render(){
        return (
            <div>
                Hello World !!
            </div>
        );
    }
}

export default Component;