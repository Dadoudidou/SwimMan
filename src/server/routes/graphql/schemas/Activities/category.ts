import { schema } from "./../schema"
import { UpdateArgs } from "routes/graphql/utils";
import { Models } from "datas-layer";
import { ICategoryAttributes } from "datas-layer/Entities/Activities/Category";

const category: schema<ICategoryAttributes> = {
    typeDefs: `
    type Category {
        id: Int
        name: String
        activities(name: String): [Activity]
        activities_count(name: String): Int
        campaign: Campaign
    }
    `,
    typeResolvers: {
        Category: {
            activities(category: any, args){
                let __args = UpdateArgs(args);
                return category.getActivities({ where: __args });
            },
            activities_count(category, args){
                let __args = UpdateArgs(args);
                return (category as any).getActivities({ where: __args }).then(result => result.length);
            },
            campaign(category, args){
                return (category as any).getCampaign();
            }
        }
    },
    queryDefs: `
        categories(name: String): [Category]
        category(id: Int!): Category
    `,
    queryResolvers: {
        categories(root, args){
            return Models.Category.findAll({ where: UpdateArgs(args) });
        },
        category(root, args){
            return Models.Category.find({ where: args });
        },
    }
}

export default category;