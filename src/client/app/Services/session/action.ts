import { actionCreator } from "modules/redux-actions";

const actionType = "services/session/"

interface ISet { key: string, value: any }
export const set = actionCreator<ISet>(actionType + "set");

export const clear = actionCreator(actionType + "clear");
