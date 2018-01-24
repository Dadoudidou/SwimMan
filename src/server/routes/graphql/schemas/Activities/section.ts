import { schema } from "./../schema"
import { UpdateArgs } from "routes/graphql/utils";
import { Models } from "datas-layer";
import { ICategoryAttributes } from "datas-layer/Entities/Activities/Category";

const section: schema<ICategoryAttributes> = {
    typeDefs: `
    type Section {
        id: Int
        name: String
        activity: Activity
        sessions: [Session]
    }
    `,
    typeResolvers: {
        Section: {
            activity(section){
                return (section as any).getActivity();
            },
            sessions(section, args){
                let __args = UpdateArgs(args);
                return (section as any).getSessions({ where: __args });
            }
        },
    },
    queryDefs: `
    sections(name: String): [Section]
    section(id: Int!): Section
    `,
    queryResolvers: {
        sections(root, args){
            return Models.Section.findAll({ where: UpdateArgs(args) });
        },
        section(root, args){
            return Models.Section.find({ where: args });
        },
    }
}

export default section;