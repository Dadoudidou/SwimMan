import * as React from "react";
import * as ApiModels from "modules/api/models";
import { List, ListItem, Subheader, Divider, makeSelectable } from "material-ui";

let SelectableList = makeSelectable(List);

interface IActivitiesProps {
    activities?: ApiModels.Activity[]
    activitySelected?: ApiModels.Activity
    onSelect?: (activity: ApiModels.Activity) => void
}

interface IActivitiesState {

}

class Activities extends React.PureComponent<IActivitiesProps, IActivitiesState>
{
    static defaultProps: IActivitiesProps = {
        activities: [],
        activitySelected: undefined,
        onSelect: () => { }
    }
    constructor(props: IActivitiesProps ) {
        super(props);
        this.state = {};
    }

    render() {
        let __this = this;
        return (
            <SelectableList value={(this.props.activitySelected) ? this.props.activitySelected.id : undefined}>
                <Subheader>Activités :</Subheader>
                { this.props.activities.map(x => __this.renderItem(x, true)) }
            </SelectableList>
        );
    }

    renderItem(activity: ApiModels.Activity, action: boolean = false) {
        let __this = this;
        return (
            <ListItem
                key={activity.id}
                value={activity.id}
                primaryText={activity.name}
                onTouchTap={() => { if (action) { __this.props.onSelect(activity); } } } />
        );
    }
}

//---------------------------------------------------------------------

import { connect } from "react-redux";
import { IActivities_Reducer } from "./../reducer";
import * as Constants from "./../constants";
import * as ApiActions from "modules/api/actions";

const mapStateToProps = (state: IActivities_Reducer): IActivitiesProps => {
    return {
        activities: state.route_Activities.activities,
        activitySelected: state.route_Activities.selected_activity
    };
}

const mapDispatchToProps = (dispatch): IActivitiesProps => {
    return {
        onSelect: (activity) => {
            dispatch(ApiActions.activities.GetSections({
                request_id: Constants.select_activity,
                Request: {
                    activity: activity
                }
            }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities);