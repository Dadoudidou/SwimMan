import * as React from "react";
import * as ApiModels from "modules/api/models";
import { List, ListItem, Subheader, Divider, makeSelectable, IconButton } from "material-ui";


interface IActivitiesListItemProps {
    type: "activity" | "category" | "section"
}

interface IActivitiesListItemState {

}

class ActivitiesListItem extends React.PureComponent<IActivitiesListItemProps, IActivitiesListItemState>
{
    constructor(props: IActivitiesListItemProps ) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ListItem />
        );
    }
}

export default ActivitiesListItem;