import { UpdateArgs } from "./../utils"

export const typeDefs = `
scalar Date
type Campaign {
    id: Int
    start: Date
    end: Date
    name: String
    categories: [Category]
}
`

export const resolver = {
    Date: {
        __parseValue(value){
            return new Date(value);
        },
        __serialize(value: Date){
            return value.toISOString();
        },
        __parseLiteral(ast){
            return null;
        }
    },
    Campaign: {
        categories(campaign, args){
            return campaign.getCategories({ where: args });
        }
    }
}