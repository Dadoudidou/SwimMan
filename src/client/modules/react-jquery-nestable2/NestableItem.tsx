import * as React from "react";
import { classNames } from "modules/classnames";


interface INestableItemProps {
    item: any
    renderItem: (item: any) => React.ReactElement<any>
    itemChildrenProp?: string
}

interface INestableItemState {}

class NestableItem extends React.PureComponent<INestableItemProps, INestableItemState>{

    static defaultProps: INestableItemProps = {
        item: {},
        renderItem: (item) => item.toString(),
        itemChildrenProp: "children"
    }

    constructor(props:INestableItemProps){
        super(props);
        this.state = {}
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps:INestableItemProps){

    }

    render(){
        let __this = this;
        let _datas: any = {}

        for(let key in this.props.item){
            if(key != this.props.itemChildrenProp){
                _datas[key] = true;
            }
        }
        return (
            <li className={classNames("dd-item")} data-id={this.props.item.id}>
                <div className={classNames("dd-handle")}>
                    {this.props.renderItem(this.props.item)}
                </div>
                {this.props.item[this.props.itemChildrenProp] && (
                    <ol className={classNames("dd-list")}>
                        {this.props.item[this.props.itemChildrenProp].map((item, i) => {
                            return (
                                <NestableItem 
                                    key={i}
                                    item={item}
                                    itemChildrenProp={__this.props.itemChildrenProp}
                                    renderItem={__this.props.renderItem} />
                            )
                        })}
                    </ol>
                )}
            </li>
        )
    }

}

export default NestableItem;