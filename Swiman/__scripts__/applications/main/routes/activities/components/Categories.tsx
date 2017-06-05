import * as React from "react";
import * as ApiModels from "modules/api/models";
import { List, ListItem, Subheader, Divider, makeSelectable, IconButton } from "material-ui";

let SelectableList = makeSelectable(List);



interface ICategoriesProps {
    categories?: ApiModels.Category[]
    categorySelected?: ApiModels.Category
    onSelect?: (category: ApiModels.Category) => void
}

interface ICategoriesState {

}

class Categories extends React.PureComponent<ICategoriesProps, ICategoriesState>
{
    static defaultProps: ICategoriesProps = {
        categories: [],
        categorySelected: undefined,
        onSelect: () => { }
    }
    constructor(props: ICategoriesProps ) {
        super(props);
        this.state = {};
    }

    render() {
        let __this = this;
        return (
            <SelectableList value={(this.props.categorySelected) ? this.props.categorySelected.id : undefined}>
                <Subheader>Catégories :</Subheader>
                {this.props.categories.map(x => __this.renderItem(x)) }
            </SelectableList>
        );
    }

    renderItem(category: ApiModels.Category) {
        let __this = this;
        let _rightIconMenu = (
            <IconButton iconClassName="fa fa-pencil" iconStyle={{ fontSize: 18 }} />
        );
        return (
            <ListItem
                key={category.id}
                value={category.id}
                primaryText={category.name}
                rightIconButton={_rightIconMenu}
                onTouchTap={() => { __this.props.onSelect(category); }} />
        );
    }
    
}

import { connect } from "react-redux";
import { IActivities_Reducer } from "./../reducer";
import * as Constants from "./../constants";
import * as ApiActions from "modules/api/actions";

const mapStateToProps = (state: IActivities_Reducer): ICategoriesProps => {
    return {
        categories: state.route_Activities.categories,
        categorySelected: state.route_Activities.selected_category
    };
}

const mapDispatchToProps = (dispatch): ICategoriesProps => {
    return {
        onSelect: (category: ApiModels.Category) => {
            dispatch(ApiActions.activities.GetActivities({
                request_id: Constants.select_category,
                Request: {
                    category: category
                }
            }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);