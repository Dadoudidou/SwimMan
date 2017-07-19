
import { connect } from "react-redux";
import { IApp_Reducer } from "applications/main/reducer";
import { ISessionsCalendarReducer, Constants, Actions } from "./sync";
interface IStateReducer extends IApp_Reducer, ISessionsCalendarReducer { }

import { default as SelectPlace, ISelectPlaceProps } from "applications/main/components/SelectPlace";
const Section_mapStateToProps = (state: IStateReducer, props: ISelectPlaceProps): ISelectPlaceProps => {
    return {
        places: state.SessionsCalendar.places
    }
}
export default connect(Section_mapStateToProps)(SelectPlace);