import * as React from "react";
import * as ApiModels from "modules/api/models";
import { DropDownMenu, MenuItem, IconMenu, FlatButton } from "material-ui";
import * as moment from "moment";
import muiThemeable from 'material-ui/styles/muiThemeable';


interface ICurrentSeasonProps extends __MaterialUI.Styles.MuiThemeProviderProps {
    seasons?: ApiModels.Season[]
    seasonSelected?: ApiModels.Season
    onSelect?: (season: ApiModels.Season) => void
}

interface ICurrentSeasonState {

}

class CurrentSeason extends React.Component<ICurrentSeasonProps, ICurrentSeasonState>
{
    static defaultProps: ICurrentSeasonProps = {
        seasons: [],
        seasonSelected: undefined,
        onSelect: () => { }
    }

    constructor(props: ICurrentSeasonProps ) {
        super(props);
        this.state = {};
        this.handle_change = this.handle_change.bind(this);
    }

    handle_change(event, menuItemValue: number) {
        let _index = this.props.seasons.map(x => x.id).indexOf(menuItemValue);
        if (_index > -1) {
            this.props.onSelect(this.props.seasons[_index]);
        }
    }

    render() {
        if (!this.props.seasonSelected) return <div></div>;
        return (
            <IconMenu
                iconButtonElement={
                    <FlatButton
                        label={"Saison " + moment(this.props.seasonSelected.start).year() + " - " + moment(this.props.seasonSelected.end).year()}
                        style={{
                            color: this.props.muiTheme.appBar.textColor,
                            height: this.props.muiTheme.appBar.height,
                            marginTop: -8
                        }} />
                }
                value={this.props.seasonSelected.id} onChange={this.handle_change}>
                {
                    this.props.seasons.map((season) => {
                        return (
                            <MenuItem
                                key={season.id}
                                value={season.id}
                                label={"Saison " + moment(season.start).year() + " - " + moment(season.end).year()}
                                primaryText={"Saison " + moment(season.start).year() + " - " + moment(season.end).year()} />
                        );
                    })
                }
            </IconMenu>
        );
    }
}


import { connect } from "react-redux";
import { IApp_Reducer } from "./../reducer";
import * as AppActions from "./../actions";

const mapStateToProps = (state: IApp_Reducer): ICurrentSeasonProps => {
    return {
        seasons: state.application.seasons,
        seasonSelected: state.application.seasonSelected
    };
}

const mapDispatchToProps = (dispatch): ICurrentSeasonProps => {
    return {
        onSelect: (season: ApiModels.Season) => {
            dispatch(AppActions.selectSeason(season));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(CurrentSeason));