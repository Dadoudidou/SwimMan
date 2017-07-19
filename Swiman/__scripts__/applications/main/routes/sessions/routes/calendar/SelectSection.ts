
import { connect } from "react-redux";
import { IApp_Reducer } from "applications/main/reducer";
import { ISessionsCalendarReducer, Constants, Actions } from "./sync";
interface IStateReducer extends IApp_Reducer, ISessionsCalendarReducer { }

import { default as SelectSection, ISelectSectionProps } from "applications/main/components/SelectSection";
const Section_mapStateToProps = (state: IStateReducer, props: ISelectSectionProps): ISelectSectionProps => {
    return {
        categories: state.SessionsCalendar.sections
    }
}
export default connect(Section_mapStateToProps)(SelectSection);