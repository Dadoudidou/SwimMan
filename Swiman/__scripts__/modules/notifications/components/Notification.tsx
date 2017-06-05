import * as React from "react";
import * as Models from "./../models";


export interface INotificationProps {
    className?: string
    kind?: string
    icon?: React.ReactNode
    content?: React.ReactNode
    actions?: React.ReactNode
    close?: React.ReactNode | boolean
    dismissAfter?: number

    onClose?: () => void
}

class Notification extends React.PureComponent<INotificationProps, any>{

    static defaultProps: INotificationProps = {
    }

    refs: {
        [name: string]: any,
        notifElement: HTMLDivElement
    }

    componentDidMount() {
        let __this = this;
        if (this.props.dismissAfter) {
            window.setTimeout(() => {
                if (__this.props.onClose)
                    __this.props.onClose();
            }, this.props.dismissAfter);
        }
    }

    render() {
        let _class = "notification";
        let _className = [_class];
        if (this.props.className) _className.push(this.props.className);
        if (this.props.kind) _className.push(_class + '-' + this.props.kind);
        return (
            <div className={_className.join(" ")} ref="notifElement">
                <div className={_class + '__icon'}>{(this.props.icon) ? this.props.icon : ""}</div>
                {(this.props.content) ? <div className={_class + '__content'}>{this.props.content}</div> : ""}
                {(this.props.actions) ? <div className={_class + '__actions'}>{this.props.actions}</div> : ""}
                {
                    (this.props.close) ?
                        <div className={_class + '__close'} onClick={this.props.onClose}>
                            {this.props.close}
                        </div>
                        : ""
                }
            </div>
        );
    }

}

export default Notification;