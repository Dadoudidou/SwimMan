import { addHistoric as addDefaultHistoric } from "services/Historic"
import { GraphQlContext } from "./../index"

export const addHistoric = (context: GraphQlContext, message: string, meta?: any, callback?: () => void) => {
    
        addDefaultHistoric(context.auth.credentials.user.model,
            message,
            {
                ip: context.request.raw.req.connection.remoteAddress,
                data: meta
            },
            callback
        )    

    }