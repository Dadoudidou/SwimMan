import { Models, connector } from "./../datas-layer"
import { IUserAttributes } from "./../datas-layer/Entities/Users/User"
import { ILogAttributes } from "./../datas-layer/Entities/System/Log"

import { getLogger } from "./Logger"

export const addHistoric = (user: IUserAttributes, message: string, meta?: any, callback?: () => void) => {


    getLogger().info(message, {
        __type: "historic",
        user_id: user.id,
        ...meta
    }, () => {
        if(callback) callback();
    })


    /*Models.Historic.create({
        user_id: user.id,
        message: message,
        meta: JSON.stringify(meta),
        timestamp: new Date().toISOString(),
    }).then(historic => {
        if(callback) callback();
    })*/
}
