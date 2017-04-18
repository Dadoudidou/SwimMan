import * as React from "react";
import * as ApiModels from "modules/api/models";
import { List, ListItem, Subheader, Divider, makeSelectable } from "material-ui";

let SelectableList = makeSelectable(List);

interface ISectionsProps {
    Sections?: ApiModels.Section[]
    sectionSelected?: ApiModels.Section
    onSelect?: (section: ApiModels.Section) => void
}

interface ISectionsState {

}

class Sections extends React.Component<ISectionsProps, ISectionsState>
{
    static defaultProps: ISectionsProps = {
        Sections: [],
        sectionSelected: undefined,
        onSelect: () => { }
    }
    constructor(props: ISectionsProps) {
        super(props);
        this.state = {};
    }

    render() {
        let __this = this;
        return (
            <SelectableList value={(this.props.sectionSelected) ? this.props.sectionSelected.id : undefined}>
                <Subheader>Sections :</Subheader>
                {this.props.Sections.map(x => __this.renderItem(x, true))}
            </SelectableList>
        );
    }

    renderItem(section: ApiModels.Section, action: boolean = false) {
        let __this = this;
        return (
            <ListItem
                key={section.id}
                value={section.id}
                primaryText={section.name}
                onTouchTap={() => { if (action) { __this.props.onSelect(section); } }} />
        );
    }
}

//---------------------------------------------------------------------

import { connect } from "react-redux";
import { IActivities_Reducer } from "./../reducer";
import * as Constants from "./../constants";
import * as ApiActions from "modules/api/actions";

const mapStateToProps = (state: IActivities_Reducer): ISectionsProps => {
    return {
        Sections: state.route_Activities.sections
    };
}

const mapDispatchToProps = (dispatch): ISectionsProps => {
    return {
       
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sections);