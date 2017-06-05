import * as React from "react";
import * as ApiModels from "modules/api/models";

interface IListItemProps {

}

interface IListItemState {

}

class ListItem extends React.PureComponent<IListItemProps, IListItemState>
{
    constructor(props: IListItemProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                ListItem
            </div>
        );
    }
}

export default ListItem;