import * as assign from "object-assign";

export class Notification {
    constructor(init?: Partial<Notification>) {
        if (init) assign(this, init);
    }

    //Notification message
    message: React.ReactNode = undefined;

    //Id notification
    id?: string = Date.now().toString();

    //Type of notification, can be one of: info, sucess, warning, danger
    kind?: 'info' | 'success' | 'warning' | 'danger' = "info";

    //Auto dismiss the notification after the given number of milliseconds
    dismissAfter?: number = undefined;

    //icon
    icon?: React.ReactNode

    //actions
    actions?: React.ReactNode

    //can be close by cross
    canBeClosed?: boolean = true;

}