import { schema } from "./../schema"
import { IActivityAttributes } from "datas-layer/Entities/Activities/Activity";
import { UpdateArgs } from "routes/graphql/utils";
import { Models } from "datas-layer";

const activity: schema<IActivityAttributes> = {
    typeDefs: `
    type Activity {
        id: Int
        name: String
        category: Category
        sections(name: String): [Section]
    }
    `,
    typeResolvers: {
        Activity: {
            category: (root, args, context) => {
                return (root as any).getCategory()
            },
            sections(root, args, context){
                let __args = UpdateArgs(args);
                return root.getSections({ where: __args });
            }
        }
    },
    queryDefs: `
        activities(name: String): [Activity]
        activity(id: Int!): Activity
    `,
    queryResolvers: {
        activities(root, args){
            return Models.Activity.findAll({ where: UpdateArgs(args) });
        },
        activity(root, args){
            return Models.Activity.find({ where: args });
        },
    }
}

export default activity;