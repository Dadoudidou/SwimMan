import { schema } from "./../schema"
import { withDroit, withOwnProfile } from "routes/graphql/utils/withDroit";
import { Models } from "datas-layer";
import { addHistoric } from "routes/graphql/utils/Historic";
import { ILogAttributes } from "datas-layer/Entities/System/Log";

const historic: schema<ILogAttributes> = {
    typeDefs:`
        type Historic {
            id: Int
            timestamp: String
            message: String
            meta: JSON
        }
    `
}

export default historic;