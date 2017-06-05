import * as React from "react";
import * as ApiModels from "modules/api/models";
import * as moment from "moment";
import { Table, TableBody, TableFooter, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, RaisedButton, Dialog, FlatButton, DatePicker } from "material-ui";

import { PageTitle } from "applications/main/components";

import * as areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/fr');
    require('intl/locale-data/jsonp/fa-IR');
}

interface ISeasonsProps {
    seasons?: ApiModels.Season[]
    onInit?: () => void
    onAdd?: (season: ApiModels.Season) => void
    onEdit?: (season: ApiModels.Season) => void
}

interface ISeasonsState {
    editSeason?: ApiModels.Season
}

class Seasons extends React.PureComponent<ISeasonsProps, ISeasonsState>
{
    static defaultProps: ISeasonsProps = {
        seasons: [],
        onInit: () => { },
        onAdd: () => { },
        onEdit: () => { }
    }

    constructor(props: ISeasonsProps ) {
        super(props);
        this.state = {
            editSeason: undefined
        };
        this.handle_onAdd = this.handle_onAdd.bind(this);
        this.handle_onEdit = this.handle_onEdit.bind(this);
        this.handle_onClose = this.handle_onClose.bind(this);
        this.handle_onSave = this.handle_onSave.bind(this);

        props.onInit();
    }

    handle_onAdd() {
        let _start = moment().hour(0).minute(0).second(0).month(8).year(moment().year() + ((moment().month() >= 5) ? 0 : -1)).date(1).toDate();
        let _end = moment().hour(0).minute(0).second(0).month(6).year(moment().year() + ((moment().month() >= 5) ? 1 : 0)).date(31).toDate();
        let _season = new ApiModels.Season({
            start: _start,
            end: _end
        });
        this.setState({
            ...this.state,
            editSeason: _season
        });
    }

    handle_onEdit(season: ApiModels.Season) {
        this.setState({
            ...this.state,
            editSeason: JSON.parse(JSON.stringify(season))
        });
    }

    handle_onClose() {
        this.setState({
            ...this.state,
            editSeason: null
        });
    }

    handle_onSave() {
        this.props.onAdd(this.state.editSeason);
        this.handle_onClose();
    }

    handle_onChange(debut: boolean, date: Date) {
        this.setState({
            ...this.state,
            editSeason: {
                ...this.state.editSeason,
                start: (debut) ? moment(date).toDate() : this.state.editSeason.start,
                end: (debut) ? this.state.editSeason.end : moment(date).toDate()
            }
        })
    }

    render() {
        return (
            <div>
                <PageTitle label="Saisons" />
                <div style={{ textAlign: "right" }}>
                    <RaisedButton label="Créer une saison" onTouchTap={this.handle_onAdd} />
                </div>
                {this.renderTable()}
                {this.renderDialog()}
            </div>
        );
    }

    renderTable() {
        let _widthDateRow = 150;
        return (
            <Table fixedHeader={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Nom</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: _widthDateRow }}>Début</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: _widthDateRow }}>Fin</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false} >
                    {
                        this.props.seasons.map(season => {
                            return (
                                <TableRow key={season.id}>
                                    <TableRowColumn>Saison {moment(season.start).year()} - {moment(season.end).year()}</TableRowColumn>
                                    <TableRowColumn style={{ width: _widthDateRow }}>{moment(season.start).format("LL")}</TableRowColumn>
                                    <TableRowColumn style={{ width: _widthDateRow }}>{moment(season.end).format("LL")}</TableRowColumn>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        );
    }

    renderDialog() {
        let __this = this;
        if (!this.state.editSeason) return <div></div>;
        
        let _actions = [
            <FlatButton label="Annuler" primary={true} onTouchTap={this.handle_onClose} />,
            <FlatButton label="Enregistrer" primary={true} keyboardFocused={true} onTouchTap={this.handle_onSave} />
        ];
        return (
            <Dialog
                open={this.state.editSeason != undefined}
                onRequestClose={this.handle_onClose}
                actions={_actions}
                modal={false}
                title={(this.state.editSeason.id == 0) ? "Ajouter une saison" : "Editer une saison"}>

                <DatePicker floatingLabelText="Début"
                    fullWidth
                    locale="fr"
                    formatDate={new DateTimeFormat('fr', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }).format}
                    DateTimeFormat={DateTimeFormat}
                    onChange={(e, date) => { __this.handle_onChange(true, date); } }
                    value={this.state.editSeason.start} />
                <DatePicker floatingLabelText="Fin"
                    fullWidth
                    locale="fr"
                    formatDate={new DateTimeFormat('fr', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }).format}
                    DateTimeFormat={DateTimeFormat}
                    onChange={(e, date) => { __this.handle_onChange(false, date); } }
                    value={this.state.editSeason.end} />

            </Dialog>
        );
    }
}


import { connect } from "react-redux";
import { ISeason_Reducer } from "./../reducer";
import * as ApiActions from "modules/api/actions";
import * as Constants from "./../constants";

const mapStateToProps = (state: ISeason_Reducer): ISeasonsProps => {
    return {
        seasons: state.route_seasons.seasons
    };
}

const mapDispatchToProps = (dispatch): ISeasonsProps => {
    return {
        onAdd: (season: ApiModels.Season) => {
            dispatch(ApiActions.seasons.Add({
                request_id: Constants.add_season,
                Request: {
                    season: season
                }
            }));
        },
        onEdit: (season: ApiModels.Season) => {
            dispatch(ApiActions.seasons.Update({
                request_id: Constants.update_season,
                Request: {
                    season: season
                }
            }));
        },
        onInit: () => {
            dispatch(ApiActions.seasons.Gets({
                request_id: Constants.get_seasons,
                Request: {}
            }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Seasons);