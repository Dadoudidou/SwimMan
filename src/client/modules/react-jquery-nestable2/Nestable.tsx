import * as React from "react";
import { classNames } from "modules/classnames";
import NestableItem from "./NestableItem"

import * as $ from "jquery";
(window as any).jQuery = $;
require("nestable2/dist/jquery.nestable.min.css");
require("nestable2/dist/jquery.nestable.min.js");


interface INestableProps {
    items: any[]
    renderItem: (item: any) => React.ReactElement<any>
    itemChildrenProp?: string
    className?: string
    maxDepth?: number
    callback?: (mainContainer, element) => void
}

interface INestableState {}

class Nestable extends React.PureComponent<INestableProps, INestableState>{

    static defaultProps: INestableProps = {
        items: [],
        renderItem: (item) => item.toString(),
        itemChildrenProp: "children",
        maxDepth: 5
    }

    constructor(props:INestableProps){
        super(props);
        this.state = {}
        this.onChange = this.onChange.bind(this);
    }

    refs: {
        nestable: HTMLDivElement
    }

    onChange(mainContainer, element){
        let result = $(this.refs.nestable).nestable("serialize");
        console.log(result);
    }

    componentDidMount(){
        $(this.refs.nestable).nestable({
            maxDepth: this.props.maxDepth,
            callback: this.onChange,
        });
    }

    componentWillReceiveProps(nextProps:INestableProps){

    }

    render(){
        let __this = this;
        return (
            <div className={classNames("dd", this.props.className)} ref="nestable">
                <ol className={classNames("dd-list")}>
                    {this.props.items.map((item, i) => {
                        return (
                            <NestableItem 
                                key={i}
                                item={item}
                                itemChildrenProp={__this.props.itemChildrenProp}
                                renderItem={__this.props.renderItem} />
                        )
                    })}
                </ol>
            </div>
        )
    }

}

export default Nestable;