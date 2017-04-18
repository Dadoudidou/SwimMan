import { IAction, actionCreator } from "modules/redux";
import { Notification } from "./../models";


export const Send = actionCreator<Notification>("Notifications/Send");

export const Clear = actionCreator("Notifications/Clear");

export const Dismiss = actionCreator<string>("Notifications/Dismiss");