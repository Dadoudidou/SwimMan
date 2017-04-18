import { connect } from "react-redux";
import { INotificationsProps, default as Notifications } from "./../components/Notifications";
import * as Models from "./../models";
import * as Actions from "./../actions";
import { IModNotifs_Reducer } from "./../reducer";

interface IState extends IModNotifs_Reducer { }

export interface INotifsProps {
    className?: string

    getIcon?: (item: Models.Notification) => React.ReactNode
    getActions?: (item: Models.Notification) => React.ReactNode

    transitionName?: string
    transitionEnterTimeout?: number
    transitionLeaveTimeout?: number
}

const mapStateToProps = (state: IState, props: INotifsProps): INotificationsProps => {
    return {
        className: props.className,
        notifications: state.mod_notifications.notifications,
        getActions: props.getActions,
        getIcon: props.getIcon,
        transitionEnterTimeout: props.transitionEnterTimeout,
        transitionLeaveTimeout: props.transitionLeaveTimeout,
        transitionName: props.transitionName
    };
}

const mapDispatchToProps = (dispatch: Function): INotificationsProps => {
    return {
        onDismiss: (item) => {
            dispatch(Actions.Dismiss(item.id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);