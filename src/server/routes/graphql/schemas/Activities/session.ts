import { schema } from "./../schema"
import { UpdateArgs } from "routes/graphql/utils";
import { Models } from "datas-layer";
import { ICategoryAttributes } from "datas-layer/Entities/Activities/Category";

const session: schema<ICategoryAttributes> = {
    typeDefs: `
    type Session {
        id: Int
        day: Int
        start: String
        end: String
        nbSlots: Int
        section: Section
        place: Place
    }
    `,
    typeResolvers: {
        Session: {
            section(session){
                return (session as any).getSection();
            },
            place(session){
                return (session as any).getPlace();
            }
        }
    }
}

export default session;