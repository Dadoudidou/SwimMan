import * as React from "react";
import * as Models from "./../models";
import * as TransitionGroup from "react-addons-css-transition-group";


require("./../styles/notification.scss");
import Notif from "./Notification";


export interface INotificationsProps {
    className?: string
    notifications?: Models.Notification[]

    getIcon?: (item: Models.Notification) => React.ReactNode
    getActions?: (item: Models.Notification) => React.ReactNode

    transitionName?: string
    transitionEnterTimeout?: number
    transitionLeaveTimeout?: number

    onDismiss?: (item: Models.Notification) => void
}

class Notifications extends React.Component<INotificationsProps, any>{

    static defaultProps: INotificationsProps = {
        notifications: [],
        getIcon: (item) => {
            if (item.icon) return item.icon;
            return undefined;
        },
        getActions: (item) => {
            if (item.actions) return item.actions;
            return undefined;
        },
        transitionName: "notifications-transition",
        transitionEnterTimeout: 600,
        transitionLeaveTimeout: 600
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.renderNotification = this.renderNotification.bind(this);
        this.handle_onClose = this.handle_onClose.bind(this);
    }

    handle_onClose(item: Models.Notification) {
        if (this.props.onDismiss)
            this.props.onDismiss(item);
    }

    render() {
        let _className = ["notifications"];
        if (this.props.className) _className.push(this.props.className);
        return (
            <div className={_className.join(' ')}>
                <TransitionGroup 
                    transitionName={this.props.transitionName}
                    transitionEnterTimeout={this.props.transitionEnterTimeout}
                    transitionLeaveTimeout={this.props.transitionLeaveTimeout}>
                    {this.props.notifications.map(this.renderNotification)}
                </TransitionGroup>
            </div>
        );
    }

    renderNotification(notif: Models.Notification, index: number) {
        let icon, content, actions, close, className = [];
        let __this = this;

        icon = this.props.getIcon(notif);
        content = notif.message;
        close = (notif.canBeClosed) ? "×" : undefined;
        actions = this.props.getActions(notif);

        return (
            <Notif
                key={(notif.id) ? notif.id : Date.now()}
                icon={icon}
                content={content}
                actions={actions}
                close={close}
                kind={notif.kind}
                dismissAfter={notif.dismissAfter}
                onClose={() => { __this.handle_onClose(notif); }} />
        );
    }
}

export default Notifications;